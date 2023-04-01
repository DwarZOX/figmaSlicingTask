import React from 'react'

const Input = ({type,placeholder,value,onChange,className}) => {
  return (
    <input type={type} value={value} onChange={onChange} className={`${className} border-none rounded-lg bg-[#F7F7F7] placeholder:text-[#515151]`} placeholder={placeholder} required/>
  )
}

export default Input