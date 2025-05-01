'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Turn as Hamburger } from 'hamburger-react'
import { useAuth } from '@/context/AuthContext'

const Navbar = () => {
  const { user, logOut } = useAuth()

  const [isOpen, setIsOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const windowChange = (link) => {
    setShowMenu(false)
    window.location.href = `/${link}`
  }

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
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex justify-center items-center w-full py-5 z-10 bg-transparent"
    >
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

        <div className="flex items-center gap-8">
          {/* Desktop Links */}
          <div className="hidden md:flex gap-6">
            {["Home", "Create Resume"].map((text, i) => (
              <motion.button
                key={text}
                onClick={() => windowChange(text === "Home" ? "" : "resume-templates")}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (i + 1), duration: 0.4 }}
                className="text-white poppins-semibold hover:text-[#a4a4a4] transition-transform hover:scale-105"
              >
                {text}
              </motion.button>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <motion.button
                  onClick={() => windowChange('authentication-page')}
                  whileHover={{ scale: 1.05 }}
                  className="text-white poppins-semibold hover:text-[#a4a4a4]"
                >
                  Sign In
                </motion.button>
                <motion.button
                  onClick={() => windowChange('authentication-page')}
                  whileHover={{ scale: 1.05 }}
                  className="poppins-semibold text-white py-2 px-4 rounded-md bg-[#0CA360] hover:bg-[#185037] transition"
                >
                  Sign Up
                </motion.button>
              </>
            ) : (
              <div className="relative">
                <motion.button
                  onClick={() => setShowMenu(!showMenu)}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-white poppins-semibold"
                  >
                    {user.name}
                  </motion.p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Image
                      src={user.photoURL || '/landing-page/default-pfp.png'}
                      width={40}
                      height={40}
                      alt="user"
                      className="rounded-full"
                    />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-11 right-0 bg-[#33404c] w-40 flex flex-col items-center py-4 gap-4 rounded-md shadow-lg z-50"
                    >
                      <button
                        onClick={() => windowChange('profile')}
                        className="flex items-center gap-2 text-white text-sm poppins-semibold hover:text-[#a4a4a4] transition-transform hover:scale-105"
                      >
                        <Image src='/landing-page/profile-icon.svg' width={24} height={24} alt='profile' />
                        Profile
                      </button>
                      <div className="w-10/12 h-[1px] bg-gray-500" />
                      <button
                        onClick={logOutFunc}
                        className="flex items-center gap-2 text-white text-sm poppins-semibold hover:text-[#a4a4a4] transition-transform hover:scale-105"
                      >
                        <Image src='/landing-page/log-out.svg' width={24} height={24} alt='log-out' />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
            size={24}
            color="#fff"
            direction="left"
            rounded
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-16 right-0 w-60 h-auto bg-[#2d2d2d] backdrop-blur-sm flex flex-col items-center py-4 gap-4 z-40 rounded-bl-xl"
          >
            {["Home", "Create Resume"].map((text) => (
              <motion.button
                key={text}
                whileHover={{ scale: 1.05 }}
                onClick={() => windowChange(text === "Home" ? "" : "resume-templates")}
                className="text-white poppins-semibold hover:text-[#a4a4a4]"
              >
                {text}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => windowChange('authentication-page')}
              className="poppins-semibold text-white py-2 px-4 rounded-md bg-[#0CA360] hover:bg-[#185037] transition"
            >
              Sign Up
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
