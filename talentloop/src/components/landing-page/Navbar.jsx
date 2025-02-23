import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {Turn as Hamburger} from 'hamburger-react'

const Navbar = () => {

  const windowChange = (link) => {
    window.location.href = `/${link}`
  }

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex justify-center items-center w-full py-5 z-10 bg-transparent">
      <div className="flex justify-between items-center max-w-screen-xl w-full px-6">
        {/* Logo */}
        <a href="/" className="cursor-pointer">
          <Image
            src="/landing-page/logo.svg"
            width={124}
            height={100}
            alt="home"
            className="cursor-pointer"
          />
        </a>

        <div className='hidden md:flex justify-between items-center w-7/12 xl:w-5/12'>
          <motion.button 
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, stiffness: 260, delay: 0.2 }}
            className='text-sm lg:text-base text-white poppins-semibold hover:text-[#a4a4a4] cursor-pointer pointer-events-auto'
          >Home</motion.button>

          <motion.button
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, stiffness: 260, delay: 0.4 }}
            className='text-sm lg:text-base text-white poppins-semibold hover:text-[#a4a4a4]'
          >Find job</motion.button>

          <motion.button
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, stiffness: 260, delay: 0.6 }}
            className='text-sm lg:text-base text-white poppins-semibold hover:text-[#a4a4a4]'
          >Hire freelancers</motion.button>

          <motion.button 
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, stiffness: 260, delay: 0.8 }}
            className='text-sm lg:text-base text-white poppins-semibold hover:text-[#a4a4a4]'
          >Create Resume</motion.button>
        </div>

        <div className='hidden md:flex items-center gap-4'>
          <button
            onClick={() => windowChange('authentication-page')}
            className='text-white poppins-semibold hover:text-[#a4a4a4] hover:scale-105 duration-300 ease-out cursor-pointer'
          >
            Sign In
          </button>
          
          <button 
            onClick={() => windowChange('authentication-page')}
            className="hidden md:block poppins-semibold text-white py-2 px-4 rounded-md bg-[#0CA360] hover:bg-[#185037] transition-colors duration-300 ease-out"
          >
            Sign Up
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Hamburger size={24} color="#fff" rounded duration={0.5} direction='left'/>
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`md:hidden absolute top-16 right-0 w-60 bg-gray-500 flex flex-col items-center py-4 gap-4`}
        >
          {["Home", "Find job", "Hire freelancers", "Create Resume"].map(
            (text) => (
              <button
                key={text}
                className="text-white poppins-semibold hover:text-[#a4a4a4] cursor-pointer"
              >
                {text}
              </button>
            )
          )}
          <button
            onClick={() => windowChange('authentication-page')}
            className="poppins-semibold text-white py-2 px-4 rounded-md bg-[#0CA360] hover:bg-[#185037] transition-colors duration-300 ease-out"
          >
            Sign Up
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default Navbar