import React from 'react'

// here children is used as a prop
function Container({children}) {
  return  <div className='w-full max-w-7xl mx-auto px-4'>
      {children}
    </div>;
  
}

export default Container
