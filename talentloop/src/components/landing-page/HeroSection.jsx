import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import HighlighterIcon from '@/../public/landing-page/highlighter-hero.svg'
import DocumentIcon from '@/../public/landing-page/doc-hero.svg'
import TextIcon from '@/../public/landing-page/text-icon-hero.svg'
import Texttxt from '@/../public/landing-page/txt-hero.svg'
import PDFIcon from '@/../public/landing-page/pdf-icon-hero.svg'

const HeroSection = () => {
  const smallIconVariants = {
    initial: { opacity: 0, scale: 0, x: 0, y: 0 },
    animate: (custom) => ({
      opacity: 1,
      scale: 1,
      x: [0, custom.x],
      y: [0, custom.y],
      rotate: custom.rotate,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        duration: 2,
        delay: custom.delay,
      },
    }),
  }

  return (
    <div className='flex w-screen justify-evenly h-[80vh] items-center'>
      <div className='flex flex-col items-start'>
          <span className='text-nowrap poppins-medium text-[#24eb91]'>Land more interviews with better resumes</span>
          <span className='text-5xl poppins-bold text-white mt-3'>Create a smarter,</span>
          <span className='text-5xl poppins-bold text-white mt-2'>AI-Optimized <span className='text-[#24eb91]'>Resume</span></span>
          <span className='mt-6 text-white poppins-regular text-sm'>Generate a professional, job-ready resume in minutes <br/> backed by AI and our custom ATS scoring system.</span>
          <button className=' mt-6 px-10 py-3 bg-[#24eb91] hover:bg-[#0ca360] text-white hover:text-[#a4a4a4] poppins-bold transition-colors rounded'>Get Started</button>
          <span className='text-white inter-medium text-sm text-nowrap mt-2'>Not sure? <span className='text-[#24eb91] hover:text-[#0ca360] cursor-pointer'>See how it works ↓</span></span>
      </div>
      <div className="relative flex items-center justify-center">
        {/* Center Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 386 }}
          transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
          className="w-[120px] md:w-[176px] h-[180px] md:h-[226px] flex items-center justify-center hover:drop-shadow-[0px_0px_68.2px_#66fb93] transition-[filter] duration-300 ease-in-out"
        >
          <Image src={PDFIcon} alt="PDF Icon" width={176} height={226} />
        </motion.div>
        {/* Small Images */}
        {[
          { icon: HighlighterIcon, x: -120, y: -120, rotate: 465 },
          { icon: DocumentIcon, x: 120, y: -120, rotate: 700 },
          { icon: TextIcon, x: 120, y: 120, rotate: 706 },
          { icon: Texttxt, x: -120, y: 120, rotate: 389 },
        ].map((iconProps, index) => (
          <motion.div
            key={index}
            className="absolute hover:drop-shadow-[0px_0px_18.2px_#d9d9d9] transition-[filter] duration-300 ease-in-out"
            custom={{ ...iconProps, delay: index * 0.3 }}
            variants={smallIconVariants}
            initial="initial"
            animate="animate"
          >
            <Image src={iconProps.icon} alt="Icon" width={40} height={40} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HeroSection