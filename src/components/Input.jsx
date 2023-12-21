import React, { useState, forwardRef,useId } from 'react';

const Input = forwardRef(function Input({
    label,
    type="text",
    className="",
    ...props
},ref)  {
    const id = useId();
  return (
    <div className="w-full">
        {label && (
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
        )}
        <input type={type} className= {`${className}`} {...props} ref={ref} id={id} />
    </div>
  )
})

export default Input;
