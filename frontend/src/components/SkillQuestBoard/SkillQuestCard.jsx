// SkillQuestCard.jsx
import React, { useState } from 'react';
import XPProgressBar from './XPProgressBar';
import QuizModal from './QuizModel';

const SkillQuestCard = ({ skill }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#fafafa] border  border-gray-200 p-4 rounded-xl shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg text-[#1F2833] font-semibold">
            {skill.icon} {skill.name}
          </h3>
          <span className="text-sm text-gray-500">Level {skill.level}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4 italic">
          "{skill.tagline}"
        </p>
        <XPProgressBar current={skill.xp} max={skill.maxXp} />
        <p className="text-xs text-gray-500 mt-1">
          XP: {skill.xp}/{skill.maxXp}
        </p>
      </div>
      <div className="mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-all"
        >
          ⚔️ Take Quiz
        </button>
      </div>
      {isModalOpen && (
        <QuizModal
          skill={skill}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SkillQuestCard;
