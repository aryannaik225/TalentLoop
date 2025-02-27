import React from 'react';

const ResumePreview = ({ content }) => {
  if (!content) return <p className="text-gray-500">Your resume will appear here.</p>;

  // Ensure skills exist and are arrays
  const industrialKnowledge = Array.isArray(content.skills?.["Industrial Knowledge"])
    ? content.skills["Industrial Knowledge"].join(", ")
    : content.skills?.["Industrial Knowledge"] || "N/A";

  const toolsAndTechnologies = Array.isArray(content.skills?.["Tools & Technologies"])
    ? content.skills["Tools & Technologies"].join(", ")
    : content.skills?.["Tools & Technologies"] || "N/A";

  const softSkills = Array.isArray(content.skills?.["Soft Skills"])
    ? content.skills["Soft Skills"].join(", ")
    : content.skills?.["Soft Skills"] || "N/A";

  return (
    <div className="border p-6 rounded-lg bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-2">{content.name}</h1>
      <p className="text-gray-700"><strong>Email:</strong> {content.email}</p>
      <p className="text-gray-700"><strong>Phone:</strong> {content.phone}</p>

      <h2 className="text-lg font-semibold mt-4">Summary</h2>
      <p className="text-gray-800">{content.summary}</p>

      <h2 className="text-lg font-semibold mt-4">Experience</h2>
      <ul className="list-disc ml-5">
        {content.experience?.map((exp, index) => (
          <li key={index} className="mb-2">
            <strong>{exp.role}</strong> at {exp.company} ({exp.startDate} - {exp.endDate})
            <p className="text-gray-700">{exp.description}</p>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-4">Education</h2>
      <ul className="list-disc ml-5">
        {content.education?.map((edu, index) => (
          <li key={index} className="mb-2">
            {edu.degree} from {edu.institution} ({edu.year})
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-4">Skills</h2>
      <ul className="list-disc ml-5">
        <li><strong>Industrial Knowledge:</strong> {industrialKnowledge}</li>
        <li><strong>Tools & Technologies:</strong> {toolsAndTechnologies}</li>
        <li><strong>Soft Skills:</strong> {softSkills}</li>
      </ul>
    </div>
  );
};

export default ResumePreview;
