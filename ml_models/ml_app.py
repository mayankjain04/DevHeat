from sklearn.linear_model import LogisticRegression
import numpy as np
import json

def load_skills_from_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)


def categorize_proficiency(overall_percentage):
    if overall_percentage < 40:
        return 'Beginner'
    elif 40 <= overall_percentage <= 70:
        return 'Intermediate'
    else:
        return 'Professional'

def assess_user_skills(skill_technologies, user_skill, user_skill_percentages):
    user_skills = {}
    
    normalized_skills = {skill.lower(): skill for skill in skill_technologies.keys()}

    if user_skill.lower() not in normalized_skills:
        return ["Invalid skill. Please provide a valid skill."]

    original_skill = normalized_skills[user_skill.lower()]
    technologies = skill_technologies[original_skill]
    
    for tech in technologies:
        if tech in user_skill_percentages:
            percentage = user_skill_percentages[tech]
            if 0 <= percentage <= 100:
                user_skills[tech] = percentage
            else:
                return [f"Invalid proficiency percentage for {tech}. Must be between 0 and 100."]

    if not user_skills:
        return ["No valid skills provided."]

    overall_percentage = sum(user_skills.values()) / len(user_skills)
    proficiency_level = categorize_proficiency(overall_percentage)

    output = [
        f"Overall Proficiency Percentage: {overall_percentage:.2f}%",
        f"User  Proficiency Level: {proficiency_level}"
    ]
    
    return output

def run_model(json_file_path, user_skill, user_skill_percentages):
  
    skills_data = load_skills_from_json(json_file_path)
    
    output = assess_user_skills(skills_data, user_skill, user_skill_percentages)
    
    # Here you can send the output to your backend
    # send_to_backend(output)  # Placeholder for actual backend function

    return output

# Example usage
json_file_path = 'skills.json'  
user_skill = "frontend development" 
user_skill_percentages = {
     "HTML":65,
     "CSS":87,
     "JavaScript": 89,
     "React": 87,
     "Vue.js":98,
     "Angular":76,
     "Bootstrap":90,
     "TailwindCSS":87
}  

output_list = run_model(json_file_path, user_skill, user_skill_percentages)

# The output_list can now be sent to the backend
print(output_list)  # comment down this line for non terminal usage



