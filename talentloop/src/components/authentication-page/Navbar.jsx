import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex w-screen py-5 bg-white border-b border-black justify-center items-center gap-[142px]'>
      <Image src="/authentication-page/logo.svg" alt='talentloop' width={124} height={24} className='cursor-pointer'/>
      
      <div className='flex items-center gap-[76px] poppins-semibold'>
        <span className='text-sm text-[#1F1F1F] hover:text-[#4f4f4f] cursor-pointer transition-all duration-300'>Home</span>
        <span className='text-sm text-[#1F1F1F] hover:text-[#4f4f4f] cursor-pointer transition-all duration-300'>Find job</span>
        <span className='text-sm text-[#1F1F1F] hover:text-[#4f4f4f] cursor-pointer transition-all duration-300'>Hire freelancers</span>
        <span className='text-sm text-[#1F1F1F] hover:text-[#4f4f4f] cursor-pointer transition-all duration-300'>Create Resume</span>
      </div>

      <div className='flex gap-[22px] items-center poppins-semibold'>
        <a href="/" className='text-sm cursor-pointer hover:underline-offset-2 hover:underline transition-all duration-300 hover:scale-110'>Sign In</a>
        <a href="/" className='rounded-md py-2 px-[18px] bg-[#0CA360] hover:bg-[#0CAF60] transition-all duration-300 hover:scale-110 text-sm'>Sign Up</a>
      </div>

    </div>
  )
}

export default Navbar