import React, { useId } from 'react'

const Select = ({
options,
className="",
label,
...props
},ref) => {
    const id = useId();
  return (
    <div className='w-full'>
        {label && (
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>

        )}
        <select name="" id={id} {...props} ref={ref} className={`${className}`}>
            {options?.map((option,index)=>{
                return <option key={index} value={option}>{option}</option>
            })}
        </select>
    </div>
    )
}

export default React.forwardRef(Select)
