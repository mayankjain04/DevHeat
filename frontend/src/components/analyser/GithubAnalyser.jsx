import React, { useState } from 'react';
import { Search, Loader2, AlertCircle, Github } from 'lucide-react';
import { useForm } from "react-hook-form";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = String(import.meta.env.VITE_API_KEY);

function GithubAnalyser() {
    const { register, handleSubmit } = useForm();
    const [userData, setUserData] = useState(null);
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const getUserInfo = async (data) => {
        setLoader(true)
        const response = await fetch(`https://api.github.com/users/${data.username}`);
        const result = await response.json();
        if (!result["status"]) {
            const suggestions = await suggestionGenerator(result);
            setUserData(result);
            setSuggestions(JSON.parse(suggestions.response.text().replace("```json", '').replace("```", '').trim()));
        }
        else {
            setSuggestions(`Please enter a valid username!`)
        }
        setLoader(false)
    };

    const suggestionGenerator = async (userdata) => {
      const prompt = `
      You are an AI expert in developer career guidance. Based on the following GitHub user data, analyze their current developer profile and suggest areas where they can improve or grow. Use the "bio", "public_repos", and any other available fields to determine their skillset. 
      
      Then, provide personalized, practical suggestions — for example, if the user mentions HTML, CSS, and JavaScript, recommend modern frontend frameworks like React or Tailwind CSS. If the user mentions Python, recommend Django or AI/ML tools. You can also mention contributing to open source, content creation, or other skill-building strategies based on their profile.
      
      Respond with a JSON with Keys:
      analysis: (short summary of what you see about the user arround in 20 words)
      suggestion1: keep the suggestion under 15 words
      suggestion2: keep the suggestion under 15 words
      suggestion3: keep the suggestion under 15 words
      
      Here is the GitHub user data in JSON: ${JSON.stringify(userdata, null, 2)}
      `;
      
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);           
        return result;
    };

  return (
    <div className="bg-white rounded-xl w-full shadow-lg p-6">
      <div className="text-center mb-4">
        <h2 className="text-[#1F2833] mb-2 flex items-center text-start text-xl font-bold profile-text">
          <Github className="w-5 h-5 mr-2" />
          GitHub Analyzer</h2>
          <div className='h-[1px] bg-gray-200 w-full rounded'></div>
      </div>

      <form onSubmit={handleSubmit(getUserInfo)} className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            {...register("username")}
            placeholder="Enter GitHub username"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={loader}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2"
        >
          {loader ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          Analyze
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {userData && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={userData.avatar_url}
              alt={`${userData.name}'s avatar`}
              className="w-16 h-16 rounded-full"
            />
            <div className='text-start'>
              <h3 className="text-xl font-semibold text-gray-900">{userData.name}</h3>
              <p className="text-gray-600">{userData.bio}</p>
              <p className="text-sm text-gray-500">Public repositories: {userData.public_repos}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <h4 className="text-start text-xl font-semibold mb-4 text-gray-900">Thoughts & Suggestions</h4>
            <div className='text-gray-800 text-lg text-start mb-3'>
                    {suggestions["analysis"]}
            </div>
            <div className="space-y-3">
                <ul className="flex-col items-start text-start gap-2 text-gray-800">
                    <li  className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>{suggestions["suggestion1"]}</span>
                    </li>
                    <li  className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>{suggestions["suggestion2"]}</span>
                    </li>
                    <li  className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>{suggestions["suggestion3"]}</span>
                    </li>
                </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GithubAnalyser