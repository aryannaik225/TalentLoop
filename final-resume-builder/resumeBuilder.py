import ollama
import json
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from ats_score import calculate_ats_score

app = Flask(__name__)
CORS(app)
@app.route('/generate-resume', methods=['POST'])
def generate_resume():
  data = request.json
  user_data = data.get('user_data')
  resume_template = data.get('resume_template')

  if not user_data or not resume_template:
    return jsonify({"error": "Missing user_data or resume_template"}), 400
  
  # Prepare the prompt for the model
  prompt = f"""
  You are an AI that generates **STRICTLY VALID JSON ONLY** for a resume.
  **DO NOT MODIFY OR OMIT ANY PROVIDED DATA.**
  NO MARKDOWN. NO EXPLANATIONS. **ONLY JSON OUTPUT**

  ---
  🚨 **STRICT RULES** 🚨
  1️⃣ **Use exact personal details as provided. DO NOT CHANGE NAME, EMAIL, PHONE, OR COMPANY.**
  2️⃣ **Experience must exactly match the provided role, company, and dates.**
  3️⃣ **Summary must be 4-5 sentences based on given skills and experience.**
  4️⃣ **Each experience must have at least 3 bullet points describing work done.**
  5️⃣ **Each education entry MUST have a "description" field with one meaningful sentence about coursework, GPA, or achievements. DO NOT leave it blank.**
  6️⃣ **All skills must be categorized under:**
    - `"Industrial Knowledge"`  
    - `"Tools & Technologies"`  
    - `"Soft Skills"`

  ---
  ✅ **USER INPUT**
  {json.dumps(user_data, indent=2)}

  ---
  📄 **TEMPLATE FORMAT TO FOLLOW STRICTLY** (STRICTLY FOLLOW THIS)
  {json.dumps(resume_template, indent=2)}

  ---
  🚨 **IMPORTANT:** 🚨
  - **DO NOT RETURN ANYTHING ELSE EXCEPT PURE JSON.**
  - **NO MARKDOWN (` ```json `), NO TEXT, NO EXPLANATIONS, NO COMMENTS, JUST JSON!**
  - **DO NOT include ```json or any kind of markdown. If you do, the response will be REJECTED. JSON ONLY.**
  - **FIRST SORT THE ALREADY PROVIDED SKILLS INTO THE CATEGORIES AND THEN YOU MIGHT ADD NEW IF REQUIRED**
  - **Let the WORD COUNT be between 300 and 1000**
  - **Avoid Personal Pronouns.**
  - **Keep the VOCABULARY LEVEL ABOUVE AVERAGE.**
  - **Keep the READABILITY LEVEL AVERAGE.**
  - **USE FEW INDUSTRY-RELEVANT JARGONS.**
  """

  # Query DeepSeek-R1
  response = ollama.chat(model="deepseek-r1:7b", messages=[{"role": "user", "content": prompt}])

  # Extract text safely
  output_text = response.get("message", {}).get("content", "").strip()

  if not output_text:
    # print("❌ Error: No 'message' or 'content' found in response.")
    return jsonify({"error": "No valid response from the model."}), 500

  # Remove unwanted AI-generated sections
  output_text = re.sub(r"<think>.*?</think>", "", output_text, flags=re.DOTALL)
  # output_text = re.sub(r"^```json\s*|\s*```$", "", output_text.strip(), flags=re.MULTILINE).strip()
  output_text = re.sub(r"^```json\s*|\s*```$", "", output_text.strip(), flags=re.MULTILINE).strip()

  # Remove stray commas before closing braces/brackets (e.g., "value", ])
  output_text = re.sub(r",\s*([}\]])", r"\1", output_text)

  # Remove double closing brackets (e.g., ]] instead of ])
  output_text = re.sub(r"\]\s*\]", "]", output_text)

  # Remove invisible BOM or invalid UTF-8 chars
  output_text = output_text.encode("utf-8", "ignore").decode("utf-8")



  # Validate JSON output
  try:
    resume_json = json.loads(output_text)
    # 🔧 Normalize `skills` in case it's returned as a dictionary
    if isinstance(resume_json.get("skills"), dict):
        resume_json["skills"] = [
            {
                "category": category,
                "skills": value if isinstance(value, list) else [value]
            }
            for category, value in resume_json["skills"].items()
        ]

    # 🛡️ Ensure all education entries have a "description" field
    for edu in resume_json.get("education", []):
        if "description" not in edu or not edu["description"].strip():
            edu["description"] = "Coursework included practicals, projects, and academic excellence."

    
    # print("✅ Successfully Parsed JSON:", json.dumps(resume_json, indent=4))
    ats_result = calculate_ats_score(resume_json)
    return jsonify({
      "resume_json": resume_json,
      "ats_score": ats_result["score"],
      "ats_feedback": ats_result["feedback"],
      "ats_warnings": ats_result["warnings"]
    }), 200

  except Exception as e:
    print("🔥 ERROR OCCURED:", str(e))
    print("⚠️ Raw Model Output:")
    print(output_text)  # Helps debug malformed JSON

    return jsonify({
        "error": "Invalid JSON from model",
        "message": str(e),
        "raw_output": output_text
    }), 500




@app.route('/calculate-ats', methods=['POST'])
def calculate_ats():
    data = request.json
    resume = data.get('resume')

    if not resume:
        return jsonify({"error": "Missing resume data"}), 400
    
    try:
       ats_result = calculate_ats_score(resume)
       return jsonify({
           "ats_score": ats_result["score"],
           "ats_feedback": ats_result["feedback"],
           "ats_warnings": ats_result["warnings"]
       }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
       





if __name__ == '__main__':
    app.run(debug=True)