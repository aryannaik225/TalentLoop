'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ATS from "@/../public/landing-page/benefits/ats.svg"
import Brain from "@/../public/landing-page/benefits/brain.svg"
import Robot from "@/../public/landing-page/benefits/robot.svg"
import Writing from "@/../public/landing-page/writing.svg"
import Resume from "@/../public/landing-page/benefits/resume.png"
import { useRouter } from 'next/navigation'

const benefits = [
  { icon: Brain, label: "ATS-Optimized Output" },
  { icon: Robot, label: "AI-Enhanced Content" },
  { icon: ATS, label: "Real-Time ATS Scoring" },
  { icon: Writing, label: "Customizable & Editable" }
]

const Benefits = () => {

  const router = useRouter()

  const handleRedirect = (path) => {
    router.push(path)
  }

  return (
    <motion.div
      className='w-screen h-auto flex justify-center items-start gap-10 px-6'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.2 }}
      variants={{
        hidden: {},
        visible: {}
      }}
    >
      <motion.div
        className='flex flex-col items-start mt-10'
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <span className='uppercase text-white text-3xl poppins-bold'>
          Some <span className='text-[#24eb91]'>Benefits</span>
        </span>

        <span className='w-[500px] text-white poppins-regular text-sm mt-4'>
          Build smarter, faster, and better. Our AI-powered resume builder gives you modern templates, real-time ATS scores, and tailored content suggestions—so you stand out with every application.
        </span>

        <div className='grid grid-cols-2 gap-10 mt-5'>
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              className='flex gap-4 items-center'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * i }}
            >
              <Image src={b.icon} alt={b.label} width={40} height={40} />
              <span className='text-white poppins-semibold w-32'>{b.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          className='bg-[#24eb91] hover:bg-[#0ca360] text-white hover:text-[#a4a4a4] py-3 px-5 rounded mt-7 poppins-bold'
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          onClick={() => handleRedirect('/resume-templates')}
        >
          Get Started
        </motion.button>
      </motion.div>

      <motion.div
        className='hidden md:flex drop-shadow-[0px_0px_18.2px_#a1a1a1]'
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Image src={Resume} alt='Resume' width={500} height={500} />
      </motion.div>
    </motion.div>
  )
}

export default Benefits
