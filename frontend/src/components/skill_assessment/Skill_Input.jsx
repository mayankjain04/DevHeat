import React from "react";

const Skill_Input = React.forwardRef(
  ({ index, error, value, disabled, ...props }, ref) => {
    return (
      <div className="p-4 border hover:shadow-md transition-shadow bg-white rounded-lg hover:border-blue-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 text-start">
            <label
              htmlFor={`skill-${index}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Skill {index}
            </label>
            <input
              type="text"
              id={`skill-${index}`}
              className={`w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error?.name ? 'border-red-300' : 'border-gray-300'
                }`}
              defaultValue={value || ''} // Use defaultValue to allow user to edit
              disabled={disabled} // Disable input if disabled is true
              {...props}
              ref={ref}
              placeholder="Enter skill name"
            />
          </div>
          <div className="w-full md:w-40 text-start">
            <label
              htmlFor={`proficiency-${index}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Proficiency (out of 100)
            </label>
            <input
              type="number"
              id={`proficiency-${index}`}
              min="0"
              max="100"
              className="w-full px-3 py-2 border text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              placeholder="0"
              disabled={disabled} // Disable proficiency input as well
              {...props}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default Skill_Input;
