'use client'

import Navbar from "@/components/authentication-page/Navbar";
import ResumePreview from "@/components/resume-builder/Modern-Elegance/ResumePreview";
import TemplateSkeleton from "@/components/resume-builder/Modern-Elegance/TemplateSkeleton";
import MultiStepForm from "@/components/resume-builder/MultiStepForm";
import GeneratedResume from "@/components/resume-builder/Modern-Elegance/GeneratedResume";
import sampleData from "@/components/resume-builder/Modern-Elegance/GeneratedResume.json";
import { useState } from "react";

export default function Home() {

  const [formIsFilled, setFormIsFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeContent, setResumeContent] = useState(null);

  const handleGenerateResume = async (formData) => {
    setLoading(true);
  
    const prompt = `Generate a professional resume based on the following user-provided details. 
    The response should be structured properly and must NOT be in third-person perspective (do not use 'he', 'she', or the person's name). Instead, use first-person implied style. 
    Provide the output in a structured JSON format as follows:
    
    Name: ${formData.name || "Not Provided"}
    Email: ${formData.email || "Not Provided"}
    Phone: ${formData.phone || "Not Provided"}
    
    Experience: ${formData.experiences?.map(exp => `${exp.role} at ${exp.company} (${exp.startDate} - ${exp.endDate})`).join("; ") || "No experience provided"}
  
    Education: ${formData.education?.map(edu => `${edu.degree} from ${edu.institution} (${edu.year})`).join("; ") || "No education details provided"}
  
    Skills: ${formData.skills?.join(", ") || "No skills provided"}
    
    Classify the skills into the following three categories:
    1. **Industrial Knowledge** - Skills related to specific industry concepts or domain expertise.
    2. **Tools & Technologies** - Programming languages, frameworks, and tools.
    3. **Soft Skills** - Communication, teamwork, problem-solving, etc.
  
    **Ensure the output follows this JSON structure:**
    {
        "name": "Full Name",
        "email": "Email Address",
        "phone": "Phone Number",
        "summary": "Professional Summary in first-person",
        "experience": [
            {
                "role": "Job Title",
                "company": "Company Name",
                "startDate": "Start Date",
                "endDate": "End Date",
                "description": "Description of responsibilities and achievements"
            }
        ],
        "education": [
            {
                "degree": "Degree Name",
                "institution": "Institution Name",
                "year": "Graduation Year"
            }
        ],
        "skills": {
            "Industrial Knowledge": ["Skill1", "Skill2"],
            "Tools & Technologies": ["Skill3", "Skill4"],
            "Soft Skills": ["Skill5", "Skill6"]
        }
    }
    **Provide only the JSON response without additional text or explanations.**`;
  
    try {
      const response = await fetch("/api/generateResume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
  
      const data = await response.json();
      setResumeContent(data);  // Ensure DeepSeek returns JSON, not plain text
    } catch (error) {
      console.error("Error generating resume:", error);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div>
      <Navbar />
      
      {/* {!formIsFilled && (
        <div className="fixed w-screen h-screen inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <MultiStepForm handleSubmit={handleGenerateResume} setFormIsFilled={setFormIsFilled} />
        </div>
      )}

      {loading && (
        <div className="fixed w-screen h-screen inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
          <div className="h-5/6">
            <TemplateSkeleton />
          </div>
        </div>
      )}

      {!loading && resumeContent && (
        <div className="w-1/2 p-4">
          <ResumePreview content={resumeContent}/>
        </div>
      )} */}

      <GeneratedResume userData={sampleData}/>
      {/* <GeneratedResume /> */}

    </div>
  );
}