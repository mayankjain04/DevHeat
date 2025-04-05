import React, { useId } from 'react'

function Domain({ options, label, className = "",option, setOption, ...props }, ref) {

    const id = useId()

    return (
        <div className='w-full mb-4'>
            <label htmlFor={id} className="font-semibold text-[#1F2833]">{label}</label>
            <select
                {...props}
                id={id}
                ref={ref}
                onChange={(e) => setOption(e.target.value)}
                defalutvalue={''}
                className={`px-2 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                <option value="">
                    Select a domain
                </option>
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Domain)