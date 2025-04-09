import React from "react";

const Resume = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-gray-800">
      <h1 className="text-3xl font-bold">First Last</h1>
      <p>New York, NY | P: +44 123456789 | first.last@resumeworded.com</p>

      <section className="mt-6">
        <h2 className="text-xl font-bold border-b pb-1">EDUCATION</h2>
        <div className="mt-2">
          <p className="font-semibold">Resume Worded University</p>
          <p className="italic">Bachelor of Engineering, Major in Computer Science; Minors in Mathematics and Psychology</p>
          <p>Cumulative GPA: 3.93/4.0; Dean’s List 2015–2016</p>
          <p>Relevant Coursework: Data Analysis, Software Engineering, Operating Systems, Algorithms, Artificial Intelligence</p>
        </div>
        <div className="mt-2">
          <p className="font-semibold">London School of Economics and Political Science</p>
          <p className="italic">Study Abroad Program in International Business and Globalization</p>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold border-b pb-1">WORK EXPERIENCE</h2>

        <div className="mt-2">
          <p className="font-semibold">Resume Worded & Co. (8 employee venture-backed recruitment startup)</p>
          <p className="italic">Data Science Intern | Jun 2017 – Sep 2017</p>
          <ul className="list-disc list-inside ml-4">
            <li>Built Tableau dashboard to visualize core business KPIs, saving 10 hours/week of manual reporting.</li>
            <li>Aggregated unstructured data from 20+ sources to build a product that led to $100K in revenue.</li>
            <li>Designed pipeline architecture for product scaling from 0 to 100K daily active users.</li>
          </ul>
        </div>

        <div className="mt-4">
          <p className="font-semibold">Exciting Company</p>
          <p className="italic">Data Analyst Intern | Jun 2016 – Sep 2016</p>
          <ul className="list-disc list-inside ml-4">
            <li>Transitioned to paperless booking system, improving speed and accuracy; reduced labor cost by 30%.</li>
            <li>Analyzed data from 25000 users for marketing insights; 2x engagement, 30% drop-off reduction, 3x shares.</li>
          </ul>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold border-b pb-1">UNIVERSITY PROJECTS</h2>

        <div className="mt-2">
          <p className="font-semibold">Recommendation Engine (Feb 2017)</p>
          <ul className="list-disc list-inside ml-4">
            <li>Built movie recommendation app in 3-day hackathon using Python in 4-person team.</li>
            <li>Enabled recommendations from 50+ data points; recognized by Google engineer.</li>
          </ul>
        </div>

        <div className="mt-4">
          <p className="font-semibold">Pintos - Model Operating System (Jan 2016)</p>
          <ul className="list-disc list-inside ml-4">
            <li>Built Unix-based OS in 4-person team using C++.</li>
            <li>Awarded First Prize in Computing’s Senior Design Projects (out of 100 teams).</li>
          </ul>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold border-b pb-1">ACTIVITIES</h2>

        <div className="mt-2">
          <p className="font-semibold">Resume Worded Finance Society</p>
          <p className="italic">Head of Events | Sep 2017 – Present</p>
          <ul className="list-disc list-inside ml-4">
            <li>Organized Business Series for 500 students and 10+ networking events with 300+ participants.</li>
          </ul>
        </div>

        <div className="mt-4">
          <p className="font-semibold">RWU Tennis Society</p>
          <p className="italic">Committee Member | Jan 2017 – Present</p>
          <ul className="list-disc list-inside ml-4">
            <li>Launched new booking system to improve event organization; adopted across university.</li>
          </ul>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold border-b pb-1">ADDITIONAL</h2>
        <p><strong>Technical Skills:</strong> Advanced in SQL, PHP, Javascript, HTML/CSS; Proficient in MATLAB, Python</p>
        <p><strong>Languages:</strong> Fluent in French, English; Conversational in Italian, German</p>
        <p><strong>Certifications & Training:</strong> Online Course in Management, Resume Worded exams</p>
        <p><strong>Awards:</strong> RW’s Top 30 Under 30 (2011); RW’s nationwide case competition (2013)</p>
      </section>
    </div>
  );
};

export default Resume;
