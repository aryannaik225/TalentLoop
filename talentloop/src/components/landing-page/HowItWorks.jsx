import React from 'react'
import Image from 'next/image'
import Jigsaw from "@/../public/landing-page/jigsaw.svg"
import Writing from "@/../public/landing-page/writing.svg"
import Pallete from "@/../public/landing-page/pallete.svg"
import Download from "@/../public/landing-page/download.svg"
import { motion } from 'framer-motion'

const HowItWorks = ({ refProp }) => {
  return (
    <motion.div
      className='w-screen h-auto flex justify-center'
      ref={refProp}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className='w-full max-w-[1200px] flex flex-col items-center justify-center py-20'>
        <motion.span
          className='poppins-bold text-3xl text-white uppercase'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          How it <span className='text-[#24eb91]'>Works</span>
        </motion.span>

        <motion.span
          className='w-[50vw] text-center poppins-regular text-white text-sm mt-3'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Just enter a few key details — like your name, role, and skills. Our AI fills in the rest...
        </motion.span>

        <motion.div
          className='w-full flex items-center justify-center gap-10 mt-10'
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {[ // Card content array for mapping
            {
              icon: Jigsaw,
              step: 'Step 1',
              title: 'Select a Template',
              desc: 'Choose from clean, professional templates built to pass hiring systems and impress recruiters.'
            },
            {
              icon: Writing,
              step: 'Step 2',
              title: 'Add Your Content',
              desc: 'Provide key info like your name, title, skills, and experience. Our AI fills in the gaps.'
            },
            {
              icon: Pallete,
              step: 'Step 3',
              title: 'Customize your Resume',
              desc: 'Tweak content, and update your resume in real-time with live previews.'
            },
            {
              icon: Download,
              step: 'Step 4',
              title: 'Download & Apply',
              desc: 'Download your resume in PDF or TXT format and apply for jobs with confidence.'
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              className='flex flex-col w-44 h-56 bg-[#191919] rounded-lg px-3'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -10,
                scale: 1.03,
                transition: { y: { duration: 0.2 }, scale: { type: 'spring', stiffness: 300 } }
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.3 + i * 0.2 },
                y: { duration: 0.6, delay: 0.3 + i * 0.2 } // This is only for whileInView now
              }}
            >
              <Image src={card.icon} alt="Step Icon" width={40} height={40} className='mt-3' />
              <span className='text-xs text-[#24eb91] poppins-medium ml-1 mt-5'>{card.step}</span>
              <span className='text-md text-white poppins-bold ml-1'>{card.title}</span>
              <span className='text-[#d3d3d3] text-xs mt-2 ml-1 poppins-regular'>{card.desc}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default HowItWorks