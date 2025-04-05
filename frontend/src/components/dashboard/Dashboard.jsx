import React, { useDebugValue, useEffect, useState } from 'react'
import UserProfile from './UserProfile'
import UserJobRecommendation from './UserJobRecommendation'
import SkillRating from './SkillRating'
import SkillsChart from './SkillBarChart'

import config from "../../config";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

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
      <div>
        <div className="bg-[#F7F7F7] text-[#1F2833] font-bold text-5xl px-20 py-28 w-full h-[100vh] flex justify-center items-center">
          Loading dashboard... 
          <br /><hr />
          <small>Are you sure you are connected to the backend?</small>
        </div>
      </div>
    )
  }


  return (
    <div className='py-40 px-32'>
      <UserProfile apiUrl={config.apiUrl} username={userData.user.username} email={userData.user.email} domain={userData.domain} experience={userData.experience} level={userData.predicted_proficiency} />
      <UserJobRecommendation apiUrl={config.apiUrl} job1={userData.predicted_job_role} match={userData.predicted_average_score} domain={userData.domain} />
      {/* <SkillRating apiUrl={config.apiUrl} userData={userData}/> */}
      <SkillsChart apiUrl={config.apiUrl} userData={userData}/>
    </div>
  )
}

export default Dashboard
