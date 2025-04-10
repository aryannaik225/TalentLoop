# What all we need to pay attention in the ATS Score calculation
#  1. Document Synopsis
#     a. ATS Compliance - Check if the resume appears to be compliant with applicant tracking systems.
#     b. File Type - Check if the resume is in PDF document format. (Can be ignored and directly added as the resume we create is surely in pdf format)
#     c. File Size - Check if the resume is less than 2MB in size.
#     d. Page Count - Check if the resume is less than 2 pages in length.
#     e. Word Count - Check if the resume is less than 1000 words and more than 300 words in length.

#  2. Data Identification
#     a. Phone Number - Check if the resume contains a phone number.
#     b. Email Address - Check if the resume contains an email address.
#     c. LinkedIn URL - Check if the resume contains a LinkedIn URL.
#     d. Education - Check if the resume contains education section.
#     e. Experience - Check if the resume contains experience section.
#     f. Skills - Check if the resume contains skills section.
#     g. Date Formatting - Check if the dates on the resume are in a conventional format (e.g., MM/YYYY, YYYY/MM, etc.).

#  3. Lexical Analysis
#     a. Personal Pronouns - Check if the resume contains personal pronouns. Personal pronouns like "I" and "me" violate standard resume etiquette, so we recommend removing them from your resume.
#     b. Numericized Data - Check if the resume contains numericized data. Numericized data is a great way to quantify your accomplishments and make your resume stand out.
#     c. Vocabulary Level - The vocabulary level must be higher than a certain threshold. The score will be a float value of one decimal point and the range will be between 0 and 10. The higher the score, the better the vocabulary level.
#     d. Reading Level - The reading level must be higher than a certain threshold. The score will be a float value of one decimal point and the range will be between 0 and 10. The higher the score, the better the reading level.
#     e. Common Words - Check if the resume contains many frequently used words (for eg. Tech, Developer, User, Emon in a Developer's resume). As a general rule, it's a good idea to have a sense of which words best represent the archetype you are attempting to take on as a job seeker, and to make sure at least several of these words appear on your resume multiple times.

#  4. Semantic Analysis
#     a. Measurable Acheivements - Check if the resume contains measurable achievements. Measurable achievements are a great way to quantify your accomplishments and make your resume stand out. There should be more bullet points numerically quantifying your contributions at past jobs.
#     b. Soft Skills - Check if the resume contains soft skills. Soft skills are a great way to show your personality and make your resume stand out.
#     c. Hard Skills - Check if the resume contains hard skills. Hard skills are a great way to show your technical abilities and make your resume stand out.
#     d. Skills Efficiency Ratio - The skills efficiency ratio of the resume must be near to 1. The skills efficiency ratio is the ratio of the number of hard skills to soft skills.

#  5. Job Title Relevance
#     a. Job Title - Check if the job title is relevant to the job description. The job title must be relevant to the job description. The score will be a float value of one decimal point and the range will be between 0 and 10. The higher the score, the better the relevance.

#  These all points must be checked and the ATS score must be calculated for a resume. The score must be between 0 and 100. The higher the score, the better the resume.

#  ---

import re
import json
from textstat import flesch_kincaid_grade
from collections import Counter
import spacy
from sentence_transformers import CrossEncoder
import math

nlp = spacy.load("en_core_web_sm")
model = CrossEncoder('cross-encoder/stsb-roberta-base')

soft_skill_anchors = [
    "communication", "leadership", "teamwork", "adaptability", "creativity",
    "emotional intelligence", "problem-solving", "critical thinking", "time management",
    "negotiation", "conflict resolution", "collaboration", "decision making",
    "persuasion", "self-motivation", "public speaking", "interpersonal skills",
    "resilience", "customer service", "networking", "flexibility", "mentoring",
    "cultural awareness", "patience", "empathy", "work ethic", "initiative"
]

hard_skill_anchors = [
    "programming", "data analysis", "machine learning", "engineering", "cloud computing",
    "cybersecurity", "blockchain", "artificial intelligence", "deep learning",
    "big data", "software development", "database management", "computer vision",
    "natural language processing", "web development", "mobile development",
    "network administration", "DevOps", "data visualization", "biotechnology",
    "robotics", "financial modeling", "accounting", "statistical analysis",
    "CAD", "3D modeling", "supply chain management", "SEO", "digital marketing",
    "graphic design", "video editing", "automation", "embedded systems"
]

