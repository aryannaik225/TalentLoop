'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const SelectionGrid = () => {


    const templates = [
      { id: 1, name: 'Modern Elegance', category: 'Modern', image: '/resume-template-selection-page/modern-template-1.png' },
      { id: 2, name: 'Professional Template 1', category: 'Professional', image: '/resume-template-selection-page/professional-template-1.png' },
      { id: 3, name: 'Creative Template 1', category: 'Creative', image: '/resume-template-selection-page/creative-template-1.png' },
      { id: 4, name: 'Minimalist Template 1', category: 'Minimalist', image: '/resume-template-selection-page/minimalist-template-1.png' },
      { id: 5, name: 'ATS Friendly Template 1', category: 'ATS', image: '/resume-template-selection-page/ats-template-1.png' },
      { id: 6, name: 'ATS Friendly Template 2', category: 'ATS', image: '/resume-template-selection-page/ats-template-2.png' },
      { id: 7, name: 'Modern Elegance', category: 'Modern', image: '/resume-template-selection-page/modern-template-1.png' },
      { id: 8, name: 'Professional Template 1', category: 'Professional', image: '/resume-template-selection-page/professional-template-1.png' },
      { id: 9, name: 'Creative Template 1', category: 'Creative', image: '/resume-template-selection-page/creative-template-1.png' },
      { id: 10, name: 'Minimalist Template 1', category: 'Minimalist', image: '/resume-template-selection-page/minimalist-template-1.png' },
      { id: 11, name: 'ATS Friendly Template 1', category: 'ATS', image: '/resume-template-selection-page/ats-template-1.png' },
      { id: 12, name: 'ATS Friendly Template 2', category: 'ATS', image: '/resume-template-selection-page/ats-template-2.png' },
    ]

    const [selectedCategory, setSelectedCategory] = useState('All')
    const [visibleCount, setVisibleCount] = useState(6)

    const filteredTemplates = templates.filter((template) => selectedCategory === 'All' || template.category === selectedCategory)

    const windowChange = (link) => {
      window.location.href = `/${link}`
    }

    return (
      <div className='flex flex-col items-center mt-14'>
        <div className='max-w-screen w-screen max-h-16 h-auto flex justify-center items-end gap-10'>
          
          <button className={`group flex justify-center items-center gap-3 px-2 py-4 border-b-2 z-10 ${selectedCategory === 'All' ? 'border-[#3fd896]' : 'border-transparent hover:border-[#1f1f1f] transition-all'}`} onClick={() => setSelectedCategory('All')}>
            <Image src='/resume-template-selection-page/AllTemplates.svg' height={24} width={24} alt='All' className={`${selectedCategory === 'All' ? 'hidden' : 'group-hover:hidden block'}`}/>
            <Image src='/resume-template-selection-page/AllTemplatesHover.svg' height={24} width={24} alt='All' className={`${selectedCategory === 'All' ? 'block' : 'group-hover:block hidden'}`}/>
            <span className={`text-sm ${selectedCategory === 'All' ? 'text-black' : 'text-[#828BA2] group-hover:text-[#1f1f1f]'} inter-semibold`}>All templates</span>
          </button>

          <button className={`group flex justify-center items-center gap-3 px-2 py-4 border-b-2 z-10 ${selectedCategory === 'Professional' ? 'border-[#3fd896]' : 'border-transparent hover:border-[#1f1f1f] transition-all'}`} onClick={() => setSelectedCategory('Professional')}>
            <Image src='/resume-template-selection-page/ProfessionalIcon.svg' height={24} width={24} alt='Professional' className={`${selectedCategory === 'Professional' ? 'hidden' : 'group-hover:hidden block'}`}/>
            <Image src='/resume-template-selection-page/ProfessionalIconHover.svg' height={24} width={24} alt='Professional' className={`${selectedCategory === 'Professional' ? 'block' : 'group-hover:block hidden'}`}/>
            <span className={`text-sm ${selectedCategory === 'Professional' ? 'text-black' : 'text-[#828ba2] group-hover:text-[#1f1f1f]'} inter-semibold`}>Professional</span>
          </button>

          <button className={`group flex justify-center items-center gap-3 px-2 py-4 border-b-2 z-10 ${selectedCategory === 'Modern' ? 'border-[#3fd896]' : 'border-transparent hover:border-[#1f1f1f] transition-all'}`} onClick={() => setSelectedCategory('Modern')}>
            <Image src='/resume-template-selection-page/ModernIcon.svg' height={24} width={24} alt='Modern' className={`${selectedCategory === 'Modern' ? 'hidden' : 'group-hover:hidden block'}`}/>
            <Image src='/resume-template-selection-page/ModernIconHover.svg' height={24} width={24} alt='Modern' className={`${selectedCategory === 'Modern' ? 'block' : 'group-hover:block hidden'}`}/>
            <span className={`text-sm ${selectedCategory === 'Modern' ? 'text-black' : 'text-[#828ba2] group-hover:text-[#1f1f1f]'} inter-semibold`}>Modern</span>
          </button>

          <button className={`group flex justify-center items-center gap-3 px-2 py-4 border-b-2 z-10 ${selectedCategory === 'Creative' ? 'border-[#3fd896]' : 'border-transparent hover:border-[#1f1f1f] transition-all'}`} onClick={() => setSelectedCategory('Creative')}>
            <Image src='/resume-template-selection-page/CreativeIcon.svg' height={24} width={24} alt='Creative' className={`${selectedCategory === 'Creative' ? 'hidden' : 'group-hover:hidden block'}`}/>
            <Image src='/resume-template-selection-page/CreativeIconHover.svg' height={24} width={24} alt='Creative' className={`${selectedCategory === 'Creative' ? 'block' : 'group-hover:block hidden'}`}/>
            <span className={`text-sm ${selectedCategory === 'Creative' ? 'text-black' : 'text-[#828ba2] group-hover:text-[#1f1f1f]'} inter-semibold`}>Creative</span>
          </button>

          <button className={`group flex justify-center items-center gap-3 px-2 py-4 border-b-2 z-10 ${selectedCategory === 'Minimalist' ? 'border-[#3fd896]' : 'border-transparent hover:border-[#1f1f1f] transition-all'}`} onClick={() => setSelectedCategory('Minimalist')}>
            <Image src='/resume-template-selection-page/MinimilistIcon.svg' height={24} width={24} alt='Minimalist' className={`${selectedCategory === 'Minimalist' ? 'hidden' : 'group-hover:hidden block'}`}/>
            <Image src='/resume-template-selection-page/MinimilistIconHover.svg' height={24} width={24} alt='Minimalist' className={`${selectedCategory === 'Minimalist' ? 'block' : 'group-hover:block hidden'}`}/>
            <span className={`text-sm ${selectedCategory === 'Minimalist' ? 'text-black' : 'text-[#828ba2] group-hover:text-[#1f1f1f]'} inter-semibold`}>Minimalist</span>
          </button>

          <button className={`group flex justify-center items-center gap-3 px-2 py-4 border-b-2 z-10 ${selectedCategory === 'ATS' ? 'border-[#3fd896]' : 'border-transparent hover:border-[#1f1f1f] transition-all'}`} onClick={() => setSelectedCategory('ATS')}>
            <Image src='/resume-template-selection-page/ATSReadyIcon.svg' height={24} width={24} alt='ATS-Friendly' className={`${selectedCategory === 'ATS' ? 'hidden' : 'group-hover:hidden block'}`}/>
            <Image src='/resume-template-selection-page/ATSReadyIconHover.svg' height={24} width={24} alt='ATS-Friendly' className={`${selectedCategory === 'ATS' ? 'block' : 'group-hover:block hidden'}`}/>
            <span className={`text-sm ${selectedCategory === 'ATS' ? 'text-black' : 'text-[#828ba2] group-hover:text-[#1f1f1f]'} inter-semibold`}>ATS Friendly</span>
          </button>
        
        </div>
        <div className='w-screen flex justify-center mt-[-2px] z-0'><div className='w-11/12 bg-[#d9d9d9] h-[2px]'/></div>

        {/* Grid of Templates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 w-11/12 min-h-[500px] mb-10">
          {filteredTemplates.slice(0, visibleCount).map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-lg overflow-hidden shadow-lg transition-all relative"
                onClick={() => windowChange(`resume-builder/${template.name.replace(/\s+/g, "-")}`)}
              >
                <Image 
                  src={template.image} 
                  alt={template.name} 
                  width={300} 
                  height={400} 
                  className="w-full object-cover rounded-lg"
                />
                <div className='absolute bottom-5 w-full flex justify-center '>
                  <div className='bg-white w-full flex justify-center py-2 border-y-2 border-black'>
                    <p className="text-sm text-[#1f1f1f] inter-semibold">{template.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* View More Button */}
        {filteredTemplates.length > visibleCount && (
          <button 
            className="mt-6 px-6 py-2 bg-[#3fd896] text-white rounded-lg shadow-md hover:bg-[#34c584] transition-all"
            onClick={() => setVisibleCount(prev => prev + 6)}
          >
            View More
          </button>
        )}


      </div>
    )
}

export default SelectionGrid