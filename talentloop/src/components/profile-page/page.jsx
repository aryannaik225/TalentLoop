import { useState } from "react";
import { X, Search } from "lucide-react";

export default function ProfilePopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Open Profile Settings
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-[700px] flex overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-1/3 bg-gray-100 p-4">
              <div className="flex items-center gap-2 mb-4">
                <Search size={16} className="text-gray-600" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full p-1 border rounded"
                />
              </div>
              <ul className="space-y-2">
                {[
                  "Profile", "Personal Info", "Resume Upload",
                  "Skills", "Education", "Experience", "Certifications"
                ].map((item, index) => (
                  <li
                    key={index}
                    className="p-2 rounded-md cursor-pointer hover:bg-gray-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-2/3 p-6 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input type="text" className="w-full p-2 border rounded" value="John" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input type="text" className="w-full p-2 border rounded" value="Doe" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Headline</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="E.g., Full-Stack Developer" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">About Me</label>
                <textarea
                  className="w-full p-2 border rounded h-24"
                  placeholder="Write a short introduction about yourself..."
                ></textarea>
              </div>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}