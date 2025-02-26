export async function POST(req) {
  try {
      const { prompt } = await req.json();

      const response = await fetch("http://localhost:11434/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              model: "deepseek-r1:1.5b",
              prompt: `Write a well-formatted professional resume for the following prompt: "${prompt}". Provide only the resume content, without additional explanations, thoughts, or formatting instructions.`,
              stream: false
          }),
      });

      if (!response.ok) throw new Error("Failed to fetch from Ollama");

      const data = await response.json();
      let resumeText = data.response;

      // Remove <think> ... </think> section
      resumeText = resumeText.replace(/<think>[\s\S]*?<\/think>/, '').trim();

      return Response.json({ text: resumeText });
  } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
  }
}