industry_keywords = {
    "Software Engineer": ["Python", "Java", "C++", "Full-Stack", "Cloud Computing", "Machine Learning", "Agile", "Git"],
    "Data Scientist": ["Data Analysis", "Machine Learning", "Deep Learning", "Python", "Pandas", "TensorFlow", "Statistics"],
    "AI Engineer": ["Deep Learning", "Neural Networks", "Python", "PyTorch", "TensorFlow", "Computer Vision", "NLP"],
    "Web Developer": ["HTML", "CSS", "JavaScript", "React.js", "Vue.js", "Node.js", "Frontend", "Backend"],
    "Mobile Developer": ["Swift", "Kotlin", "Flutter", "React Native", "Android", "iOS", "Mobile App Development"],
    "Cybersecurity Analyst": ["Penetration Testing", "Network Security", "Firewalls", "Ethical Hacking", "Cryptography"],
    "Cloud Architect": ["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker", "Microservices", "DevOps"],
    "Game Developer": ["Unity", "Unreal Engine", "C#", "C++", "Game Design", "Graphics Programming"],
    "Embedded Systems Engineer": ["C", "C++", "RTOS", "Microcontrollers", "IoT", "Firmware Development"],
    "Blockchain Developer": ["Smart Contracts", "Ethereum", "Solidity", "Web3", "DeFi", "Cryptography"],
    "Network Engineer": ["CCNA", "CCNP", "Routing", "Switching", "Firewall", "LAN/WAN", "TCP/IP"],
    "DevOps Engineer": ["CI/CD", "Jenkins", "Docker", "Kubernetes", "Infrastructure as Code", "Terraform"],
    "Database Administrator": ["SQL", "NoSQL", "PostgreSQL", "MySQL", "MongoDB", "Database Optimization"],
    "System Administrator": ["Linux", "Windows Server", "Active Directory", "Bash Scripting", "Networking"],
    "IT Support Specialist": ["Troubleshooting", "Technical Support", "Help Desk", "Customer Service"],
    "Business Analyst": ["Data Analysis", "Process Improvement", "Agile", "JIRA", "Business Intelligence"],
    "Product Manager": ["Roadmap Planning", "Market Research", "Agile", "Stakeholder Management"],
    "UX/UI Designer": ["Figma", "Sketch", "Wireframing", "Prototyping", "User Research"],
    "Graphic Designer": ["Adobe Photoshop", "Illustrator", "InDesign", "Typography", "Branding"],
    "Marketing Manager": ["SEO", "Google Ads", "Brand Strategy", "Market Research", "Content Marketing"],
    "Social Media Manager": ["Facebook Ads", "Instagram Marketing", "Engagement Metrics", "Content Creation"],
    "Content Writer": ["Copywriting", "SEO Writing", "Blogging", "Creative Writing", "Technical Writing"],
    "Video Editor": ["Adobe Premiere Pro", "Final Cut Pro", "After Effects", "Motion Graphics"],
    "Financial Analyst": ["Accounting", "Financial Modeling", "Excel", "Investment Analysis", "Risk Management"],
    "Accountant": ["Taxation", "Auditing", "Financial Statements", "Bookkeeping", "QuickBooks"],
    "Investment Banker": ["Mergers & Acquisitions", "Equity Research", "Valuation", "Financial Modeling"],
    "HR Specialist": ["Talent Acquisition", "Employee Relations", "HR Policies", "Onboarding", "Payroll"],
    "Sales Manager": ["CRM", "Cold Calling", "B2B Sales", "Negotiation", "Lead Generation"],
    "Customer Service Representative": ["Call Handling", "Conflict Resolution", "Customer Satisfaction", "Empathy"],
    "Operations Manager": ["Process Optimization", "Supply Chain Management", "Lean Six Sigma"],
    "Legal Advisor": ["Corporate Law", "Compliance", "Contract Drafting", "Intellectual Property"],
    "Doctor": ["Patient Care", "Diagnosis", "Medical Ethics", "Surgery", "Emergency Response"],
    "Nurse": ["Patient Care", "Medication Administration", "Critical Thinking", "EMR Systems"],
    "Pharmacist": ["Prescription Processing", "Drug Interaction", "Patient Counseling"],
    "Biomedical Engineer": ["Medical Devices", "Biotechnology", "Regulatory Compliance"],
    "Architect": ["AutoCAD", "SketchUp", "Building Codes", "Construction Management"],
    "Civil Engineer": ["Structural Design", "AutoCAD", "Project Management", "Geotechnical Engineering"],
    "Mechanical Engineer": ["CAD", "Thermodynamics", "HVAC", "Manufacturing Processes"],
    "Electrical Engineer": ["Circuit Design", "Power Systems", "Embedded Systems"],
    "Chemical Engineer": ["Process Engineering", "Safety Standards", "Industrial Chemistry"],
    "Aerospace Engineer": ["Aerodynamics", "Flight Mechanics", "Propulsion Systems"],
    "Environmental Engineer": ["Sustainability", "Waste Management", "Renewable Energy"],
    "Teacher": ["Lesson Planning", "Curriculum Development", "Classroom Management"],
    "Psychologist": ["Cognitive Behavior Therapy", "Patient Assessment", "Mental Health"],
    "Journalist": ["Investigative Reporting", "Editorial Writing", "Fact-Checking"],
    "Event Planner": ["Budget Management", "Vendor Coordination", "Logistics"],
    "Chef": ["Culinary Arts", "Menu Planning", "Food Safety"],
    "Fashion Designer": ["Trend Analysis", "Textile Design", "Sewing Techniques"],
    "Pilot": ["Flight Navigation", "Aircraft Systems", "FAA Regulations"],
    "Supply Chain Manager": ["Inventory Management", "Logistics", "Procurement"],
    "E-commerce Manager": ["Dropshipping", "Conversion Optimization", "Customer Retention"],
    "Actuary": ["Risk Analysis", "Probability Theory", "Statistics"],
    "Statistician": ["Data Interpretation", "Probability Distributions", "R Programming"],
    "Quality Assurance Engineer": ["Testing", "Bug Tracking", "Automation"],
    "Robotics Engineer": ["ROS", "Mechatronics", "Autonomous Systems"],
    "Ethical Hacker": ["Penetration Testing", "Network Security", "OSINT"],
    "Astronomer": ["Astrophysics", "Telescope Operation", "Data Analysis"],
    "Geologist": ["Mineral Exploration", "Geospatial Mapping", "Seismology"],
    "Political Analyst": ["Public Policy", "Legislative Research", "Speech Writing"],
    "Real Estate Agent": ["Property Valuation", "Client Negotiation", "Market Analysis"],
    "Bartender": ["Mixology", "Customer Service", "Cocktail Recipes", "Food Safety"],
    "Waiter": ["Order Management", "POS Systems", "Customer Service", "Food Handling"],
    "Retail Manager": ["Inventory Management", "Sales Strategies", "Customer Satisfaction"],
    "Cashier": ["POS Systems", "Cash Handling", "Customer Service", "Math Skills"],
    "Construction Worker": ["Blueprint Reading", "Power Tools", "Safety Regulations"],
    "Electrician": ["Wiring", "Circuit Breakers", "Electrical Codes"],
    "Plumber": ["Pipe Fitting", "Leak Detection", "Plumbing Codes"],
    "Welder": ["MIG Welding", "TIG Welding", "Blueprint Reading"],
    "Truck Driver": ["Route Planning", "Vehicle Maintenance", "Safety Regulations"],
    "Security Guard": ["Surveillance", "Crowd Control", "Conflict Resolution"],
    "Personal Trainer": ["Exercise Science", "Nutrition", "Client Motivation"],
    "Yoga Instructor": ["Asanas", "Meditation", "Flexibility Training"],
    "Physical Therapist": ["Rehabilitation", "Anatomy", "Exercise Therapy"],
    "Dentist": ["Oral Health", "Cavity Treatment", "Orthodontics"],
    "Veterinarian": ["Animal Care", "Surgery", "Veterinary Medicine"],
    "Zoologist": ["Wildlife Research", "Conservation", "Animal Behavior"],
    "Marine Biologist": ["Oceanography", "Ecosystem Research", "Diving"],
    "Park Ranger": ["Wildlife Conservation", "Visitor Safety", "Emergency Response"],
    "Librarian": ["Cataloging", "Research Assistance", "Information Management"],
    "Archivist": ["Preserving Documents", "Digital Archiving", "Historical Research"],
    "Museum Curator": ["Artifact Preservation", "Exhibit Planning", "Museum Management"],
    "Translator": ["Multilingual", "Written Translation", "Cultural Awareness"],
    "Interpreter": ["Simultaneous Translation", "Public Speaking", "Foreign Languages"],
    "Tour Guide": ["Local History", "Public Speaking", "Navigation"],
    "Travel Agent": ["Itinerary Planning", "Booking Systems", "Customer Service"],
    "Air Traffic Controller": ["Flight Coordination", "Navigation", "Emergency Handling"],
    "Meteorologist": ["Weather Prediction", "Climate Science", "Data Analysis"],
    "Forester": ["Sustainable Forestry", "Wildlife Conservation", "Fire Prevention"],
    "Agricultural Engineer": ["Farming Equipment", "Crop Management", "Irrigation Systems"],
    "Farmer": ["Crop Cultivation", "Animal Husbandry", "Agribusiness"],
    "Fisherman": ["Net Casting", "Fish Processing", "Marine Navigation"],
    "Butcher": ["Meat Cutting", "Food Safety", "Knife Skills"],
    "Baker": ["Bread Making", "Pastry Craft", "Oven Operation"],
    "Winemaker": ["Fermentation", "Grape Cultivation", "Tasting Techniques"],
    "Florist": ["Flower Arrangement", "Botany", "Customer Service"],
    "Interior Designer": ["Space Planning", "Aesthetic Design", "Furniture Selection"],
    "Real Estate Developer": ["Property Investment", "Construction Management", "Market Analysis"],
    "Landscape Architect": ["Garden Design", "Environmental Planning", "Sustainability"],
    "Set Designer": ["Stage Design", "Prop Management", "Theatrical Aesthetics"],
    "Film Director": ["Cinematography", "Script Interpretation", "Actor Coordination"],
    "Actor": ["Character Development", "Stage Presence", "Voice Control"],
    "Voice Actor": ["Dubbing", "Voice Modulation", "Studio Recording"],
    "Music Producer": ["Audio Mixing", "Composition", "Studio Equipment"],
    "DJ": ["Music Mixing", "Crowd Engagement", "Sound Engineering"],
    "Photographer": ["Lighting", "Editing", "Camera Equipment"],
    "Art Director": ["Graphic Design", "Concept Development", "Visual Storytelling"],
    "Cartoonist": ["Illustration", "Comic Writing", "Character Design"],
    "Tattoo Artist": ["Tattooing Techniques", "Sterilization", "Customer Consultation"],
    "Social Worker": ["Counseling", "Community Outreach", "Crisis Intervention"],
    "Clergy Member": ["Religious Studies", "Public Speaking", "Community Engagement"],
    "Philanthropist": ["Charity Work", "Fundraising", "Non-Profit Management"],
    "Politician": ["Public Speaking", "Legislation", "Campaign Strategy"],
    "Diplomat": ["Foreign Policy", "Negotiation", "International Relations"],
    "Intelligence Analyst": ["Data Gathering", "Threat Assessment", "Counterterrorism"],
    "Criminologist": ["Crime Analysis", "Behavioral Science", "Forensic Psychology"],
    "Detective": ["Investigation", "Surveillance", "Criminal Profiling"],
    "Forensic Scientist": ["DNA Analysis", "Fingerprint Identification", "Crime Scene Investigation"],
    "Paramedic": ["Emergency Response", "CPR", "Medical Transportation"],
    "Firefighter": ["Fire Suppression", "Rescue Operations", "First Aid"],
    "Waste Management Specialist": ["Recycling", "Environmental Compliance", "Sustainability"],
    "Renewable Energy Technician": ["Solar Panel Installation", "Wind Turbine Maintenance", "Energy Efficiency"],
    "Urban Planner": ["City Planning", "GIS", "Zoning Laws"],
    "Acting Coach": ["Theater", "Performance Training", "Public Speaking"],
    "Stunt Performer": ["Physical Fitness", "Martial Arts", "Safety Awareness"],
    "Magician": ["Illusions", "Sleight of Hand", "Stage Performance"],
    "Comedian": ["Stand-Up Comedy", "Improvisation", "Audience Engagement"],
    "Fashion Stylist": ["Trend Forecasting", "Wardrobe Coordination", "Personal Branding"],
    "Makeup Artist": ["Cosmetics", "Bridal Makeup", "Special Effects Makeup"],
    "Personal Shopper": ["Fashion Knowledge", "Customer Service", "Budgeting"],
    "Jewelry Designer": ["Metalsmithing", "Gemology", "Handcrafting"],
    "Furniture Designer": ["Carpentry", "CAD Design", "Aesthetics"],
    "Toy Designer": ["Child Psychology", "Product Safety", "Creativity"],
    "Handyman": ["Plumbing", "Electrical Repairs", "Carpentry"],
    "Tailor": ["Sewing", "Alterations", "Fabric Knowledge"],
    "Blacksmith": ["Metal Forging", "Welding", "Design"],
    "Glassblower": ["Glass Sculpting", "Kiln Operation", "Artistic Design"],
    "Ceramic Artist": ["Pottery", "Kiln Firing", "Glazing Techniques"],
    "Sculptor": ["Clay Modeling", "Stone Carving", "Bronze Casting"],
    "Illustrator": ["Digital Art", "Sketching", "Storyboarding"],
    "Screenwriter": ["Scriptwriting", "Story Structure", "Dialogue Writing"],
    "Novelist": ["Creative Writing", "Plot Development", "Editing"],
    "Poet": ["Metaphors", "Rhyming", "Literary Devices"],
    "Editor": ["Proofreading", "Grammar", "Content Structuring"],
    "Audiobook Narrator": ["Voice Acting", "Diction", "Pacing"],
    "Publisher": ["Book Distribution", "Marketing", "Printing"],
    "Radio Host": ["Public Speaking", "Script Reading", "Broadcasting"],
    "Podcaster": ["Audio Editing", "Interviewing", "Content Creation"],
    "Public Relations Specialist": ["Media Relations", "Crisis Management", "Brand Promotion"],
    "Fundraising Manager": ["Grant Writing", "Event Planning", "Donor Relations"],
    "Career Counselor": ["Resume Coaching", "Job Market Analysis", "Interview Preparation"],
    "Psychiatrist": ["Mental Health", "Medical Diagnosis", "Therapy"],
    "Speech Therapist": ["Pronunciation Training", "Communication Skills", "Language Disorders"],
    "Occupational Therapist": ["Motor Skills", "Rehabilitation", "Patient Assistance"],
    "Dietitian": ["Nutrition Planning", "Meal Preparation", "Health Education"],
    "Chiropractor": ["Spinal Adjustment", "Pain Relief", "Holistic Health"],
    "Acupuncturist": ["Traditional Medicine", "Pain Management", "Needle Techniques"],
    "Massage Therapist": ["Deep Tissue Massage", "Reflexology", "Client Comfort"],
    "Pest Control Technician": ["Insect Identification", "Chemical Safety", "Extermination Methods"],
    "Gardener": ["Plant Care", "Landscape Maintenance", "Horticulture"],
    "Florist": ["Flower Arrangement", "Botany", "Customer Service"],
    "Astrologer": ["Zodiac Interpretation", "Horoscope Reading", "Numerology"],
    "Tarot Reader": ["Card Interpretation", "Spiritual Guidance", "Intuition"],
    "Clown": ["Balloon Animals", "Comedy Performance", "Audience Engagement"],
    "Bounty Hunter": ["Fugitive Recovery", "Surveillance", "Legal Knowledge"],
    "Bodyguard": ["Personal Protection", "Security Protocols", "Self-Defense"],
    "Professional Gamer": ["E-Sports", "Strategy", "Twitch Streaming"],
    "Game Tester": ["Bug Detection", "QA Testing", "Gameplay Analysis"],
    "YouTuber": ["Video Editing", "Content Creation", "Audience Engagement"],
    "Influencer": ["Social Media Marketing", "Brand Partnerships", "Content Strategy"],
    "Drone Operator": ["Aerial Photography", "Remote Piloting", "FAA Regulations"],
    "Astronaut": ["Space Exploration", "Zero Gravity Training", "Engineering"],
    "Marine Engineer": ["Ship Maintenance", "Naval Architecture", "Fluid Mechanics"],
    "Diver": ["Underwater Exploration", "Scuba Diving", "Marine Biology"],
    "Submarine Operator": ["Navigation", "Sonar Technology", "Deep-Sea Research"],
    "Fireworks Technician": ["Pyrotechnics", "Safety Compliance", "Event Planning"],
    "Meteorite Hunter": ["Geology", "Astrophysics", "Field Research"],
    "Volcanologist": ["Seismology", "Geothermal Activity", "Rock Formation"],
    "Tornado Chaser": ["Weather Prediction", "Storm Tracking", "Data Analysis"],
    "Treasure Hunter": ["Metal Detecting", "Historical Research", "Underwater Recovery"],
    "Antique Dealer": ["Historical Knowledge", "Appraisal", "Restoration"],
    "Auctioneer": ["Public Speaking", "Salesmanship", "Bidding Management"],
    "Professional Cuddler": ["Therapeutic Touch", "Consent Awareness", "Emotional Comfort"],
    "Dog Walker": ["Animal Care", "Leash Training", "Time Management"],
    "Pet Groomer": ["Dog Haircutting", "Nail Clipping", "Hygiene Maintenance"],
    "Horse Trainer": ["Equestrian Training", "Behavioral Conditioning", "Riding Techniques"],
    "Zookeeper": ["Animal Welfare", "Conservation", "Habitat Maintenance"],
    "Fisheries Scientist": ["Marine Ecology", "Aquaculture", "Water Conservation"],
    "Forensic Accountant": ["Fraud Detection", "Financial Auditing", "Legal Investigation"],
    "Private Investigator": ["Surveillance", "Data Collection", "Interviewing"],
    "Airbnb Host": ["Hospitality", "Property Management", "Guest Relations"],
    "Escape Room Designer": ["Puzzle Creation", "Storytelling", "Mechanical Engineering"],
}


