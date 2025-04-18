// SkillQuestBoard.jsx
import React from 'react';
import SkillQuestCard from './SkillQuestCard';

const SkillQuestBoard = ({ skills }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6 sm:mb-10">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#1F2833]">🧭 Skill Quest Board</h2>
      <p className="text-sm text-gray-600 mb-6">
        Track your current skill quests and level up by completing challenges!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <SkillQuestCard key={index} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillQuestBoard;
