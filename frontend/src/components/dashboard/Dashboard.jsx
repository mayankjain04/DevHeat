import React, { useDebugValue, useEffect, useState } from 'react'
import UserProfile from './UserProfile'
import UserJobRecommendation from './UserJobRecommendation'
import SkillQuestBoard from '../SkillQuestBoard/SkillQuestBoard'
import SkillsChart from './SkillBarChart'
import GithubAnalyser from "../analyser/GithubAnalyser"

import config from "../../config";
import { useContext } from 'react';
import { AuthContext } from '../../authcontext';


function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { authToken } = useContext(AuthContext);
  console.log(authToken)

  useEffect(() => {
    // Fetch user data from the API
    fetch(`${config.apiUrl}/api/user/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${authToken}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
        setLoaded(true)
      })
      .catch(error => console.error("There was a problem with the fetch operation:", error));
  }, []); // Re-run useEffect if authToken changes

  useEffect(() => {
    // Log userData whenever it changes
    if (userData) {
      console.log("User Data:", userData);
    }
  }, [userData]);

  if (authToken == null) {
    return (
      <div>
        <div className="bg-[#F7F7F7] text-[#1F2833] font-bold text-5xl px-20 py-28 w-full h-[100vh] flex justify-center items-center">
          <h2>Not logged In...</h2>
          <br />
          <small>login pls</small>
        </div>
      </div>
    )
  }


  if (loaded == false) {
    return (
      <div className="bg-[#F7F7F7] text-red-500 px-4 py-28 w-full h-screen flex flex-col items-center justify-center text-center">
        <span className="text-xl font-bold text-slate-900">Loading...</span>
      </div>
    )
  }

  const learningSkills = [
    {
      name: 'React',
      icon: '⚛️',
      level: 2,
      xp: 60,
      maxXp: 100,
      tagline: 'Master React to wield the DOM with ease!',
    },
    {
      name: 'Node.js',
      icon: '🛠️',
      level: 1,
      xp: 30,
      maxXp: 80,
      tagline: 'Forge server-side spells with Node.',
    },
  ];  


  return (
    <div className='pt-20 sm:pt-24 pb-6 sm:pb-10 px-5 sm:px-32 bg-[#f7f7f7] grid grid-cols-1 lg:grid-cols-3 gap-3'>
      <div className='col-span-1 w-full'>
        <UserProfile apiUrl={config.apiUrl} username={userData.user.username} email={userData.user.email} domain={userData.domain} experience={userData.experience} level={userData.predicted_proficiency} />
      </div>
      <div className='col-span-1 lg:col-span-2 lg:row-span-2 w-full'>
        <SkillsChart apiUrl={config.apiUrl} userData={userData}/>
      </div>
      <div className='col-span-1 w-full'>
        <UserJobRecommendation apiUrl={config.apiUrl} job1={userData.predicted_job_role} match={userData.predicted_average_score} domain={userData.domain} />
      </div>
      <div className='col-span-1 lg:col-span-3 w-full'>
        {/* <SkillQuestBoard skills={learningSkills} /> */}
        <GithubAnalyser/>
      </div>
          
    </div>
  )
}

export default Dashboard
