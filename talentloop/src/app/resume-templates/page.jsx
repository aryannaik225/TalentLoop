'use client'

import Navbar from "@/components/authentication-page/Navbar";
import SelectionGrid from "@/components/resume-templates-selection-page/SelectionGrid";
import ResumeTemplate from "@/components/resume-templates/ResumeTemplate";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {

  return (
    <div className="overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Navbar />

      <div className="w-full mt-8 flex flex-col items-center">
        <span className="inter-bold text-[40px] text-[#1E2532]">Resume templates</span>
        <span className="mt-2 text-center text-[#1E2532] text-sm inter-medium">Each resume template is designed to follow the exact rules you need to get hired faster.</span>
        <span className="mt-1 text-center text-[#1E2532] text-sm inter-medium">Choose a style that fits your career and make a lasting impression.</span>
        <button 
          onClick={() => toast.warn("Select a template first!")}
          className="bg-[#3fd896] text-white inter-bold text-sm px-5 py-3 rounded mt-6 hover:bg-[#37b880]"
        >
          Create my resume
        </button>
      </div>

      {/* <SelectionGrid /> */}
      <ResumeTemplate />
    </div>
  )
}