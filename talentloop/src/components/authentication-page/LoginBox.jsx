'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const LoginBox = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

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

        <div className='mt-9 px-8 py-3 bg-white rounded-xl border border-black flex flex-col items-center gap-[16px]'>
          <div className='flex gap-[6px] items-center'>
            <div className='w-[87px] h-[1px] bg-[#46F1A6]'/>
            <Image src="/authentication-page/login-star-pattern.svg" alt="star" width={4} height={4}/>
            <span className='poppins-medium text-base'>{isSignUp ? "Sign-Up" : "Login"}</span>
            <Image src="/authentication-page/login-star-pattern.svg" alt="star" width={4} height={4}/>
            <div className='w-[87px] h-[1px] bg-[#46F1A6]'/>
          </div>

          <div className='flex flex-col items-start'>
            <span className='poppins-medium text-xs ml-1'>Email</span>
            <div className='w-[249px] py-[8px] px-[6px] border-[0.5px] border-black rounded flex items-center gap-2'>
              <Image src="/authentication-page/profile-icon.svg" alt="email" width={16} height={16}/>
              <input type='email' placeholder='Email' className='poppins-regular text-xs w-full outline-none'/>
            </div>
          </div>

          <div className='flex flex-col items-start'>
            <span className='poppins-medium text-xs ml-1'>Password</span>
            <div className='w-[249px] py-[8px] px-[6px] border-[0.5px] border-black rounded flex items-center gap-2'>
              <Image src="/authentication-page/password-icon.svg" alt="email" width={16} height={16}/>
              <input type={showPassword ? 'text' : 'password'} placeholder='Password' className='poppins-regular text-xs w-full outline-none'/>
              <button onClick={() => setShowPassword(!showPassword)} >
                <Image src={showPassword ? "/authentication-page/eye-open-icon.svg" : "/authentication-page/eye-close-icon.svg"} alt="eye" width={16} height={16} className='transition-all duration-100 ease-out'/>
              </button>
            </div>
            <div className={`${isSignUp ? 'hidden' : 'w-full flex justify-end'}`}>
              <button className='text-[8px] poppins-medium mr-1'>Forgot Password</button>
            </div>
          </div>

          <div className={`${isSignUp ? 'flex flex-col items-start' : 'hidden'}`}>
            <span className='poppins-medium text-xs ml-1'>Re-enter Password</span>
            <div className='w-[249px] py-[8px] px-[6px] border-[0.5px] border-black rounded flex items-center gap-2'>
              <Image src="/authentication-page/password-icon.svg" alt="email" width={16} height={16}/>
              <input type={showPassword ? 'text' : 'password'} placeholder='Password' className='poppins-regular text-xs w-full outline-none'/>
              <button onClick={() => setShowPassword(!showPassword)} >
                <Image src={showPassword ? "/authentication-page/eye-open-icon.svg" : "/authentication-page/eye-close-icon.svg"} alt="eye" width={16} height={16} className='transition-all duration-100 ease-out'/>
              </button>
            </div>
            <div className={`${isSignUp ? 'hidden' : 'w-full flex justify-end'}`}>
              <button className='text-[8px] poppins-medium mr-1'>Forgot Password</button>
            </div>
          </div>

          <button className='w-full bg-[#46F1A6] py-2 poppins-semibold text-[10px] text-white rounded-md hover:bg-[#3bc68a] transition-colors duration-300 ease-out'>{isSignUp ? "Signup" : "Login"} as Recruiter</button>

          <div className='w-full flex items-center justify-stretch gap-[6px]'>
            <div className='h-[1px] w-full bg-[#D9D9D9]'/>
            <span className='poppins-medium text-[10px]'>OR</span>
            <div className='h-[1px] w-full bg-[#D9D9D9]'/>
          </div>

          <button className='w-full py-2 border-2 border-black rounded-md flex items-center justify-center hover:bg-[#F5F5F5] transition-colors duration-300 ease-out'>
            <Image src="/authentication-page/google-icon.svg" alt="google" width={12} height={12}/>
          </button>
        </div>

        <div className='mt-2 poppins-regular text-xs text-center'>
          New to TalentLoop? Post your first job today!
        </div>

        <div>
          <button className='poppins-medium text-[10px] hover:underline' onClick={() => setIsSignUp(!isSignUp)}>Sign-up Now</button>
        </div>

      </div>
    </div>
  )
}

export default LoginBox