file_path = "../training-data/testing.json"
with open(file_path, "r", encoding="utf-8") as file:
    resumes = json.load(file)

# Calculating Document Synopsis for ATS
def calculate_document_synopsis(resume):
    feedback = []

    # Extract resume text
    resume_text = " ".join([
        resume.get("summary", ""),
        " ".join(exp["role"] + " " + " ".join(exp["description"]) for exp in resume.get("experience", [])),
        " ".join(edu["degree"] + " " + edu["institution"] for edu in resume.get("education", [])),
        " ".join(skill for category in resume.get("skills", []) for skill in category["skills"])
    ])

    word_count = len(resume_text.split())
    page_count = word_count // 500 # Assuming ~500 words per page

    word_score = 10
    if word_count < 130:
        word_score = 5
        feedback.append(f"⚠️ Low Word Count - {word_count} words (Min: 130)")
    elif word_count > 500:
        word_score = 7
        feedback.append(f"⚠️ High Word Count - {word_count} words (Max: 500)")

    page_score = 5
    if page_count > 2:
        page_score = 2
        feedback.append(f"⚠️ Resume exceeds 2 pages - Estimated {round(page_count, 1)} pages")

    file_size_score = 5
    pdf_score = 5

    total_score = word_score + page_score + file_size_score + pdf_score
    return total_score, feedback


