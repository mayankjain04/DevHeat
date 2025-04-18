from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from urllib.parse import urlencode
from rest_framework import status, generics
import sys
import os
import requests
import time

from .serializers import RegisterSerializer, UserDataSerializer, UserDataPredictionSerializer, AllUserDataSerializer
from .models import UserData

root_dir = os.path.abspath(__file__)
for _ in range(4):  # Move up 4 levels
    root_dir = os.path.dirname(root_dir)

# Add the ml_models directory to sys.path
sys.path.append(os.path.join(root_dir, 'ml_models'))

# Now we can import from ml_models
from mymodels import assessment_model
# from ml_models.nextskill import nextskill

YT_API_KEY = os.environ.get("YT_API_KEY")
ADZUNA_API_KEY = os.environ.get("ADZUNA_API_KEY")
TIMEOUT = 5

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated] # Require Login

    def post(self, request):
        request.user.auth_token.delete()  # Delete the user's token
        return Response({"message": "Logged out successfully"}, status=200)

class AssessmentView(APIView):
    permission_classes = [IsAuthenticated]  # Require login

    def post(self, request):
        # Manually assign the user to the request data
        data = request.data.copy()
        data['user'] = request.user.id

        # Extract values from 'skills' and create a list
        skills_values = list(data['skills'].values())

        # You can also include 'domain' and 'experience' if needed
        # If you want them to be part of the list as well
        response_list = skills_values + [data['domain'], data['experience']]

         # Check for an existing UserData instance with the same user, domain, and experience
        user_data_instance = UserData.objects.filter(
            user=request.user
        ).first()

        # If found, update the existing instance; if not, create a new one
        if user_data_instance:
            serializer = UserDataSerializer(user_data_instance, data=data, partial=True)
        else:
            serializer = UserDataSerializer(data=data)


        # Validate and save if valid
        if serializer.is_valid():
            user_data = serializer.save()  # Saves the instance of UserData

            model_status = assessment_model.get_model_data()
            model_response = assessment_model.get_pred_data(response_list)

            # Ensure model_response data types match expected fields
            prediction_data = {
                "predicted_proficiency": str(model_response[0]) if model_response[0] is not None else None,
                "predicted_job_role": str(model_response[1]) if model_response[1] is not None else None,
                "predicted_average_score": float(model_response[2]) if model_response[2] is not None else None,
            }
            prediction_serializer = UserDataPredictionSerializer(
                user_data, data=prediction_data, partial=True
            )
            if prediction_serializer.is_valid():
                print("Data saved...")
                prediction_serializer.save()
            else:
                print("Invalid serializer", prediction_serializer.errors)

            return Response({
                    "model_status": {
                        "accuracy_proficiency": model_status[0],
                        "accuracy_job_role": model_status[1],
                        "mse_avg_score": model_status[2]
                    },
                    "assessment_result": {
                        "predicted_proficiency": model_response[0],
                        "predicted_job_role": model_response[1],
                        "predicted_average_score": model_response[2],
                        "message":model_response[3],
                    },
                }, status=status.HTTP_202_ACCEPTED)
            # return Response({"message":"success"}, status=status.HTTP_201_CREATED)
        
        # Return validation errors if invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NextSkillView(APIView):
    pass

class FindJobsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user_domain_obj = UserData.objects.filter(user=request.user).last()
            user_domain = user_domain_obj.domain if user_domain_obj else "Web Development"
        except Exception as e:
            user_domain = "Web Development"

        sort_by = request.data.get("sort_by", "")
        what = request.data.get("what", user_domain)
        where = request.data.get("where", "")
        page_no = request.data.get("page", 1)

        params = {
            "app_id": "5aaf8801",
            "app_key": f"{ADZUNA_API_KEY}",
            "results_per_page": 6,
            "what": what,
            "where": where,
            "sort_by": sort_by,
        }

        base_url = f"https://api.adzuna.com/v1/api/jobs/gb/search/{page_no}"
        encoded_url = f"{base_url}?{urlencode(params)}"

        print(f"Encoded URL: {encoded_url}")

        try:
            start_time = time.time()

            external_response = requests.get(encoded_url, timeout=TIMEOUT)  # 5 second timeout
            external_response.raise_for_status()

            elapsed = time.time() - start_time
            print(f"Adzuna API response time: {elapsed:.2f} seconds")

            data = external_response.json()
            jobs_data = data.get('results', [])

            return Response({
                "jobs": jobs_data,
                "what": what,
            }, status=status.HTTP_200_OK)

        except requests.exceptions.Timeout:
            return Response(
                {"error": "Job search request timed out. Please try again later."},
                status=status.HTTP_504_GATEWAY_TIMEOUT
            )

        except requests.exceptions.RequestException as e:
            return Response(
                {"error": f"Failed to fetch jobs from external API: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

class UserDataAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user_data = UserData.objects.filter(user=request.user).last()
            serializer = AllUserDataSerializer(user_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserData.DoesNotExist:
            return Response({"error": "User data not found"}, status=status.HTTP_404_NOT_FOUND)

class FindPlaylist(APIView):
    def post(self, request, *args, **kwargs):
        query = self.kwargs.get('q')
        page_token = request.data.get('pageToken', '')
        language = request.data.get('language', 'en')  # Optional: Default to English

        url = (
            f"https://www.googleapis.com/youtube/v3/search"
            f"?part=snippet&q={query}+skill+development&type=playlist"
            f"&maxResults=9&order=relevance&relevanceLanguage={language}"
            f"&key={YT_API_KEY}"
        )
        if page_token:
            url += f"&pageToken={page_token}"

        print(url)

        start_time = time.time()
        try:
            external_response = requests.get(url, timeout=TIMEOUT)
            external_response.raise_for_status()
            elapsed = round(time.time() - start_time, 2)
            print(f"YouTube API response time: {elapsed} seconds")

            data = external_response.json()
            playlists = []

            for item in data.get("items", []):
                snippet = item.get("snippet", {})
                playlist_id = item.get("id", {}).get("playlistId")

                if not playlist_id:
                    continue  # Skip if not a valid playlist

                playlists.append({
                    "title": snippet.get("title"),
                    "description": snippet.get("description"),
                    "channelTitle": snippet.get("channelTitle"),
                    "channelId": snippet.get("channelId"),
                    "publishedAt": snippet.get("publishedAt"),
                    "thumbnail": snippet.get("thumbnails", {}).get("high", {}).get("url"),
                    "playlistId": playlist_id,
                    "link": f"https://www.youtube.com/playlist?list={playlist_id}",
                })

            return Response({
                "results": playlists,
                "query":query,
                "nextPageToken": data.get("nextPageToken", None),
                "responseTime": elapsed
            }, status=status.HTTP_200_OK)

        except requests.exceptions.RequestException as e:
            return Response(
                {"error": f"Failed to fetch playlists: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
