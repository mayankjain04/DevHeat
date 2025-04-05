import React, { useId } from "react";

const Input = React.forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center w-full">
        <div>
          {label && (
            <label className="block text-sm font-medium text-black mb-1 sm:mb-0" htmlFor={id}>
              {label}
            </label>
          )}
        </div>
        <div className="sm:col-span-3">
          <input
            type={type}
            className={`px-3 py-2 w-full rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 ${className}`}
            ref={ref}
            {...props}
            id={id}
          />
        </div>
      </div>
    );
  }
);

export default Input;
