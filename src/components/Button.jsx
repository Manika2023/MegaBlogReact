import React from 'react'

// type is default btn , change in submit ot other
function Button({
     children,
     type="button",
     bgColor='bg-blue-600',
     textColor="text-white",
     className="",
     // to pass the additional properties
     ...props

}) {
  return (
     // ${className}-> to overwrite the properties value
   <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
     {/* btn text */}
     {children}
   </button>
  )
}

export default Button

