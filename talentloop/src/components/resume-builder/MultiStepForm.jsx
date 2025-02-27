import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-toastify'
import { set } from 'mongoose'

const steps = [
  "Personal Info", 
  "Experience", 
  "Education", 
  "Skills", 
  "Summary"
]

const MultiStepForm = ({handleSubmit, setFormIsFilled}) => {

  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    experiences: [{ company: "", role: "", startDate: "", endDate: "" }],
    education: [{ institution: "", degree: "", year: "" }],
    skills: [],
    summary: ""
  })
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const [experiences, setExperiences] = useState([{ company: "", role: "", startDate: "", endDate: "" }])
  const [education, setEducation] = useState([{ institution: "", degree: "", year: "" }])
  const [skills, setSkills] = useState([])
  const [summary, setSummary] = useState("")

  const handleNext = () => {
    let isValid = true;

    if (step === 0) {
      if (!name.trim() || !email.trim() || !phone.trim()) {
        isValid = false;
        toast.error("Please fill in all personal info fields");
      }
    } else if (step === 1) {
      for (const exp of experiences) {
        if (!exp.company.trim() || !exp.role.trim() || !exp.startDate.trim() || (!exp.endDate.trim() && exp.endDate !== "Present")) {
          isValid = false;
          toast.error("Please fill in all experience fields");
          break;
        }
      }
    } else if (step === 2) {
      for (const edu of education) {
        if (!edu.institution.trim() || !edu.degree.trim() || !edu.year.trim()) {
          isValid = false;
          toast.error("Please fill in all education fields");
          break;
        }
      }
    } else if (step === 3) {
      if (skills.length === 0) {
        isValid = false;
        toast.error("Please add at least one skill");
      }
    }

    if (isValid) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  }

  const handleFormSubmit = () => {
    const resumeData = {
      name, email, phone, experiences, education, skills, summary
    }
    handleSubmit(resumeData)
    setFormIsFilled(true)
  }

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0))

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "skills" ? value.split(",").map((s) => s.trim()) : value,
    });
  };

  const addExperience = () => {
    setExperiences([...experiences, { company: "", role: "", startDate: "", endDate: "" }])
  }

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index))
  }

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[index][field] = value
    setExperiences(updatedExperiences)
  }

  const addEducation = () => {
    setEducation([...education, { institution: "", degree: "", year: "" }])
  }

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education]
    updatedEducation[index][field] = value
    setEducation(updatedEducation)
  }


  useEffect(() => {
    setFormData({
      ...formData, 
      name, 
      email, 
      phone, 
      experiences, 
      education, 
      skills, 
      summary 
    });    
  }, [name, email, phone, experiences, education, skills, summary])
  
  return (
    <div className='flex flex-col items-center justify-center w-full max-w-md h-screen'>
      <ToastContainer position='top-right' hideProgressBar={false} />
      <motion.div
       className='w-full flex flex-col items-center max-h-[93%] overflow-x-hidden overflow-y-scroll p-6 rounded-lg shadow-lg bg-white'
       animate={{ height: 'auto' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {/* Progress Bar */}
        <div className='w-full flex justify-between items-center relative mb-10'>
          {steps.map((label, index) => (
            <div className='relative flex items-center gap-2' key={index}>
              <div className='flex flex-col items-center gap-1'>
                <motion.div 
                  className={`flex justify-center items-center w-10 h-10 rounded-full text-sm font-bold ${step >= index ? 'bg-[#3fd896] text-white' : 'bg-gray-300 text-gray-700'}`}
                  animate={{ scale: step === index ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 100 }}  
                >
                  {index+1}
                </motion.div>
                <span className={`inter-medium ${step >= index ? 'text-xs mt-[2px]' : 'text-[8px] mt-1'}`}>{label}</span>
              </div>
            </div>
          ))}
        </div>


        {/* Form Fields */}
        <div className='w-full'>
          {step === 0 && (
            <div className='flex flex-col'>
              <h2 className='text-2xl font-semibold text-center mb-10'>Personal Info</h2>
              <span className=' mb-1 inter-semibold'>Full Name</span>
              <input 
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                name='name'
                placeholder='John Doe'
                className={`p-3 border rounded w-full text-sm ${name.length > 0 ? 'bg-white border-black' : 'bg-[#f9f9f9] border-gray-300'}`}
              />

              <span className='mt-4 mb-1 inter-semibold'>Email</span>
              <input 
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name='email'
                placeholder='johndoe@example.com'
                className={`p-3 border rounded w-full text-sm ${email.length > 0 ? 'bg-white border-black' : 'bg-[#f9f9f9] border-gray-300'}`}
              />

              <span className='mt-4 mb-1 inter-semibold'>Phone Number</span>
              <input 
                type='tel'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                name='phone'
                placeholder='123-456-7890'
                className={`p-3 border rounded w-full text-sm ${phone.length > 0 ? 'bg-white border-black' : 'bg-[#f9f9f9] border-gray-300'}`}
              />

              <div className='flex justify-between mt-10 w-full'>
                <button onClick={handleBack} className='px-6 py-2 border rounded text-sm font-semibold bg-gray-300 text-gray-400 cursor-not-allowed' disabled={true}>Back</button>
                <button onClick={handleNext} className='px-6 py-2 bg-[#3fd896] hover:bg-[#36ba81] transition-colors text-white rounded text-sm font-semibold'>Next</button>
              </div>
            </div>
          )}


          {step === 1 && (
            <div className='flex flex-col'>
              <h2 className='text-2xl font-semibold text-center mb-10'>Experience</h2>

              {experiences.map((exp, index) => (
                <div key={index} className="mb-4 border-2 p-4 rounded-lg relative">
                  <span className='mb-1 inter-semibold'>Company Name</span>
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                    className={`w-full p-2 mt-1 mb-2 border rounded ${exp.company.length > 0 ? 'bg-white border-black' : 'bg-[#f9f9f9] border-gray-300'}`}
                  />
                  
                  <span className=' mb-1 inter-semibold'>Role</span>
                  <input
                    type="text"
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                    className={`w-full p-2 mt-1 mb-2 border rounded ${exp.role.length > 0 ? 'bg-white border-black' : 'bg-[#f9f9f9] border-gray-300'}`}
                  />
                  
                  <div className="flex flex-wrap justify-between gap-2">
                    <div className='flex flex-col items-start w-6/12'>
                      <span className='mb-1 inter-semibold'>Start Date</span>
                      <input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                        className={`p-2 border rounded w-full ${exp.startDate.length > 0 ? 'bg-white border-black' : 'bg-[#f9f9f9] border-gray-300'}`}
                      />
                    </div>
                    
                    <div className='flex flex-col items-start'>
                      <span className='mb-1 inter-semibold'>Select End</span>
                      <select
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                        className="p-2 border rounded"
                      >
                        <option value="">Select End Date</option>
                        <option value="Present">Present</option>
                      </select>
                    </div>

                    {exp.endDate !== "Present" && (
                      <div className='flex flex-col items-start w-6/12'>
                        <span className='mb-1 inter-semibold'>End Date</span>
                        <input
                          type="date"
                          value={exp.endDate}
                          onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                          className={`p-2 border rounded w-full ${exp.endDate.length > 0 ? 'bg-white border-black' : 'bg-[#f9f9f9] border-gray-300'}`}
                        />
                      </div>
                    )}
                  </div>

                  {experiences.length > 1 && (
                    <button
                      onClick={() => removeExperience(index)}
                      className="mt-2 bg-[#ececec] text-white border-2 border-red-200 hover:border-red-400 p-2 rounded flex justify-center items-center absolute top-2 right-2  " 
                    >
                      <Image src='/resume-builder/dustbinIcon.svg' width={10} height={10} alt='dustbin icon' />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={addExperience}
                className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-4 py-2 rounded mt-4"
              >
                Add Experience
              </button>

              <div className='flex justify-between mt-10 w-full'>
                <button onClick={handleBack} className='px-6 py-2 bg-gray-300 hover:bg-gray-400 transition-colors text-white rounded text-sm font-semibold'>Back</button>
                <button onClick={handleNext} className='px-6 py-2 bg-[#3fd896] hover:bg-[#36ba81] transition-colors text-white rounded text-sm font-semibold'>Next</button>
              </div>
            </div>
          )}


          {step === 2 && (
            <div className='flex flex-col'>
              <h2 className='text-2xl font-semibold text-center mb-10'>Education</h2>

              {education.map((edu, index) => (
                <div key={index} className='mb-4 border-2 p-4 rounded-lg relative'>
                  <div className='flex flex-col items-start w-full'>
                    <span className='mb-1 inter-semibold'>Institution Name</span>
                    <input 
                      type="text"
                      placeholder='Harward University'
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                      className={`w-full p-2 mb-2 border rounded ${edu.institution.length > 0 ? 'bg-white border-black' : 'bg-[#f9f9f9] border-gray-300'}`} 
                    />
                  </div>

                  <div className='flex flex-col items-start w-full'>
                    <span className='mb-1 inter-semibold'>Degree</span>
                    <input
                      type="text"
                      placeholder='Bachelors in Computer Science'
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                      className={`w-full p-2 mb-2 border rounded ${edu.degree.length > 0 ? 'bg-white border-black' : 'bg-[#f9f9f9] border-gray-300'}`}
                    />
                  </div>

                  <div className='no-arrows-container flex flex-col items-start w-full'>
                    <span className='mb-1 inter-semibold'>Year</span>
                    <input
                      type="number"
                      placeholder='2020'
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                      className={`w-full p-2 mb-2 border rounded ${edu.year.length > 0 ? 'bg-white border-black' : 'bg-[#f9f9f9] border-gray-300'}`}
                    />
                  </div>

                  {education.length > 1 && (
                    <button
                      onClick={() => removeEducation(index)}
                      className='mt-2 bg-[#ececec] text-white border-2 border-red-200 hover:border-red-400 p-2 rounded flex justify-center items-center absolute top-2 right-2'
                    >
                      <Image src='/resume-builder/dustbinIcon.svg' width={10} height={10} alt='dustbin icon' />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={addEducation}
                className='bg-blue-500 hover:bg-blue-600 transition-colors text-white px-4 py-2 rounded mt-4'
              >
                Add Education
              </button>

              <div className='flex justify-between mt-10 w-full'>
                <button onClick={handleBack} className='px-6 py-2 bg-gray-300 hover:bg-gray-400 transition-colors text-white rounded text-sm font-semibold'>Back</button>
                <button onClick={handleNext} className='px-6 py-2 bg-[#3fd896] hover:bg-[#36ba81] transition-colors text-white rounded text-sm font-semibold'>Next</button>
              </div>
            </div>
          )}


          {step === 3 && (
            <div className='flex flex-col gap-4'>
              <h2 className='text-2xl font-semibold text-center mb-10'>Skills</h2>
              <div className='flex flex-col items-start w-full'>
                <span className='mb-1 inter-semibold'>Skills</span>
                <textarea 
                  type="text" 
                  name="skills"
                  placeholder="Skills (comma-separated)"
                  value={skills.join(", ")}
                  onChange={(e) => setSkills(e.target.value.split(",").map(skill => skill.trim()))}
                  className={`p-3 border rounded w-full h-32 resize-none ${skills.length > 0 ? 'bg-white border-black' : 'bg-[#f9f9f9] border-gray-300'}`}
                />
              </div>

              <div className='flex justify-between mt-10 w-full'>
                <button onClick={handleBack} className='px-6 py-2 bg-gray-300 hover:bg-gray-400 transition-colors text-white rounded text-sm font-semibold'>Back</button>
                <button onClick={handleNext} className='px-6 py-2 bg-[#3fd896] hover:bg-[#36ba81] transition-colors text-white rounded text-sm font-semibold'>Next</button>
              </div>
            </div>
          )}


          {step === 4 && (
            <div className='flex flex-col gap-4'>
              <h2 className='text-2xl font-semibold text-center mb-10'>Summary</h2>
              <div className='flex flex-col items-start w-full'>
                <span className='mb-1 inter-semibold'>Summary <span className='inter-regular'>(optional)</span></span>
                <textarea 
                  type="text" 
                  name="summary"
                  placeholder="Summary about yourself"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className={`p-3 border rounded w-full h-32 resize-none ${summary.length > 0 ? 'bg-white border-black' : 'bg-[#f9f9f9] border-gray-300'}`}
                />
              </div>

              <div className='flex justify-between mt-10 w-full'>
                <button onClick={handleBack} className='px-6 py-2 bg-gray-300 hover:bg-gray-400 transition-colors text-white rounded text-sm font-semibold'>Back</button>
                <button onClick={handleFormSubmit} className='px-6 py-2 bg-[#3fd896] hover:bg-[#36ba81] transition-colors text-white rounded text-sm font-semibold'>Skip and Submit</button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default MultiStepForm