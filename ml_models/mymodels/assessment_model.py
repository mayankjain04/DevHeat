import pandas as pd
import pickle
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, mean_squared_error
import os

# Directory of the current file
base_dir = os.path.dirname(__file__)

# Use base_dir for consistent file access
data_path = os.path.join(base_dir, 'user_skills_data.csv')
df = pd.read_csv(data_path)

# Ensure that all entries in relevant columns are in lowercase
df = df.apply(lambda x: x.str.lower() if x.dtype == "object" else x, axis=0)

# Separate features and targets
X = df[['Skill1', 'Skill2', 'Skill3', 'Skill4', 'Skill5', 'Skill6', 'Skill7', 'Skill8', 'Skill Category', 'Years of Experience']]
y_proficiency = df['Proficiency Level']
y_job_role = df['Job Role Suggestions']
y_average_score = df['Average Skill Score']

# Encode target labels
label_encoder_proficiency = LabelEncoder()
y_encoded_proficiency = label_encoder_proficiency.fit_transform(y_proficiency)

label_encoder_job_role = LabelEncoder()
y_encoded_job_role = label_encoder_job_role.fit_transform(y_job_role)

# Column Transformer for encoding categorical and scaling numerical features
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), ['Skill1', 'Skill2', 'Skill3', 'Skill4', 'Skill5', 'Skill6', 'Skill7', 'Skill8', 'Years of Experience']),
        ('cat', OneHotEncoder(handle_unknown='ignore'), ['Skill Category'])  # Ignore unknown categories
    ])

# Split dataset for each target
X_train, X_test, y_train_proficiency, y_test_proficiency = train_test_split(X, y_encoded_proficiency, test_size=0.2, random_state=42)
X_train_job_role, X_test_job_role, y_train_job_role, y_test_job_role = train_test_split(X, y_encoded_job_role, test_size=0.2, random_state=42)
X_train_avg_score, X_test_avg_score, y_train_avg_score, y_test_avg_score = train_test_split(X, y_average_score, test_size=0.2, random_state=42)

# Update paths with base_dir
model_proficiency_filename = os.path.join(base_dir, 'model_proficiency.pkl')
model_job_role_filename = os.path.join(base_dir, 'model_job_role.pkl')
model_avg_score_filename = os.path.join(base_dir, 'model_avg_score.pkl')
preprocessor_filename = os.path.join(base_dir, 'preprocessor.pkl')
encoder_proficiency_filename = os.path.join(base_dir, 'label_encoder_proficiency.pkl')
encoder_job_role_filename = os.path.join(base_dir, 'label_encoder_job_role.pkl')

# Check if models exist
if os.path.exists(model_proficiency_filename) and os.path.exists(model_job_role_filename) and os.path.exists(model_avg_score_filename):
    with open(model_proficiency_filename, 'rb') as file:
        model_proficiency = pickle.load(file)
    with open(model_job_role_filename, 'rb') as file:
        model_job_role = pickle.load(file)
    with open(model_avg_score_filename, 'rb') as file:
        model_avg_score = pickle.load(file)
    with open(preprocessor_filename, 'rb') as file:
        preprocessor = pickle.load(file)
    with open(encoder_proficiency_filename, 'rb') as file:
        label_encoder_proficiency = pickle.load(file)
    with open(encoder_job_role_filename, 'rb') as file:
        label_encoder_job_role = pickle.load(file)
else:
    # Using Random Forest Classifiers for Proficiency Level and Job Role
    model_proficiency = Pipeline([
        ('preprocess', preprocessor),
        ('classifier', RandomForestClassifier(n_estimators=300, max_depth=10, random_state=42))
    ])
    model_proficiency.fit(X_train, y_train_proficiency)
    
    model_job_role = Pipeline([
        ('preprocess', preprocessor),
        ('classifier', RandomForestClassifier(n_estimators=300, max_depth=20, random_state=42))
    ])
    model_job_role.fit(X_train_job_role, y_train_job_role)

    # Using Random Forest Regressor for Average Skill Score
    model_avg_score = Pipeline([
        ('preprocess', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=500, max_depth=15, random_state=42))
    ])
    model_avg_score.fit(X_train_avg_score, y_train_avg_score)

    # Save models and encoders
    with open(model_proficiency_filename, 'wb') as file:
        pickle.dump(model_proficiency, file)
    with open(model_job_role_filename, 'wb') as file:
        pickle.dump(model_job_role, file)
    with open(model_avg_score_filename, 'wb') as file:
        pickle.dump(model_avg_score, file)
    with open(preprocessor_filename, 'wb') as file:
        pickle.dump(preprocessor, file)
    with open(encoder_proficiency_filename, 'wb') as file:
        pickle.dump(label_encoder_proficiency, file)
    with open(encoder_job_role_filename, 'wb') as file:
        pickle.dump(label_encoder_job_role, file)

