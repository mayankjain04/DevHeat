from django.contrib.auth.models import User
from rest_framework import serializers

from .models import UserData

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Hide password on output

    class Meta:
        model = User
        fields = ['username', 'password', 'email']  # Add any other required fields

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ['user', 'skills', 'domain', 'experience']
        # extra_kwargs = {'user': {'read_only': True}}  # The user is set automatically # this causes error cause we need to set the user from the view manually

class UserDataPredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ['predicted_proficiency', 'predicted_job_role', 'predicted_average_score']

class DefaultUserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class AllUserDataSerializer(serializers.ModelSerializer):
    user = DefaultUserDataSerializer()
    class Meta:
        model = UserData
        fields = ['user', 'skills', 'domain', 'experience', 
                  'predicted_proficiency', 'predicted_job_role', 
                  'predicted_average_score', 'image_url', 'bio']