#  Calculating Data Identification for ATS
def calculate_data_identification(resume):
    feedback = []
    score = 0

    # Phone Number Check
    phone_regex = r"\+?\d[\d\s\-\(\)]{9,}"  
    if re.search(phone_regex, resume.get("contact", "")):
        score += 5
    else:
        feedback.append("⚠️ Missing Phone Number")


    # Email Check
    email_regex = r"[^@]+@[^@]+\.[^@]+"
    if re.search(email_regex, resume.get("email", "")):
        score += 5
    else:
        feedback.append("⚠️ Missing Email Address")


    # LinkedIn URL Check
    linkedin_field = resume.get("linkedin", "") or resume.get("contact", "")
    if "linkedin.com" in linkedin_field.lower():
        score += 5
    else:
        feedback.append("⚠️ Missing LinkedIn URL")


    # Education Section Check
    if resume.get("education"):
        score += 5
    else:
        feedback.append("⚠️ Missing Education Section")


    # Experience Section Check 
    if resume.get("experience"):
        score += 5
    else:
        feedback.append("⚠️ Missing Experience Section")


    # Skills Section Check
    if resume.get("skills"):
        score += 5
    else:
        feedback.append("⚠️ Missing Skills Section")

    
    # Date Formatting Check (MM/YYYY, YYYY-MM, etc.)
    date_regex = r"\b(?:\d{2}/\d{4}|\d{4}-\d{2})\b"
    dates_valid = any(re.search(date_regex, exp["duration"]) for exp in resume.get("experience", []))
    if dates_valid:
        score += 5
    else:
        feedback.append("⚠️ Invalid Date Formatting (Use MM/YYYY or YYYY-MM)")

    return score, feedback

