import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faIndianRupeeSign, faDollarSign } from "@fortawesome/free-solid-svg-icons";
      
function JobCard({title, company, salaryMin, salaryMax, jobdesc, location}) {
  return (
    <div>
        <div className="bg-white h-[210px] flex flex-col w-[100%] px-7 py-4 rounded-xl cursor-pointer shadow-lg hover:scale-105 transition-all duration-200">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center ">
                    <div className="bg-purple-100 w-10 h-10 flex justify-center items-center rounded-full mr-3">
                        <FontAwesomeIcon icon={faBriefcase} style={{color: "#973beb",}} />
                    </div>
                    <div className="text-black font-semibold text-lg text-start">
                        {title}
                    </div>
                </div>
                <div className="text-gray-600 font-semibold text-end">
                    {location}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="text-black font-medium text-start mb-2">
                    {company}
                </div>
                <div className="flex items-center mb-2">
                    <div className="mr-2">
                        {/* <FontAwesomeIcon icon={faIndianRupeeSign} style={{color: "#9ca3af",}} /> */}
                        <FontAwesomeIcon icon={faDollarSign} style={{color: "#9ca3af",}} />
                    </div>
                    <div className="text-gray-600">
                        {salaryMin || salaryMax} - {salaryMax || salaryMin}
                    </div>
                </div>
            </div>
            <div className="text-gray-700 text-start font-normal">
                {jobdesc}
            </div>
        </div>
    </div>
  );
}

export default JobCard;
