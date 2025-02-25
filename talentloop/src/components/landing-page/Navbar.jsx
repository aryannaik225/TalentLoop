import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {Turn as Hamburger} from 'hamburger-react'
import { useAuth } from '@/context/AuthContext'

const Navbar = () => {

  const { user, logOut } = useAuth()

  const windowChange = (link) => {
    setShowMenu(false)
    window.location.href = `/${link}`
  }

  const [isOpen, setIsOpen] = useState(false)
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
            onClick={() => windowChange('resume-templates')} 
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, stiffness: 260, delay: 0.8 }}
            className='text-sm lg:text-base text-white poppins-semibold hover:text-[#a4a4a4]'
          >Create Resume</motion.button>
        </div>

        <div className='hidden md:flex items-center gap-4'>
          {!user ? (
            <>
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
            </>
          ) : (
            <div className='flex items-center gap-4 relative'>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className='flex items-center gap-2 hover:scale-105 duration-300 ease-out cursor-pointer'
              >
                <motion.p 
                  initial={{ scale: 2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, stiffness: 260, delay: 0.8 }}
                  className='text-white poppins-semibold'
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
                <button
                  onClick={() => windowChange('profile')}
                  className='flex items-center gap-2 text-white text-sm poppins-semibold hover:text-[#a4a4a4] hover:scale-105 duration-300 ease-out cursor-pointer'
                >
                  <Image src='/landing-page/profile-icon.svg' width={24} height={24} alt='user' />
                  Profile
                </button>
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