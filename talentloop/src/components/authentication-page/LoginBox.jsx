import React from 'react'
import Image from 'next/image'

const LoginBox = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='flex flex-col items-center'>
        <div className='w-24 py-1 flex justify-center items-center bg-[#46F1A6] rounded-sm border-[0.5px] border-black text-white'>
          <span className='poppins-semibold text-[10px]'>Business</span>
        </div>

        <div className='mt-[6px] flex flex-col -gap-[1px] items-center'>
          <span className='poppins-semibold text-3xl'>For Recruiters</span>
          <span className='max-w-[443px] poppins-regular text-xs text-center'>Find the best talent effortlessly. Post jobs, manage applications, and connect with top candidates today!</span>
        </div>

        <div className='mt-9 px-3 py-3 bg-white rounded-xl border border-black flex flex-col items-center gap-[16px]'>
          <div className='flex gap-[6px] items-center'>
            <div className='w-[87px] h-[1px] bg-[#46F1A6]'/>
            <Image src="/authentication-page/login-star-pattern.svg" alt="star" width={4} height={4}/>
            <span className='poppins-medium text-base'>Login</span>
            <Image src="/authentication-page/login-star-pattern.svg" alt="star" width={4} height={4}/>
            <div className='w-[87px] h-[1px] bg-[#46F1A6]'/>
          </div>

          <div className='flex flex-col items-start'>
            <span className='poppins-medium text-xs'>Email</span>
            <div className='w-[249px] py-8 px-6 border-[0.5px] border-black rounded '>

            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default LoginBox