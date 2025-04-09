export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "deepseek-r1:1.5b",
        prompt: `You are a strict AI assistant that follows all rules **EXACTLY**. Generate a structured resume **ONLY** in **valid JSON format**.

        🚨 **HARD RULES (DO NOT IGNORE):**  
        1️⃣ **Use FIRST-PERSON for the summary** (e.g., "I am a UX Designer...").  
        2️⃣ **DO NOT add, remove, or modify any skills. Categorize them only.**  
        3️⃣ **DO NOT change the education details. Keep names exactly as provided.**  
        4️⃣ **DO NOT duplicate any job roles or education entries.**  
        5️⃣ **Date format MUST be: `DD-MM-YYYY` (Strict format, no exceptions).**  
        6️⃣ **DO NOT output anything except the JSON object.**  
        
        **User's Provided Data:**  
        ${prompt}

        **✅ REQUIRED JSON FORMAT (Strictly Follow This)**  
        {
            "name": "Full Name",
            "email": "Email Address",
            "phone": "Phone Number",
            "summary": "First-person summary (DO NOT use third-person).",
            "experience": [
                {
                    "role": "Job Title",
                    "company": "Company Name",
                    "startDate": "DD-MM-YYYY",
                    "endDate": "DD-MM-YYYY",
                    "description": "First-person job description."
                }
            ],
            "education": [
                {
                    "degree": "Degree Name",
                    "institution": "Institution Name",
                    "year": "YYYY",
                    "description": "First-person description."
                }
            ],
            "skills": {
                "Industrial Knowledge": ["Exact user skills"],
                "Tools & Technologies": ["Exact user skills"],
                "Soft Skills": ["Exact user skills"]
            }
        }

        **Output ONLY the JSON. No extra text, no explanations.**`,
        stream: false,,
      }),
    });

    if (!response.ok) throw new Error("Failed to fetch from Ollama");

    const data = await response.json();
    let resumeText = data.response;

    // Extract JSON from AI response
    const jsonMatch = resumeText.match(/\{[\s\S]*\}/);
    const structuredResume = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (!structuredResume) throw new Error("Invalid JSON format received");

    return Response.json(structuredResume);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
