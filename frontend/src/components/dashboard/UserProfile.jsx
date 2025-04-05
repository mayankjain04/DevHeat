import { MapPin, Calendar, Mail, User } from "lucide-react";
import React from "react";


function UserProfile({ username, email, domain, experience, level}) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
              <div className="bg-blue-100 p-3 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 text-start">{username}</h2>
                <p className="text-gray-600">{domain}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-3" />
                <span>{email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-3" />
                <span>NaN</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-3" />
                <span>Joined April 2025</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {experience[0] !== "0" ? `${experience} Years Experience` : "Fresher"}
              </span>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                {level}
              </span>
            </div>
          </div>
        </div>
    </div>
  );
}

export default UserProfile;
