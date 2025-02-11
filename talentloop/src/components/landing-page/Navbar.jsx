import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Navbar = () => {

  const windowChange = (link) => {
    window.location.href = `/${link}`
  }

  return (
    <div className='flex justify-center items-center w-screen py-5 z-10'>
      <div className='flex justify-between items-center w-10/12'>
        <div>
          <a href='/' className='cursor-pointer'>
            <Image src='/landing-page/logo.svg' width={124} height={100} alt='home' className='cursor-pointer'/>
          </a>
        </div>

        <div className='flex justify-between items-center w-5/12'>
          <motion.button 
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, stiffness: 260, delay: 0.2 }}
            className='text-white poppins-semibold hover:text-[#a4a4a4] cursor-pointer pointer-events-auto'
          >Home</motion.button>

          <motion.button
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, stiffness: 260, delay: 0.4 }}
            className='text-white poppins-semibold hover:text-[#a4a4a4]'
          >Find job</motion.button>

          <motion.button
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, stiffness: 260, delay: 0.6 }}
            className='text-white poppins-semibold hover:text-[#a4a4a4]'
          >Hire freelancers</motion.button>

          <motion.button 
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, stiffness: 260, delay: 0.8 }}
            className='text-white poppins-semibold hover:text-[#a4a4a4]'
          >Create Resume</motion.button>
        </div>

        <div className='flex gap-6 items-center'>
          {/* <button onClick={() => windowChange('authentication-page')} className='text-white poppins-semibold hover:text-[#a4a4a4] cursor-pointer'>Sign In</button> */}
          <button className='poppins-semibold text-white py-2 px-4 rounded-md bg-[#0CA360] hover:bg-[#185037] transition-colors duration-300 ease-out'>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar