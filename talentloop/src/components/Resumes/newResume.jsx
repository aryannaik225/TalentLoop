import React from "react";

const Resume = () => {
  return (
    <div
      style={{
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: "14px",
        width: "790px",
        margin: "0 auto",
        padding: "40px 60px",
        lineHeight: "1.5",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontWeight: "700", margin: 0 }}>FIRST LAST</h1>
        <div style={{ fontSize: "14px" }}>
          New York, NY | P: +44 123456789 | first.last@resumeworded.com
        </div>
      </div>

      {/* EDUCATION */}
      <SectionTitle title="EDUCATION" />

      <SubSection
        title="RESUME WORDED UNIVERSITY"
        location="Boston, MA"
        date="Expected May 2019"
      />
      <p style={{ margin: "0 0 3px 0" }}>Bachelor of Engineering</p>
      <p style={{ margin: "0 0 3px 0" }}>
        Major in Computer Science; Minors in Mathematics and Psychology
      </p>
      <p style={{ margin: "0 0 3px 0" }}>
        Cumulative GPA: 3.93/4.0; Dean’s List 2015–2016
      </p>
      <p style={{ margin: "0 0 12px 0" }}>
        Relevant Coursework: Data Analysis, Software Engineering, Operating
        Systems, Algorithms, Artificial Intelligence
      </p>

      <SubSection
        title="LONDON SCHOOL OF ECONOMICS AND POLITICAL SCIENCE"
        location="New York, NY"
        date="Jul 2016 – Jul 2017"
      />
      <p style={{ margin: "0 0 20px 0" }}>
        Study Abroad Program in International Business and Globalization
      </p>

      {/* WORK EXPERIENCE */}
      <SectionTitle title="WORK EXPERIENCE" />

      <SubSection
        title="RESUME WORDED & CO."
        location="New York, NY"
        date="Jun 2017 – Sep 2017"
      />
      <Position title="Data Science Intern" />
      <Bullet>
        Built Tableau dashboard to visualize core business KPIs, saving 10
        hours/week of manual reporting
      </Bullet>
      <Bullet>
        Aggregated data from 20+ sources to build new product; led to $100,000+
        revenue
      </Bullet>
      <Bullet>
        Designed pipeline architecture for product scaled to 100,000+ daily
        users
      </Bullet>

      <SubSection
        title="EXCITING COMPANY"
        location="New York, NY"
        date="Jun 2016 – Sep 2016"
      />
      <Position title="Data Analyst Intern" />
      <Bullet>
        Implemented electronic booking system; reduced labor by 30%, overhead by
        10%
      </Bullet>
      <Bullet>
        Analyzed 25K user actions to guide product strategy; 2x engagement, 30%
        drop-off reduction, 3x shares
      </Bullet>

      {/* UNIVERSITY PROJECTS */}
      <SectionTitle title="UNIVERSITY PROJECTS" />

      <SubSection title="RECOMMENDATION ENGINE (Feb 2017)" />
      <Bullet>
        Designed and implemented movie recommendation application in 4-person
        team using Python in 3-day hackathon
      </Bullet>
      <Bullet>
        Enabled users to be recommended movies based on 50+ data points; awarded
        most innovative project by Google engineer
      </Bullet>

      <SubSection title="PINTOS - MODEL OPERATING SYSTEM (Jan 2016)" />
      <Bullet>
        Designed and implemented Unix-based operating system in 4-person team
        using C++
      </Bullet>
      <Bullet>
        Awarded First Prize in Computing’s Senior Design Projects (out of 100
        teams)
      </Bullet>

      {/* ACTIVITIES */}
      <SectionTitle title="ACTIVITIES" />

      <SubSection
        title="RESUME WORDED FINANCE SOCIETY"
        location="Boston, MA"
        date="Sep 2017 – Present"
      />
      <Position title="Head of Events" />
      <Bullet>
        Founded the first ever Business Series to organize finance training for
        500 students
      </Bullet>
      <Bullet>
        Organized and advertised 10+ quarterly networking events with 300+
        participants in 3 universities in Boston
      </Bullet>

      <SubSection title="RWU TENNIS SOCIETY" location="Boston, MA" date="Jan 2017 – Present" />
      <Bullet>
        Managed the launch of new booking system to improve organization of
        events; system now used across university
      </Bullet>

      {/* ADDITIONAL */}
      <SectionTitle title="ADDITIONAL" />
      <p style={{ margin: "0 0 6px 0" }}>
        <strong>Technical Skills:</strong> Advanced in SQL, PHP, Javascript,
        HTML/CSS; Proficient in MATLAB, Python
      </p>
      <p style={{ margin: "0 0 6px 0" }}>
        <strong>Languages:</strong> Fluent in French, English; Conversational
        Proficiency in Italian, German
      </p>
      <p style={{ margin: "0 0 6px 0" }}>
        <strong>Certifications & Training:</strong> Online Course in Management
        (Coursera), Passed Resume Worded examinations
      </p>
      <p style={{ margin: 0 }}>
        <strong>Awards:</strong> RW’s Top 30 Under 30 (2011); Won RW’s nationwide
        case competition out of 500+ participants (2013)
      </p>
    </div>
  );
};

const SectionTitle = ({ title }) => (
  <h2 style={{
    fontWeight: 700,
    borderBottom: "1px solid black",
    paddingBottom: "2px",
    margin: "25px 0 8px 0",
    fontSize: "16px",
  }}>{title}</h2>
);

const SubSection = ({ title, location, date }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      fontWeight: 600,
      margin: "10px 0 3px 0",
    }}
  >
    <div>{title}</div>
    <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
      {location && <div>{location}</div>}
      {date && <div>{date}</div>}
    </div>
  </div>
);

const Position = ({ title }) => (
  <div style={{ fontStyle: "italic", margin: "2px 0" }}>{title}</div>
);

const Bullet = ({ children }) => (
  <div style={{ paddingLeft: "18px", textIndent: "-12px", marginBottom: "3px" }}>
    • {children}
  </div>
);

export default Resume;