def contains_personal_pronouns(text):
    doc = nlp(text)
    pronouns = {"I", "me", "my", "mine", "we", "us", "our", "ours"}
    return any(token.text.lower() in pronouns for token in doc if token.pos_ == "PRON")


def calculate_vocabulary_score(text):
    words = re.findall(r'\b\w+\b', text.lower())
    total_words = len(words)
    unique_words = len(set(words))

    if total_words == 0:
        return 0.0

    ttr = unique_words / total_words  # Type-token ratio
    score = min(round(ttr * 25, 2), 10)  # scale TTR to 0-10 range

    return score


def calculate_readability_score(resume):
    summary_text = resume.get("summary", "")
    experience_text = " ".join(
        " ".join(exp.get("description", [])) for exp in resume.get("experience", [])
    )
    education_text = " ".join(
        edu.get("description", "") for edu in resume.get("education", [])
    )

    readable_text = f"{summary_text} {experience_text} {education_text}".strip()
    if not readable_text:
        return 0.0

    grade_level = flesch_kincaid_grade(readable_text)
    print("📘 Grade level:", grade_level)

    score = round(max(0, min((16 - grade_level), 10)),2)  # Scale to 0-10 range

    return score




def calculate_lexical_analysis(resume):
    feedback = []
    score = 0
    resume_text = (
        resume.get("summary", "") + " " +
        " ".join([" ".join(exp["description"]) for exp in resume.get("experience", [])])
    )

    # 1. Personal Pronouns Check
    if contains_personal_pronouns(resume_text):
        feedback.append("⚠️ Avoid Personal Pronouns (I, Me, My, etc.)")
    else:
        score += 5


    # 2. Numericized Data Check
    if re.search(r"\d+", resume_text):
        score += 5
    else:
        feedback.append("⚠️ Add Numericized Achievements (e.g., 'Increased sales by 20%')")

    # 3. Vocabulary Level (Scale 0-10 → 5)
    vocab_score = calculate_vocabulary_score(resume_text)
    score += vocab_score
    if vocab_score < 5:
        feedback.append(f"⚠️ Improve Vocabulary Level ({vocab_score}/10)")

    # 4. Reading Level (Scale 0-10 → 5)
    readability_score = calculate_readability_score(resume)
    score += readability_score
    if readability_score < 1:
        feedback.append(f"⚠️ Improve Readability Score ({readability_score}/10)")

    # 5. Common Words Check (Industry Keywords)
    words = resume_text.lower().split()
    keyword_count = sum(1 for word in words if word in industry_keywords)

    if keyword_count > 3:
        score += 5
    else:
        feedback.append("⚠️ Add More Industry-Relevant Keywords")

    return round(score, 2), feedback



