export async function POST(req) {
  try {
      const { prompt } = await req.json();

      const response = await fetch("http://localhost:11434/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              model: "deepseek-r1:1.5b",
              prompt: `Generate a well-formatted professional resume in JSON format for the following details:  
              ${prompt}  
              Ensure the output follows this JSON structure:  
              {
                  "name": "Full Name",
                  "email": "Email Address",
                  "phone": "Phone Number",
                  "summary": "Professional Summary in first-person",
                  "experience": [
                      {
                          "role": "Job Title",
                          "company": "Company Name",
                          "startDate": "Start Date",
                          "endDate": "End Date",
                          "description": "Description of responsibilities and achievements"
                      }
                  ],
                  "education": [
                      {
                          "degree": "Degree Name",
                          "institution": "Institution Name",
                          "year": "Graduation Year"
                      }
                  ],
                  "skills": {
                      "Industrial Knowledge": ["Skill1", "Skill2"],
                      "Tools & Technologies": ["Skill3", "Skill4"],
                      "Other Skills": ["Skill5", "Skill6"]
                  }
              }
              Provide only the JSON response without additional text or explanations.`,
              stream: false
          }),
      });

      if (!response.ok) throw new Error("Failed to fetch from Ollama");

      const data = await response.json();
      let resumeText = data.response;

      // Remove any unnecessary text before/after JSON (if DeepSeek adds comments)
      const jsonMatch = resumeText.match(/\{[\s\S]*\}/);
      const structuredResume = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

      if (!structuredResume) throw new Error("Invalid JSON format received");

      return Response.json(structuredResume);
  } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
  }
}
