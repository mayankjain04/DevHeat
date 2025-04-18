// QuizModal.jsx
import React from 'react';

const QuizModal = ({ skill, onClose }) => {
  const handleSubmit = () => {
    // Here you would handle quiz results
    alert(`You completed the ${skill.name} quiz and earned XP!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Quiz: {skill.name}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          [ Placeholder quiz content here. Replace this with actual questions later. ]
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="text-gray-500 px-3 py-1 rounded hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