def classify_skills(skill):
    skill_vec = nlp(skill.lower())

    soft_sim = max(skill_vec.similarity(nlp(ss)) for ss in soft_skill_anchors)
    hard_sim = max(skill_vec.similarity(nlp(hs)) for hs in hard_skill_anchors)

    return "soft" if soft_sim > hard_sim else "hard"


def categorize_skills(resume):
    soft_skills = []
    hard_skills = []

    for skill_category in resume.get("skills", []):
        for skill in skill_category["skills"]:
            classification = classify_skills(skill)
            if classification == "soft":
                soft_skills.append(skill)
            else:
                hard_skills.append(skill)

    return soft_skills, hard_skills


def calculate_skills_efficiency_ratio(hard_skills_count, soft_skills_count):
    ratio = hard_skills_count / (soft_skills_count + 1)
    score = max(0, min(10 - abs(ratio - 1) * 5, 10))

    feedback = None
    if ratio > 2:
        feedback = f"Too many hard skills ({hard_skills_count}). Consider adding more soft skills."
    elif ratio < 0.5:
        feedback = f"Too many soft skills ({soft_skills_count}). Consider adding more technical expertise."

    return round(score, 2), feedback


def check_semantic_analysis(resume, ats_report):
    score = 0
    total_score = 30

    # 1. Measurable Achievements
    achievement_count = len(resume.get("experience", []))

    if achievement_count > 1:
        score += 10
    elif achievement_count == 1:
        score += 5
    elif achievement_count < 1:
        ats_report["feedback"].append("Lack of Measurable Achievements - Consider adding quantifiable data.")

        

    # 2. Categorize Soft and Hard Skills
    soft_skills, hard_skills = categorize_skills(resume)

    if not soft_skills:
        ats_report["feedback"].append("Insufficient Soft Skills - Consider adding communication, teamwork, or leadership skills.")
    else:
        score += 5  

    if not hard_skills:
        ats_report["feedback"].append("Insufficient Hard Skills - Consider adding technical or industry-specific skills.")
    else:
        score += 5  

    # 3. Skills Efficiency Ratio
    hard_skills_count = len(hard_skills)
    soft_skills_count = len(soft_skills)
    efficiency_score, warning = calculate_skills_efficiency_ratio(hard_skills_count, soft_skills_count)
    score += efficiency_score
    if warning:
        ats_report["feedback"].append(warning)

    return score, ats_report




