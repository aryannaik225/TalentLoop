'use client'

import Navbar from "@/components/authentication-page/Navbar";
import MultiStepForm from "@/components/resume-builder/MultiStepForm";
import GeneratedResume from "@/components/resume-builder/Modern-Elegance/GeneratedResume";
import axios from "axios";
import { useState } from "react";

export default function Home() {

  const [formIsFilled, setFormIsFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeContent, setResumeContent] = useState(null);
  const [atsScore, setAtsScore] = useState(null);

  const selectedResumeTemplate = {
    fullName: "",
    jobTitle: "",
    contact: "",
    location: "",
    email: "",
    summary: "",
    experience: [
      {
        company: "",
        role: "",
        place: "",
        duration: "",
        description: ["", "", ""]
      }
    ],
    education: [
      {
        institution: "",
        degree: "",
        year_end: "",
        description: ""
      }
    ],
    skills: [
      {
        category: "Industrial Knowledge",
        skills: []
      },
      {
        category: "Tools & Technologies",
        skills: []
      },
      {
        category: "Soft Skills",
        skills: []
      }
    ]
  };

  const handleGenerateResume = async (minimalInput) => {
    try {
      setLoading(true);

      const response = await axios.post('http://localhost:5000/generate-resume', {
        user_data: minimalInput,
        resume_template: selectedResumeTemplate
      });

      const { resume_json, ats_score } = response.data;

      setResumeContent(resume_json);
      setAtsScore(ats_score);
      setLoading(false);
    } catch (error) {
      console.error("Error generating resume:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      {!formIsFilled && (
        <div className="fixed w-screen h-screen inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <MultiStepForm
            handleSubmit={handleGenerateResume}
            setFormIsFilled={setFormIsFilled}
          />
        </div>
      )}

      {loading && (
        <div className="text-center mt-10 text-lg font-semibold">Generating your resume...</div>
      )}

      {resumeContent && !loading && (
        <div className="w-screen flex justify-between relative">
          <div className="absolute top-4 flex justify-center w-screen z-50">
            <div className="rounded-full bg-white border-2 border-black px-5 py-3 shadow-md flex items-center justify-center gap-1">
              <div className="h-full aspect-square rounded-full bg-green-400" />
              <span className="text-sm font-semibold text-black ml-2 text-nowrap">ATS Score: {atsScore}%</span>
            </div>
          </div>
          <div className="w-6/12 bg-white border-r-2 border-r-black h-full">
          </div>
          <div className="w-6/12 bg-white">
            <GeneratedResume userData={resumeContent} />
          </div>
        </div>
      )}
    </div>
  );
}
