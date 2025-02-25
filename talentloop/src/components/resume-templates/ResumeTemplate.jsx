import React from "react";
import Image from "next/image";

const ResumeTemplate = ({ userData }) => {
  const {
    profile_picture = "/resume-template/default-pfp.png",
    fullName = "Maksud Alam",
    jobTitle = "Senior Product Designer",
    contact = "+1234567890",
    location = "Rampura, Dhaka, Bangladesh",
    email = "maksud@musemind.agency",
    summary = "I'm a Senior Product Designer at MuseMind, creating meaningful, user-centered experiences. With a decade pf design experience and a pashion for pushing the boundaries of design. I design products that not only are beautiful but also functional, achieve user satisfaction and increase revenue.",
    experience = [
      {
        company: "MuseMind Digital Agency",
        role: "Senior Product Designer",
        place: "Dhaka, Bangladesh",
        duration: "02/08/2021 - Present",
        description: ["Designed high-fidelity visual designs.", "Created design specifications and documentations for development teams.", "Menotred junior designers and conducted design reviews to maintain design quality and consistency."]
      },
      {
        company: "Lunchbox",
        role: "Product Designer",
        place: "Ukraine, Kiev",
        duration: "01/01/2020 - 01/07/2021",
        description: ["Designed and launched several digital products for clients in the hospitality industry, including a mobile ordering and payment app.", "Worked closely with developers to ensure design feasibility and quality."]
      },
      {
        company: "Mooonson",
        role: "UX Designer",
        place: "Dhaka, Bangladesh",
        duration: "01/06/2019 - 31/12/2019",
        description: ["Designed high fidelity visual designs and created design specifications for development teams.", "Worked closely with developers to ensure design feasibility and quality."]
      }
    ],
    education = [
      {
        institution: "Rhode Island School",
        degree: "BFA Industrial Design",
        year_end: "2013",
        description: 'Top 3% class GPA'
      },
      {
        institution: "Brown University",
        degree: "BA in Interaction Design",
        year_end: "2016",
        description: 'Top 3% class GPA'
      }
    ],
    skills = [
      {
        category: "Industry Knowledge",
        skills: ["Product Design", 'User Interface', 'User Experience', 'Interaction Design', 'Wire-framing', 'Prototyping', 'Design Research']
      },
      {
        category: "Tools and Technology",
        skills: ["Figma", 'Sketch', 'Protopie', 'Invision', 'Abstract', 'Zeplin', 'Google Analytics', 'Amplitude']
      },
      {
        category: "Other Skills",
        skills: ["HTML", 'CSS', 'jQuery']
      }
    ]
  } = userData || {};

  return (
    <div className="max-w-2xl mx-auto py-8 px-10 bg-white shadow-lg border border-gray-300 rounded-lg relative flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0 flex justify-center">
        <Image 
          src="/resume-template/Modern-shapes-of-abstract-banner-on-transparent-background-PNG.png" 
          alt="" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-15 select-none"
          draggable="false"
        />
      </div>

      {/* Profile and Contact Info */}
      <div className="flex w-full justify-between items-center z-10 relative mt-12">
        <Image src={profile_picture} width={76} height={76} alt="" draggable='false' className="select-none rounded-full border border-gray-300 shadow-md" />
        
        <div className="flex flex-col items-start gap-[6px] text-right">
          <p className="text-xs font-medium text-orange-600">{location}</p>
          <p className="text-xs font-medium text-orange-600">{contact}</p>
          <p className="text-xs font-medium text-orange-600">{email}</p>
        </div>
      </div>

      {/* About Section */}
      <div className="flex w-full mt-12 relative z-10">
        <div>
          <Image src='/resume-template/side-ways-about.png' width={25} height={570} alt="ABOUT" draggable='false' className="select-none"/>
        </div>

        <div className="flex flex-col w-full items-start pl-10">
          <span className="text-3xl uppercase font-bold poppins-bold text-gray-900">{fullName}</span>
          <span className="text-sm mt-1 text-gray-700 font-semibold">{jobTitle}</span>
          <span className="text-xs tracking-wide mt-4 text-gray-600 font-medium leading-relaxed">{summary}</span>
        </div>
      </div>

      {/* Experience Section */}
      <div className="flex w-full mt-12 relative z-10">
        <div>
          <Image src='/resume-template/side-ways-work-experience.png' width={25} height={570} alt="EXPERIENCE" draggable='false' className="select-none"/>
        </div>
        <div className="flex flex-col w-full pl-10 items-start gap-6">
          {experience.map((exp, index) => (
            <div key={index} className="flex flex-col w-full">
              <span className="text-sm font-bold capitalize text-gray-900">
                {exp.role}, {exp.company}
              </span>
              <span className="text-xs mt-1 font-medium text-orange-600">
                {exp.place} - ({exp.duration})
              </span>
              <ul className="text-xs mt-2 text-gray-600 font-medium list-disc list-outside pl-4 space-y-1">
                {exp.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full mt-12 relative z-10 justify-between">
        {/* Education Section */}
        <div className="flex w-5/12">
          <div>
            <Image src='/resume-template/side-ways-education.png' width={20} height={570} alt="EDUCATION" draggable='false' className="select-none"/>
          </div>
          <div>
            <div className="flex flex-col w-full pl-10 items-start gap-6">
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col w-full">
                  <span className="text-sm font-bold capitalize text-gray-900">
                    {edu.degree}
                  </span>

                  <span className="text-xs mt-1 font-medium text-orange-600">
                    {edu.institution} - {edu.year_end}
                  </span>

                  <ul className="text-xs mt-2 text-gray-600 font-medium list-disc list-outside pl-4 space-y-1">
                    <li className="text-gray-600 font-medium">{edu.description}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

          {/* Skills Section */}
          <div className="flex w-6/12">
            <div>
              <Image src='/resume-template/side-ways-skills.png' width={20} height={570} alt="SKILLS" draggable='false' className="select-none"/>
            </div>
            <div className="flex flex-col w-full pl-10 items-start gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="flex flex-col w-full">
                  <span className="text-sm font-bold capitalize text-gray-900">
                    {skill.category}
                  </span>

                  <span className="mt-1 text-xs font-medium text-gray-900">
                    {skill.skills.join(', ')}
                  </span>

                </div>
              ))}
            </div>
          </div>
      </div>
      


    </div>
  );
};

export default ResumeTemplate;