# Predictions
y_pred_proficiency = model_proficiency.predict(X_test)
y_pred_job_role = model_job_role.predict(X_test_job_role)
y_pred_avg_score = model_avg_score.predict(X_test_avg_score)

# Evaluation
accuracy_proficiency = accuracy_score(y_test_proficiency, y_pred_proficiency)
accuracy_job_role = accuracy_score(y_test_job_role, y_pred_job_role)
mse_avg_score = mean_squared_error(y_test_avg_score, y_pred_avg_score)

# Prediction function for new user with error handling
def predict_for_new_user(user_data):
    try:
        # Convert user data to DataFrame
        new_user_df = pd.DataFrame(user_data, columns=['Skill1', 'Skill2', 'Skill3', 'Skill4', 
                                                        'Skill5', 'Skill6', 'Skill7', 'Skill8', 
                                                        'Skill Category', 'Years of Experience'])
        new_user_df = new_user_df.apply(lambda x: x.str.lower() if x.dtype == "object" else x, axis=0)  # Convert to lowercase

        if new_user_df['Skill Category'].iloc[0] not in df['Skill Category'].unique():
            message = f"Error: The skill category '{new_user_df['Skill Category'].iloc[0]}' is not recognized."
            print(message)
            return None, None, None, message

        # Predict proficiency, job role, and average skill score
        predicted_proficiency = model_proficiency.predict(new_user_df)
        predicted_job_role = model_job_role.predict(new_user_df)
        predicted_average_score = model_avg_score.predict(new_user_df)

        # Decode categorical predictions
        decoded_proficiency = label_encoder_proficiency.inverse_transform(predicted_proficiency)[0]
        decoded_job_role = label_encoder_job_role.inverse_transform(predicted_job_role)[0]

        return decoded_proficiency, decoded_job_role, predicted_average_score, "success"
    except ValueError as e:
        print(f"Error during prediction: {e}")
        return None, None, None, "ValueError during prediction"

def get_model_data():
    # print(f'Proficiency Level Accuracy: {accuracy_proficiency:.4f}')
    # print(f'Job Role Suggestions Accuracy: {accuracy_job_role:.4f}')
    # print(f'Mean Squared Error for Average Skill Score: {mse_avg_score:.4f} \n')
    return accuracy_proficiency, accuracy_job_role, mse_avg_score

def get_pred_data(user_data):
    new_user_data = [user_data]
    return predict_for_new_user(new_user_data)

if __name__ == "__main__":
    print('Direct execution in terminal...\n')
    print(f'Proficiency Level Accuracy: {accuracy_proficiency:.4f}')
    print(f'Job Role Suggestions Accuracy: {accuracy_job_role:.4f}')
    print(f'Mean Squared Error for Average Skill Score: {mse_avg_score:.4f}\n')

    # Example
    print('predicting data for example_user_1...')
    new_user_data = [[80, 90, 70, 85, 95, 92, 88, 90, 'Data Science', 5]]
    predicted_proficiency_level, predicted_job_role, predicted_average_skill_score, message = predict_for_new_user(new_user_data)
    print("Predicted Proficiency Level:", predicted_proficiency_level)
    print("Predicted Job Role Suggestions:", predicted_job_role)
    print("Predicted Average Skill Score:", predicted_average_skill_score)

# output of above example
# $ python assessment.py
# Direct execution in terminal...

# Proficiency Level Accuracy: 0.8594
# Job Role Suggestions Accuracy: 0.7344
# Mean Squared Error for Average Skill Score: 10.0425

# predicting data for example_user_1...
# Predicted Proficiency Level: ['advanced']
# Predicted Job Role Suggestions: ['data analyst']
# Predicted Average Skill Score: [62.9]