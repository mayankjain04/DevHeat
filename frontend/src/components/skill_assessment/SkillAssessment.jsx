import React, { useState } from "react";
import Skill_Input from "./Skill_Input";
import Domain from "./Domain";
import { ClipboardList } from "lucide-react";
import data from "./categories.json";
import Experience from "./Experience";
import { Navigate, useNavigate } from "react-router-dom";

import config from "../../config";


function SkillAssessment() {
  const [option, setOption] = useState(""); // Selected domain
  const [experience, setExperience] = useState(0); // Experience state
  const [skills, setSkills] = useState(Array(8).fill(0)); // Array to store skill values
  const Navigate = useNavigate()

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      skills: skills.reduce((acc, value, index) => {
        acc[`${data[option]?.[index] || ""} `] = value || 0; // Ensure default value if empty
        return acc;
      }, {}),
      domain: option,
      experience: experience || 0, // Ensure experience is at least 0
    };

    try {
      const response = await fetch(`${config.apiUrl}/api/assessment/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Response:", result);
      Navigate('/');
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-[#F7F7F7] pt-32 pb-10 sm:px-20 px-10">
      <div className="mb-6 flex items-center">
        <ClipboardList className="w-10 h-9 text-[#18BED4]" />
        <h2 className="text-3xl font-bold text-[#1F2833]">Skill Assessment</h2>
      </div>
      <form
        className="p-4 bg-white shadow-lg rounded-2xl"
        onSubmit={handleSubmit}
      >
        <div className="text-[#1F2833] text-start grid grid-cols-2 gap-5">
          <Domain
            options={Object.keys(data)}
            label="Select Your Domain"
            setOption={setOption}
          />
          <Experience
            label="Experience (in years)"
            setOption={setExperience}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          {[...Array(8)].map((_, index) => (
            <Skill_Input
              key={index}
              value={data[option]?.[index] || ""} 
              index={index + 1}
              disabled={!option}
              onChange={(e) => handleSkillChange(index, Number(e.target.value))}
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={!option}
          className="w-full mt-8 px-4 py-2 rounded-lg bg-[#18BED4] hover:bg-[#15a8bc]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SkillAssessment;
