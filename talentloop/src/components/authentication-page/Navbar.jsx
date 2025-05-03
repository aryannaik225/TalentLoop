'use client'

import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Navbar = () => {

  const { user, logOut } = useAuth()

  const [showMenu, setShowMenu] = useState(false)
  
  const logOutFunc = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error.message)
    } finally {
      setShowMenu(false)
    }
  }

  const windowChange = (link) => {
    setShowMenu(false)
    window.location.href = `/${link}`
  }

  return (
    <div className='flex w-screen py-5 bg-white border-b border-black justify-between px-3 lg:px-5 xl:justify-evenly items-center gap-0 xl:gap-[142px]'>
      <a href="/">
        <Image src="/authentication-page/logo.svg" alt='talentloop' width={124} height={24} className='cursor-pointer w-[100px] lg:w-[124px] h-auto'/>
      </a>
      
      <div className='flex items-center gap-12'>
        <div className='flex items-center gap-8 lg:gap-14 xl:gap-12 poppins-semibold'>
          <span className='text-xs lg:text-sm text-[#1F1F1F] hover:text-[#4f4f4f] cursor-pointer transition-all duration-300'>Home</span>
          <span className='text-xs lg:text-sm text-[#1F1F1F] hover:text-[#4f4f4f] cursor-pointer transition-all duration-300'>Create Resume</span>
        </div>

        <div className='hidden md:flex items-center gap-4'>
            {!user ? (
              <>
                <button
                  onClick={() => windowChange('authentication-page')}
                  className='text-black poppins-semibold hover:text-[#a4a4a4] hover:scale-105 duration-300 ease-out cursor-pointer'
                >
                  Sign In
                </button>
                
                <button 
                  onClick={() => windowChange('authentication-page')}
                  className="hidden md:block poppins-semibold text-white py-2 px-4 rounded-md bg-[#0CA360] hover:bg-[#185037] transition-colors duration-300 ease-out"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className='flex items-center gap-4 relative'>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className='flex items-center gap-3 hover:scale-105 duration-300 ease-out cursor-pointer'
                >
                  <motion.p 
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, stiffness: 260, delay: 0.8 }}
                    className='text-black text-sm poppins-semibold'
                  >
                    {user.name}
                  </motion.p>
                  <motion.div
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, stiffness: 260, delay: 1.2 }}
                  >
                    <Image
                      src={user.photoURL}
                      width={40}
                      height={40}
                      alt="profile"
                      className="rounded-full"
                    />
                  </motion.div>
                </button>

                <div className={`absolute top-11 right-0 bg-[#33404c] w-40 ${showMenu ? 'flex' : 'hidden'} flex-col items-center py-4 gap-4 rounded-md`}>
                  {/* <button
                    onClick={() => windowChange('profile')}
                    className='flex items-center gap-2 text-white text-sm poppins-semibold hover:text-[#a4a4a4] hover:scale-105 duration-300 ease-out cursor-pointer'
                  >
                    <Image src='/landing-page/profile-icon.svg' width={24} height={24} alt='user' />
                    Profile
                  </button> */}
                  <div className='w-10/12 h-[1px] bg-gray-500'/>
                  <button 
                    onClick={logOutFunc}
                    className='flex items-center gap-2 text-white text-sm poppins-semibold hover:text-[#a4a4a4] hover:scale-105 duration-300 ease-out cursor-pointer'
                  >
                    <Image src='/landing-page/log-out.svg' width={24} height={24} alt='log-out' />
                    Sign Out
                  </button>
                </div>
              </div>
            )
            }
        </div>
      </div>


    </div>
  )
}

export default Navbar