def check_job_title_relevance(experience):
    for experiences in experience:
        title = experiences.get("role", "").strip().lower()
        description_list = experiences.get("description", [])
        description = " ".join(description_list).strip().lower()

        if not title or not description:
            return False, "⚠️ Missing job title or description."

        # Cross-encoder takes both strings at once
        similarity_score = model.predict([(title, description)])[0]

        relevance_threshold = 0.30

        if similarity_score < relevance_threshold:
            return False, f"⚠️ The job description for '{title}' seems unrelated. Similarity Score: {similarity_score:.2f}."
        
    
    return True, f"✅ Relevance passed. Similarity Score: {similarity_score:.2f}"



def calculate_ats_score(resume):
    ats_report = {
        "score": 0,
        "feedback": [],
        "warnings": []
    }

    # Document Synopsis
    doc_synopsis_score, doc_synopsis_feedback = calculate_document_synopsis(resume)
    ats_report["score"] += doc_synopsis_score
    ats_report["feedback"].extend(doc_synopsis_feedback)

    # Data Identification
    data_id_score, data_id_feedback = calculate_data_identification(resume)
    ats_report["score"] += data_id_score
    ats_report["feedback"].extend(data_id_feedback)

    # Lexical Analysis
    lexical_score, lexical_feedback = calculate_lexical_analysis(resume)
    ats_report["score"] += lexical_score
    ats_report["feedback"].extend(lexical_feedback)

    # Semantic Analysis
    semantic_score, ats_report = check_semantic_analysis(resume, ats_report)
    ats_report["score"] += semantic_score

    # Job Title Relevance Check
    is_relevant, job_title_feedback = check_job_title_relevance(resume.get("experience", []))
    if not is_relevant:
        ats_report["feedback"].append(job_title_feedback)
    else:
        ats_report["score"] += 10

    # Normalize score to 100
    # ats_report["score"] = min(ats_report["score"], 100)

    ats_report["score"] = round(ats_report["score"] / 135 * 100, 2)  # Normalize to 100

    return ats_report