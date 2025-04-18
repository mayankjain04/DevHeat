import React from 'react'
import {BriefcaseBusinessIcon, Target, Building2Icon} from "lucide-react";
import "./profile.css";

function UserJobRecommendation({job1, domain, match}) {
  return (
    <div className="w-full px-7 py-5 bg-white rounded-md sm:rounded-xl shadow-lg overflow-hidden">
      <div className=''>
        <div>
          <h1 className='text-[#1F2833] mb-2 text-start text-xl font-bold profile-text'>Recommended Job Role</h1>
          <div className='h-[1px] bg-gray-200 w-full rounded'></div>
        </div>
        <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-600">
              <BriefcaseBusinessIcon className="w-4 h-4 mr-2 text-[#18BED4]" />
              <span>Position: {job1}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Building2Icon className="w-4 h-4 mr-2 text-[#18BED4]"/>
              <span>Domain: {domain}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Target className="w-4 h-4 mr-2 text-[#18BED4]"/>
              <span>Score: {match?.toFixed(2)}</span>
            </div>
          </div>
      </div>
    </div>
  )
}

export default UserJobRecommendation