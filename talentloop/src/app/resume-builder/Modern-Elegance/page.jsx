'use client'

import Navbar from "@/components/authentication-page/Navbar";
import MultiStepForm from "@/components/resume-builder/Modern-Elegance/MultiStepFormm";
import GeneratedResume from "@/components/resume-builder/Modern-Elegance/GeneratedResume";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ResumeEditor from "@/components/resume-builder/Modern-Elegance/ResumeEditor";
import FeedbackBanner from "@/components/utils/FeedbackBanner";

export default function Home() {

  const [formIsFilled, setFormIsFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeContent, setResumeContent] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [atsFeedback, setAtsFeedback] = useState(null);
  const [atsWarnings, setAtsWarnings] = useState(null);

  // For development ONLY: Load from localStorage if available
  useEffect(() => {
    const savedResume = localStorage.getItem("dev_resume");
    const savedScore = localStorage.getItem("dev_atsScore");
    const savedFeedback = localStorage.getItem("dev_atsFeedback");
    const savedWarnings = localStorage.getItem("dev_atsWarnings");

    if (savedResume && savedScore) {
      setResumeContent(JSON.parse(savedResume));
      setAtsScore(JSON.parse(savedScore));
      setAtsFeedback(JSON.parse(savedFeedback));
      setAtsWarnings(JSON.parse(savedWarnings));
      setFormIsFilled(true);
    }
  }, []);


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

      const { resume_json, ats_score, ats_feedback, ats_warnings } = response.data;

      setResumeContent(resume_json);
      setAtsScore(ats_score);
      setAtsFeedback(ats_feedback);
      setAtsWarnings(ats_warnings);
      setLoading(false);
      setFormIsFilled(true);

      // ✅ DEV ONLY: Save to localStorage for quick reloads
      localStorage.setItem("dev_resume", JSON.stringify(resume_json));  
      localStorage.setItem("dev_atsScore", JSON.stringify(ats_score));
      localStorage.setItem("dev_atsFeedback", JSON.stringify(ats_feedback));
      localStorage.setItem("dev_atsWarnings", JSON.stringify(ats_warnings));

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
        <div className="w-screen flex justify-between relative overflow-x-hidden">
          <button
            onClick={() => {
              localStorage.removeItem("dev_resume");
              localStorage.removeItem("dev_atsScore");
              localStorage.removeItem("dev_atsFeedback");
              localStorage.removeItem("dev_atsWarnings");
              location.reload(); // instantly refresh for testing
            }}
            className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg z-50"
          >
            Clear Resume Cache
          </button>
          <div className="absolute top-4 flex justify-center w-screen z-50">
            <FeedbackBanner atsScore={atsScore} atsFeedback={atsFeedback} />
          </div>
          <div className="w-6/12 bg-white border-r-2 border-r-black h-screen">
            <ResumeEditor
              resumeData={resumeContent}
              onUpdate={(updatedResume) => setResumeContent(updatedResume)}
            />
          </div>
          <div className="w-6/12 bg-white h-screen overflow-y-scroll overflow-x-hidden no-scrollbar">
            <GeneratedResume userData={resumeContent} />
          </div>
        </div>
      )}
    </div>
  );
}
