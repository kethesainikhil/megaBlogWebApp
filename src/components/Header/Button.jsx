import React from 'react'

const Button = ({
    children,
    className='',
    bgcolor="black",
    textcolor="white",
    ...props
}) => {
  return (
    <button className= {`${className} ${bgcolor} ${textcolor} {...props}`}>
        {children}
    </button>
  )
}

export default Button
