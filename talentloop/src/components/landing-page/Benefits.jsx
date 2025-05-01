import React from 'react'
import Image from 'next/image'
import ATS from "@/../public/landing-page/benefits/ats.svg"
import Brain from "@/../public/landing-page/benefits/brain.svg"
import Robot from "@/../public/landing-page/benefits/robot.svg"
import Writing from "@/../public/landing-page/writing.svg"
import Resume from "@/../public/landing-page/benefits/resume.png"

const Benefits = () => {
  return (
    <div className='w-screen h-auto flex justify-center items-start gap-10'>
      <div className='flex flex-col items-start mt-10'>
        <span className='uppercase text-white text-3xl poppins-bold'>Some <span className='text-[#24eb91]'>Benefits</span></span>
        <span className='w-[500px] text-white poppins-regular text-sm mt-4'>Build smarter, faster, and better. Our AI-powered resume builder gives you modern templates, real-time ATS scores, and tailored content suggestions—so you stand out with every application.</span>
        <div className='grid grid-cols-2 gap-10 mt-5'>
          <div className='flex gap-4 items-center'>
            <Image src={Brain} alt='ATS' width={40} height={40} className=""/>
            <span className='text-white poppins-semibold w-32'>ATS-Optimized Output</span>
          </div>
          <div className='flex gap-4 items-center'>
            <Image src={Robot} alt='Brain' width={40} height={40} className=""/>
            <span className='text-white poppins-semibold w-32'>AI-Enhanced Content</span>
          </div>
          <div className='flex gap-4 items-center'>
            <Image src={ATS} alt='Robot' width={40} height={40} className=""/>
            <span className='text-white poppins-semibold w-32'>Real-Time ATS Scoring</span>
          </div>
          <div className='flex gap-4 items-center'>
            <Image src={Writing} alt='Writing' width={40} height={40} className=""/>
            <span className='text-white poppins-semibold w-32'>Customizable & Editable</span>
          </div>
        </div>

        <button className='bg-[#24eb91] hover:bg-[#0ca360] text-white hover:text-[#a4a4a4] py-3 px-5 rounded mt-7 poppins-bold'>Get Started</button>
      </div>

      <div className='hidden md:flex drop-shadow-[0px_0px_18.2px_#a1a1a1] transition-[filter] duration-300 ease-in-out'>
        <Image src={Resume} alt='Resume' width={500} height={500} className="hidden md:block" />
      </div>
    </div>
  )
}

export default Benefits