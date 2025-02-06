"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext"; // Import authentication context
import { useRouter } from "next/navigation";

const LoginBox = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signUp, googleSignIn } = useAuth(); // Auth functions
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      router.push("/dashboard"); // Redirect to dashboard after login/signup
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
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="w-24 py-1 flex justify-center items-center bg-[#46F1A6] rounded-sm border-[0.5px] border-black text-white">
          <span className="poppins-semibold text-[10px]">Business</span>
        </div>

        <div className="mt-[6px] flex flex-col -gap-[1px] items-center">
          <span className="poppins-semibold text-3xl">For Recruiters</span>
          <span className="max-w-[443px] poppins-regular text-xs text-center">
            Find the best talent effortlessly. Post jobs, manage applications, and connect with top candidates today!
          </span>
        </div>

        <div className="mt-9 px-8 py-3 bg-white rounded-xl border border-black flex flex-col items-center gap-[16px]">
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[16px]">
            {/* Email Field */}
            <div className="flex flex-col items-start">
              <span className="poppins-medium text-xs ml-1">Email</span>
              <div className="w-[249px] py-[8px] px-[6px] border-[0.5px] border-black rounded flex items-center gap-2">
                <Image src="/authentication-page/profile-icon.svg" alt="email" width={16} height={16} />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="poppins-regular text-xs w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col items-start">
              <span className="poppins-medium text-xs ml-1">Password</span>
              <div className="w-[249px] py-[8px] px-[6px] border-[0.5px] border-black rounded flex items-center gap-2">
                <Image src="/authentication-page/password-icon.svg" alt="password" width={16} height={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="poppins-regular text-xs w-full outline-none"
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
                  <button className="text-[8px] poppins-medium mr-1">Forgot Password</button>
                </div>
              )}
            </div>

            {/* Signup - Confirm Password Field */}
            {isSignUp && (
              <div className="flex flex-col items-start">
                <span className="poppins-medium text-xs ml-1">Re-enter Password</span>
                <div className="w-[249px] py-[8px] px-[6px] border-[0.5px] border-black rounded flex items-center gap-2">
                  <Image src="/authentication-page/password-icon.svg" alt="password" width={16} height={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="poppins-regular text-xs w-full outline-none"
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
              className="w-full bg-[#46F1A6] py-2 poppins-semibold text-[10px] text-white rounded-md hover:bg-[#3bc68a] transition-colors duration-300 ease-out"
            >
              {isSignUp ? "Signup" : "Login"} as Recruiter
            </button>
          </form>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 py-2 poppins-semibold text-[10px] text-white rounded-md hover:bg-red-600 transition-colors duration-300 ease-out"
          >
            Sign in with Google
          </button>

          {/* Toggle Login/Signup */}
          <button
            className="text-[10px] poppins-medium mt-2 text-gray-500"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Already have an account? Login" : "Don't have an account? Signup"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
