import React from 'react'
import Image from 'next/image'
import Jigsaw from "@/../public/landing-page/jigsaw.svg"
import Writing from "@/../public/landing-page/writing.svg"
import Pallete from "@/../public/landing-page/pallete.svg"
import Download from "@/../public/landing-page/download.svg"

const HowItWorks = ({ refProp }) => {
  return (
    <div className='w-screen h-auto flex justify-center' ref={refProp}>
      <div className='w-full max-w-[1200px] flex flex-col items-center justify-center py-20'>
        <span className='poppins-bold text-3xl text-white uppercase'>How it <span className='text-[#24eb91]'>Works</span></span>
        <span className='w-[50vw] text-center poppins-regular text-white text-sm mt-3'>Just enter a few key details — like your name, role, and skills. Our AI fills in the rest, crafting a complete, professional resume. It&#39;s then scored using our custom ATS system so you can edit, improve, and download a job-ready version in minutes.</span>

        <div className='w-full flex items-center justify-center gap-10 mt-10'>
          <div className='flex flex-col w-44 h-56 bg-[#191919] rounded-lg px-3'>
            <Image src={Jigsaw} alt="Template Icon" width={40} height={40} className='mt-3' />
            <span className='text-xs text-[#24eb91] poppins-medium ml-1 mt-5'>Step 1</span>
            <span className='text-md text-white poppins-bold ml-1'>Select a Template</span>
            <span className='text-[#d3d3d3] text-xs mt-2 ml-1 poppins-regular'>Choose from clean, professional templates built to pass hiring systems and impress recruiters.</span>
          </div>

          <div className='flex flex-col w-44 h-56 bg-[#191919] rounded-lg px-3'>
            <Image src={Writing} alt="Template Icon" width={40} height={40} className='mt-3' />
            <span className='text-xs text-[#24eb91] poppins-medium ml-1 mt-5'>Step 2</span>
            <span className='text-md text-white poppins-bold ml-1'>Add Your Content</span>
            <span className='text-[#d3d3d3] text-xs mt-2 ml-1 poppins-regular'>Provide key info like your name, title, skills, and experience. Our AI fills in the gaps.</span>
          </div>

          <div className='flex flex-col w-44 h-56 bg-[#191919] rounded-lg px-3'>
            <Image src={Pallete} alt="Template Icon" width={40} height={40} className='mt-3' />
            <span className='text-xs text-[#24eb91] poppins-medium ml-1 mt-5'>Step 3</span>
            <span className='text-md text-white poppins-bold ml-1'>Customize your Resume</span>
            <span className='text-[#d3d3d3] text-xs mt-2 ml-1 poppins-regular'>Tweak content, and update your resume in real-time with live previews.</span>
          </div>

          <div className='flex flex-col w-44 h-56 bg-[#191919] rounded-lg px-3'>
            <Image src={Download} alt="Template Icon" width={40} height={40} className='mt-3' />
            <span className='text-xs text-[#24eb91] poppins-medium ml-1 mt-5'>Step 4</span>
            <span className='text-md text-white poppins-bold ml-1'>Download & Apply</span>
            <span className='text-[#d3d3d3] text-xs mt-2 ml-1 poppins-regular'>Download your resume in PDF or TXT format and apply for jobs with confidence.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks