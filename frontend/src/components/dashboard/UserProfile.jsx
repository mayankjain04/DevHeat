import { Award, BadgeCheckIcon, Briefcase, Mail } from "lucide-react";
import React from "react";


function UserProfile({ username, email, domain, experience, level}) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-[#18BED4] to-[#14a8bc]"></div>
      <div className="relative px-6 pb-6">
        {/* Profile Image ki functionality nhi pata :( */}
        <div className="absolute -top-16 left-6">
          <img
            src="https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white text-black shadow-md object-cover"
          />
        </div>

        <div className="pt-20">
          <div className="flex justify-between items-center">
            <div className="flex-col text-start">
              <h1 className="text-2xl font-bold text-gray-900">{username}</h1>
              <p className="text-[#18BED4] font-medium"> {domain}</p>
            </div>
            <BadgeCheckIcon className="text-[#18BED4]"/>
          </div>
          {/* Bio ke liye */}
          {/* <p className="mt-4 text-gray-600 text-start">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, id! Architecto laboriosam commodi perspiciatis obcaecati sed quidem
          </p> */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2 text-[#18BED4]" />
              <span>Email : {email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Briefcase className="w-4 h-4 mr-2 text-[#18BED4]"/>
              <span>Expirence : {experience} years</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Award className="w-4 h-4 mr-2 text-[#18BED4]"/>
              <span>Expected Level : {level}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
