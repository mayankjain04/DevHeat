import React, { useId } from 'react'

function Experience({label, className = "",option, setOption, ...props }, ref) {
    const id = useId()
    const years = ["0 (I'm a Fresher/Student)"]
    for (let i = 0; i <= 19; i++) {
        years.push(String(i+1))
    }

    return (
        <div className='w-full mb-4'>
            <label htmlFor={id} className="font-semibold text-[#1F2833]">{label}</label>
            <select
                {...props}
                id={id}
                ref={ref}
                onChange={(e) => setOption(e.target.value)}
                defalutvalue={''}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                <option value="">
                    Select your experience
                </option>
                {years?.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Experience)