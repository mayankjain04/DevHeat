import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faDollarSign } from "@fortawesome/free-solid-svg-icons";

function JobCard({ title, company, salaryMin, salaryMax, jobdesc, location }) {
  return (
    <div className="w-full">
      <div className="bg-white w-full px-5 sm:px-7 py-4 rounded-xl cursor-pointer shadow-md hover:scale-[1.02] transition-all duration-200 h-60 flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="bg-purple-100 w-10 h-10 flex justify-center items-center rounded-full mr-3 shrink-0">
                <FontAwesomeIcon icon={faBriefcase} style={{ color: "#973beb" }} />
              </div>
              <div className="text-black font-semibold text-base sm:text-lg break-words">
                {title}
              </div>
            </div>
            <div className="text-gray-600 font-semibold text-sm sm:text-base text-right">
              {location}
            </div>
          </div>

          {/* Company & Salary */}
          <div className="flex justify-between items-center mb-2">
            <div className="text-black font-medium text-sm sm:text-base">
              {company}
            </div>
            <div className="flex items-center text-gray-600 text-sm sm:text-base">
              <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
              <span>
                {salaryMin || salaryMax} - {salaryMax || salaryMin}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-gray-700 text-sm sm:text-base line-clamp-3">
          {jobdesc}
        </div>
      </div>
    </div>
  );
}

export default JobCard;
