import { useState } from "react";

export default function ResumeBuilder() {
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateResume() {
    setLoading(true);
    const res = await fetch("/api/generateResume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Software Designer" })
    });

    const data = await res.json();
    console.log(data.text);  // This is your AI-generated resume
    setResumeText(data.text);
    
}

  return (
    <div>
      <button onClick={generateResume} disabled={loading}>
        {loading ? "Generating..." : "Generate Resume"}
      </button>
      <pre>{resumeText}</pre>
    </div>
  );
}
