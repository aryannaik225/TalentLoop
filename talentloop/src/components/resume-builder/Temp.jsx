'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const steps = [
    "Personal Info", 
    "Experience", 
    "Education", 
    "Skills", 
    "Summary"
];

const MultiStepForm = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: "", email: "", phone: "",
        experiences: [{ company: "", role: "", duration: "" }],
        education: [{ institution: "", degree: "", year: "" }],
        skills: [],
        summary: ""
    });

    const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
    const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            
          {/* Progress Bar */}
          <div className="w-full flex justify-between items-center mb-6 relative">
              {steps.map((label, index) => (
                  <div key={index} className="relative flex flex-col items-center">
                      <motion.div 
                          className={`w-10 h-10 flex justify-center items-center rounded-full text-sm font-bold ${
                              step >= index ? 'bg-[#3fd896] text-white' : 'bg-gray-300 text-gray-700'
                          }`}
                          animate={{ scale: step === index ? 1.2 : 1 }}
                          transition={{ type: "spring", stiffness: 100 }}
                      >
                          {index + 1}
                      </motion.div>
                      <span className="text-xs mt-1">{label}</span>
                      {index < steps.length - 1 && (
                          <motion.div 
                              className="absolute top-5 left-5 w-24 h-1 bg-gray-300"
                              animate={{ width: step > index ? "100%" : "0%" }}
                              transition={{ duration: 0.4 }}
                              style={{ transform: 'translateY(-50%)' }}
                          />
                      )}
                  </div>
              ))}
          </div>

            {/* Form Fields */}
            <motion.div 
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full"
            >
                {step === 0 && (
                    <div className="flex flex-col gap-4">
                        <input type="text" name="name" placeholder="Full Name" className="p-3 border rounded" value={formData.name} onChange={handleChange} />
                        <input type="email" name="email" placeholder="Email" className="p-3 border rounded" value={formData.email} onChange={handleChange} />
                        <input type="tel" name="phone" placeholder="Phone Number" className="p-3 border rounded" value={formData.phone} onChange={handleChange} />
                    </div>
                )}
                
                {step === 1 && (
                    <div className="flex flex-col gap-4">
                        {formData.experiences.map((exp, idx) => (
                            <div key={idx} className="border p-3 rounded">
                                <input type="text" placeholder="Company" className="w-full p-2 border rounded mb-2" />
                                <input type="text" placeholder="Role" className="w-full p-2 border rounded mb-2" />
                                <input type="text" placeholder="Duration" className="w-full p-2 border rounded" />
                            </div>
                        ))}
                    </div>
                )}

                {step === 2 && (
                    <div className="flex flex-col gap-4">
                        {formData.education.map((edu, idx) => (
                            <div key={idx} className="border p-3 rounded">
                                <input type="text" placeholder="Institution" className="w-full p-2 border rounded mb-2" />
                                <input type="text" placeholder="Degree" className="w-full p-2 border rounded mb-2" />
                                <input type="text" placeholder="Year" className="w-full p-2 border rounded" />
                            </div>
                        ))}
                    </div>
                )}

                {step === 3 && (
                    <div className="flex flex-col gap-4">
                        <input type="text" name="skills" placeholder="Skills (comma-separated)" className="p-3 border rounded" value={formData.skills} onChange={handleChange} />
                    </div>
                )}

                {step === 4 && (
                    <div className="flex flex-col gap-4">
                        <textarea name="summary" placeholder="Summary about yourself" className="p-3 border rounded h-24" value={formData.summary} onChange={handleChange} />
                    </div>
                )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="w-full flex justify-between mt-6">
                <button 
                    onClick={handleBack} 
                    className={`px-4 py-2 border rounded ${step === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                    disabled={step === 0}
                >
                    Back
                </button>
                <button 
                    onClick={handleNext} 
                    className={`px-4 py-2 bg-[#3fd896] text-white rounded ${step === steps.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#33b07f]'}`}
                    disabled={step === steps.length - 1}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default MultiStepForm;
