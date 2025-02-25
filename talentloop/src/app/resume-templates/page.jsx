import ResumeTemplate from "@/components/resume-templates/ResumeTemplate";

export default function Home() {
  const sampleUserData = {
    fullName: "Maksud Alam",
    jobTitle: "Senior Product Designer",
    contact: "+1234567890",
    location: "Rampura, Dhaka, Bangladesh",
    email: "maksud@musemind.agency",
    summary: "I'm a Senior Product Designer at MuseMind, creating meaningful, user-centered experiences. With a decade pf design experience and a pashion for pushing the boundaries of design. I design products that not only are beautiful but also functional, achieve user satisfaction and increase revenue.",
    experience: [
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
    education: [
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
    skills: [
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
  };

  return (
    <ResumeTemplate userData={sampleUserData} />
  )
}