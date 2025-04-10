"use client";
import { useEffect, useState } from "react";

const ResumeEditor = ({ resumeData, onUpdate }) => {
  const [formData, setFormData] = useState(resumeData);
  const [modifiedFields, setModifiedFields] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    setFormData(resumeData);
    setModifiedFields({});
    setIsUpdated(false);
  }, [resumeData]);

  const handleChange = (section, field, value, index = null, subField = null) => {
    const updated = { ...formData };
    if (index !== null && subField !== null) {
      updated[section][index][subField] = value;
    } else {
      updated[section] = value;
    }
    setFormData(updated);

    const key = `${section}${index !== null ? `.${index}.${subField}` : ""}`;
    setModifiedFields((prev) => ({ ...prev, [key]: true }));
    setIsUpdated(true);
  };

  const handleUpdate = () => {
    onUpdate(formData);
    setModifiedFields({});
    setIsUpdated(false);
  };

  const isFieldModified = (section, index, subField) => {
    const key = `${section}.${index}.${subField}`;
    return modifiedFields[key];
  };

  return (
    <div className="w-full h-full p-4 overflow-y-scroll no-scrollbar border-r border-gray-300 bg-white">
      <h2 className="text-center uppercase text-lg inter-semibold mb-4">Edit Resume</h2>

      {/* Profile Picture */}
      <div className="mb-6">
        <label className="block inter-bold mb-1">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                // ✅ Update with base64 string
                handleChange("profile_picture", null, reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
          className={`w-full p-2 border-2 rounded-md ${modifiedFields["profile_picture"] ? "border-yellow-500" : "border-gray-400"}`}
        />
      </div>


      {/* Personal Information */}
      <div className="mb-6">
        <h3 className="font-semibold text-md mb-2">Personal Information</h3>
        <div className="mb-4 px-3 pt-3 border rounded bg-gray-100">
          {/* Name */}
          <div className="mb-6">
            <label className="block inter-bold mb-1">Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", null, e.target.value)}
              className="w-full inter-regular text-sm p-2 border-2 rounded-md border-gray-400"
            />
          </div>


          {/* Job Title */}
          <div className="mb-6">
            <label className="block inter-bold mb-1">Job Title</label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => handleChange("jobTitle", null, e.target.value)}
              className="w-full inter-regular text-sm p-2 border-2 rounded-md border-gray-400"
            />
          </div>


          {/* Summary */}
          <div className="mb-6">
            <label className="block inter-bold mb-1">Summary</label>
            <textarea
              value={formData.summary}
              onChange={(e) => handleChange("summary", null, e.target.value)}
              className={`w-full inter-regular text-sm p-2 border-2 rounded-md ${modifiedFields["summary"] ? "border-yellow-500" : "border-gray-400"}`}
              rows={4}
            />
          </div>
        </div>
      </div>



      {/* Experience */}
      <div className="mb-6">
        <h3 className="font-semibold text-md mb-2">Experience</h3>
        {formData.experience.map((exp, i) => (
          <div key={i} className="mb-4 p-3 border rounded bg-gray-100">
            {["company", "role", "place", "duration"].map((field) => (
              <div key={field} className="mb-4">
                <label className="block capitalize inter-semibold">{field}</label>
                <input
                  type="text"
                  value={exp[field]}
                  onChange={(e) => handleChange("experience", null, e.target.value, i, field)}
                  className={`w-full p-2 border rounded inter-regular text-sm ${
                    isFieldModified("experience", i, field) ? "border-yellow-400" : "border-gray-300"
                  }`}
                />
              </div>
            ))}
            <label className="block inter-semibold mb-1">Description</label>
            {exp.description.map((desc, j) => (
              <textarea
                key={j}
                value={desc}
                onChange={(e) => {
                  const newDesc = [...exp.description];
                  newDesc[j] = e.target.value;
                  const updated = [...formData.experience];
                  updated[i].description = newDesc;
                  setFormData({ ...formData, experience: updated });

                  setModifiedFields((prev) => ({
                    ...prev,
                    [`experience.${i}.description.${j}`]: true,
                  }));
                  setIsUpdated(true);
                }}
                className={`w-full text-sm inter-regular mb-1 p-2 border rounded ${
                  modifiedFields[`experience.${i}.description.${j}`] ? "border-yellow-400" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="font-semibold text-md mb-2">Skills</h3>
        {formData.skills.map((skillSet, i) => (
          <div key={i} className="mb-2">
            <label className="block font-medium text-sm">{skillSet.category}</label>
            <input
              type="text"
              value={skillSet.skills.join(", ")}
              onChange={(e) => {
                const updated = [...formData.skills];
                updated[i].skills = e.target.value.split(",").map((s) => s.trim());
                setFormData({ ...formData, skills: updated });
                setModifiedFields((prev) => ({ ...prev, [`skills.${i}.skills`]: true }));
                setIsUpdated(true);
              }}
              className={`w-full p-2 border rounded ${
                modifiedFields[`skills.${i}.skills`] ? "border-yellow-400" : "border-gray-300"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Update Button */}
      <button
        onClick={handleUpdate}
        className={`px-4 py-2 rounded font-semibold ${
          isUpdated ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!isUpdated}
      >
        Update Resume
      </button>
    </div>
  );
};

export default ResumeEditor;
