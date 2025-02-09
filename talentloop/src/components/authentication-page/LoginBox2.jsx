"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LoginBox2 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signUp, googleSignIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      router.push("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      router.push("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <div className="w-full h-full flex justify-center items-center p-4 sm:p-6 md:p-8">
      <div className="flex flex-col items-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="w-20 sm:w-28 py-1 flex justify-center items-center bg-[#46F1A6] rounded-sm border border-black text-white">
          <span className="poppins-semibold text-[10px] sm:text-xs">Job-Seekers</span>
        </div>

        <div className="mt-2 sm:mt-4 flex flex-col items-center">
          <span className="poppins-semibold text-xl lg:text-2xl xl:text-3xl text-nowrap">For Job Seekers & Freelancers</span>
          <span className="max-w-xs sm:max-w-sm md:max-w-md text-center poppins-regular text-[10px] lg:text-xs xl:text-sm">
            Your next opportunity is just a click away. Apply for jobs, showcase your skills, and get hired!
          </span>
        </div>

        <div className="mt-6 sm:mt-9 px-6 sm:px-8 py-3 bg-white rounded-xl border-2 border-black flex flex-col items-center gap-4 sm:gap-6">
          <div className='flex gap-2 lg:gap-4 items-center'>
            <div className='w-16 sm:w-20 h-[1px] bg-[#46F1A6]'/>
            <Image src="/authentication-page/login-star-pattern.svg" alt="star" width={4} height={4}/>
            <span className='poppins-medium text-sm sm:text-base text-nowrap'>{isSignUp ? "Sign-Up" : "Login"}</span>
            <Image src="/authentication-page/login-star-pattern.svg" alt="star" width={4} height={4}/>
            <div className='w-16 sm:w-20 h-[1px] bg-[#46F1A6]'/>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4 sm:gap-6">
            {/* Email Field */}
            <div className="w-full flex flex-col items-start">
              <span className="poppins-medium text-xs sm:text-sm ml-1">Email</span>
              <div className="w-full py-2 px-3 border border-black rounded flex items-center gap-2">
                <Image src="/authentication-page/profile-icon.svg" alt="email" width={16} height={16} />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="poppins-regular text-xs sm:text-sm w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="w-full flex flex-col items-start">
              <span className="poppins-medium text-xs sm:text-sm ml-1">Password</span>
              <div className="w-full py-2 px-3 border border-black rounded flex items-center gap-2">
                <Image src="/authentication-page/password-icon.svg" alt="password" width={16} height={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="poppins-regular text-xs sm:text-sm w-full outline-none"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  <Image
                    src={showPassword ? "/authentication-page/eye-open-icon.svg" : "/authentication-page/eye-close-icon.svg"}
                    alt="eye"
                    width={16}
                    height={16}
                    className="transition-all duration-100 ease-out"
                  />
                </button>
              </div>
              {!isSignUp && (
                <div className="w-full flex justify-end">
                  <button className="text-[10px] poppins-medium self-end">Forgot Password?</button>
                </div>
              )}
            </div>

            {/* Signup - Confirm Password Field */}
            {isSignUp && (
              <div className="w-full flex flex-col items-start">
                <span className="poppins-medium text-xs sm:text-sm ml-1">Re-enter Password</span>
                <div className="w-full py-2 px-3 border border-black rounded flex items-center gap-2">
                  <Image src="/authentication-page/password-icon.svg" alt="password" width={16} height={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="poppins-regular text-xs sm:text-sm w-full outline-none"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    <Image
                      src={showPassword ? "/authentication-page/eye-open-icon.svg" : "/authentication-page/eye-close-icon.svg"}
                      alt="eye"
                      width={16}
                      height={16}
                      className="transition-all duration-100 ease-out"
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Login/Signup Button */}
            <button
              type="submit"
              className="w-full bg-[#46F1A6] py-2 poppins-semibold text-xs sm:text-sm text-white rounded-md hover:bg-[#3bc68a] transition-colors duration-300"
            >
              {isSignUp ? "Signup" : "Login"} as Job-Seeker
            </button>
          </form>

          <div className='w-full flex items-center justify-stretch gap-[6px]'>
            <div className='h-[1px] w-full bg-[#D9D9D9]'/>
            <span className='poppins-medium text-xs sm:text-sm'>OR</span>
            <div className='h-[1px] w-full bg-[#D9D9D9]'/>
          </div>

          {/* Google Login */}
          <button
           className='w-full py-2 border border-black rounded-md flex items-center justify-center hover:bg-[#F5F5F5] transition-colors duration-300'
            onAbort={handleGoogleLogin}
          >
            <Image src="/authentication-page/google-icon.svg" alt="google" width={16} height={16}/>
          </button>

        </div>
          {/* Toggle Login/Signup */}
          <div className="flex flex-col items-center mt-4">
            <span className="text-black text-xs lg:text-sm poppins-regular text-center">{isSignUp ? "Already a member of TalentLoop?" : "New to TalentLoop? Sign up & find your dream job!"}</span>
            <button
              className="text-xs lg:text-sm poppins-medium text-black"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Login Now" : "Sign-up Now"}
            </button>
          </div>
      </div>
    </div>
  )
}

export default LoginBox2