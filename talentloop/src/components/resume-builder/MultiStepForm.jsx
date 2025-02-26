import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const steps = [
  "Personal Info", 
  "Experience", 
  "Education", 
  "Skills", 
  "Summary"
]

const MultiStepForm = () => {

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

  const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1))
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0))

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


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


  useEffect(() => {
    setFormData({ ...formData, [name]: name, [email]: email, [phone]: phone, [experiences]: experiences, [education]: education, [skills]: skills, [summary]: summary })
  }, [name, email, phone, experiences, education, skills, summary])
  
  return (
    <div className='flex flex-col items-center justify-center w-full max-w-md h-full'>
      
      <div className='w-full flex flex-col items-center max-h-8/12 overflow-x-hidden overflow-y-scroll p-6 rounded-lg shadow-lg bg-white'>
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
              {/* {index < steps.length -1 && (
                <motion.div
                  className='w-full h-1 bg-gray-300'
                  animate={{ width: step > index ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                  style={{ transform: 'translateY(-50%)' }}
                />
              )} */}
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
                <div key={index} className="mb-4 border p-4 rounded-lg shadow-md">
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleChange(index, "company", e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  
                  <input
                    type="text"
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => handleChange(index, "role", e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => handleChange(index, "startDate", e.target.value)}
                      className="p-2 border rounded"
                    />
                    
                    <select
                      value={exp.endDate}
                      onChange={(e) => handleChange(index, "endDate", e.target.value)}
                      className="p-2 border rounded"
                    >
                      <option value="">Select End Date</option>
                      <option value="Present">Present</option>
                    </select>

                    {exp.endDate !== "Present" && (
                      <input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) => handleChange(index, "endDate", e.target.value)}
                        className="p-2 border rounded"
                      />
                    )}
                  </div>

                  {experiences.length > 1 && (
                    <button
                      onClick={() => removeExperience(index)}
                      className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={addExperience}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Add Experience
              </button>


            </div>
          )}
        </div>
      </div>
      

    </div>
  )
}

export default MultiStepForm