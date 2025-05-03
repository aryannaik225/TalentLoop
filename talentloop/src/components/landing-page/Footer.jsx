import React from 'react'

const Footer = () => {
  return (
    <div className='text-sm text-white text-center poppins-regular bg-[#222222] p-3'>
      <p>&copy; {new Date().getFullYear()} TalentLoop. All rights reserved.</p>
    </div>
  )
}

export default Footer