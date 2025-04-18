import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, KFold, cross_val_score
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics import accuracy_score, f1_score
from sklearn.multioutput import MultiOutputClassifier
import pickle
import os

# Directory of the current file
base_dir = os.path.dirname(__file__)
data_path = os.path.join(base_dir, 'skills_data.csv')
model_path = os.path.join(base_dir, 'skills_model.pkl')
classes_path = os.path.join(base_dir, 'skill_classes.pkl')

def load_data():
    """ Load and preprocess the dataset. """
    data = pd.read_csv(data_path)
    data['Skills'] = data['Skills'].apply(lambda x: x.split(';'))  # Split by semicolon to handle multi-skills
    data['Next_Skill'] = data['Next_Skill'].apply(lambda x: x.split(';'))  # Similarly for next skill
    return data

def preprocess_data(data):
    """ Process the skills and next skills into binary format. """
    mlb_skills = MultiLabelBinarizer()
    mlb_target = MultiLabelBinarizer()
    
    skills_encoded = mlb_skills.fit_transform(data['Skills'])
    target_encoded = mlb_target.fit_transform(data['Next_Skill'])
    
    # Save skill classes and target classes for later use
    with open(classes_path, 'wb') as file:
        pickle.dump((mlb_skills.classes_, mlb_target.classes_), file)
        
    return skills_encoded, target_encoded, mlb_skills.classes_, mlb_target.classes_

def train_model(skills_encoded, target_encoded):
    """ Train the model using RandomForestClassifier. """
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(skills_encoded, target_encoded, test_size=0.2, random_state=42)
    
    # Use RandomForest for better accuracy in multi-label tasks
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    multi_target_model = MultiOutputClassifier(model, n_jobs=-1)
    
    # Cross-validation score to evaluate model performance
    kfold = KFold(n_splits=5, shuffle=True, random_state=42)
    cv_score = cross_val_score(multi_target_model, X_train, y_train, cv=kfold, scoring='f1_weighted')
    print(f"Cross-validation F1 score: {cv_score.mean()}")
    
    # Train the model
    multi_target_model.fit(X_train, y_train)
    y_pred = multi_target_model.predict(X_test)
    
    # Calculate accuracy and F1 scores for multi-label classification
    f1 = f1_score(y_test, y_pred, average='weighted', zero_division=1)  # Prevent division by zero errors
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"Model Accuracy: {accuracy}")
    print(f"Model F1 Score (Weighted): {f1}")
    
    return multi_target_model

def save_model(model):
    """ Save the trained model to disk. """
    with open(model_path, 'wb') as file:
        pickle.dump(model, file)

def load_model():
    """ Load the saved model from disk. """
    with open(model_path, 'rb') as file:
        return pickle.load(file)

def recommend_skills(model, input_skills, skill_classes, target_classes):
    """ Recommend the next skills based on the user's skills. """
    # Convert the user's input skills to the corresponding vector
    input_vector = np.zeros(len(skill_classes))
    for skill in input_skills:
        if skill in skill_classes:
            input_vector[np.where(skill_classes == skill)[0][0]] = 1
            
    # Predict the next skills
    predicted_skills = model.predict([input_vector])[0]
    
    # Convert the predicted labels back to skill names
    recommended_skills = [target_classes[i] for i, val in enumerate(predicted_skills) if val == 1]
    
    # Return the top 3 skills (or fewer if not enough are predicted)
    return recommended_skills[:3] if len(recommended_skills) > 3 else recommended_skills

def run_recommendation(user_skill_percentages):
    """ Main function to run the recommendation system. """
    if os.path.exists(model_path) and os.path.exists(classes_path):
        model = load_model()
        with open(classes_path, 'rb') as file:
            skill_classes, target_classes = pickle.load(file)
    else:
        # Load, preprocess data, and train the model
        data = load_data()
        skills_encoded, target_encoded, skill_classes, target_classes = preprocess_data(data)
        model = train_model(skills_encoded, target_encoded)
        save_model(model)
    
    # Get recommended skills for the user
    recommended_skills = recommend_skills(model, user_skill_percentages.keys(), skill_classes, target_classes)
    return recommended_skills

if __name__ == "__main__":
    print('Direct execution in terminal...\n')
    # Example usage
    user_skill_percentages = { 
        "HTML": 65,
        "CSS": 87,
        "JavaScript": 89,
        "React": 87,
        "Vue.js": 98,
        "Angular": 76,
        "Bootstrap": 90,
        "TailwindCSS": 87
    }

    recommended_skills = run_recommendation(user_skill_percentages)
    print("Recommended Skills:", recommended_skills)

    # Example usage 2
    user_skill_percentages = { 
        "Python": 65,
        "Java": 87,
        "MongoDB": 89,
        "Data Analysis": 87,
        "Machine Learning": 98,
        "Tableau": 76,
        "Excel": 87
    }

    recommended_skills = run_recommendation(user_skill_percentages)
    print("Recommended Skills:", recommended_skills)
