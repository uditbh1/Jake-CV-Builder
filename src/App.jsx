import "./App.css";
import { useState, useRef, forwardRef } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const dummyData = {
    title: {
      name: "Jake Ryan",
      email: "jake@su.edu",
      phone: "123-456-7890",
      linkedin: "https://linkedin.com/in/jake",
      github: "https://github.com/jake",
      leetcode: "https://github.com/jake",
      twitter: "https://github.com/jake",
    },
    education: [
      {
        id: 1,
        institution: "Southwestern University",
        startdate: "2018-08-01",
        enddate: "2021-05-01",
        place: "Georgetown, TX",
        degree: "Bachelor of Arts in Computer Science, Minor in Business",
        score: "9.04GPA",
      },
      {
        id: 2,
        institution: "Blinn College",
        startdate: "2014-08-01",
        enddate: "2018-05-01",
        place: "Bryan, TX",
        degree: "Associate's in Liberal Arts",
        score: "9.04GPA",
      },
    ],
    experience: [
      {
        id: 1,
        job: "Undergraduate Research Assistant",
        startdate: "2020-06-01",
        enddate: "2020-05-01",
        company: "Texas A&M University",
        place: "College Station, TX",
        responsibilities: [
          {
            id: 1,
            description:
              "Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems",
          },
          {
            id: 2,
            description:
              "Developed a full-stack web application using Flask, React, PostgreSQL, and Docker to analyze GitHub data",
          },
          {
            id: 3,
            description:
              "Explored ways to visualize GitHub collaboration in a classroom setting",
          },
        ],
      },
      {
        id: 2,
        job: "Information Technology Support Specialist",
        startdate: "2018-09-01",
        enddate: "2020-05-01",
        company: "Southwestern University",
        place: "Georgetown, TX",
        responsibilities: [
          {
            id: 1,
            description:
              "Communicate with managers to set up campus computers used on campus",
          },
          {
            id: 2,
            description:
              "Assess and troubleshoot computer problems brought by students, faculty, and staff",
          },
          {
            id: 3,
            description:
              "Maintain upkeep of computers, classroom equipment, and 200 printers across campus",
          },
        ],
      },
      {
        id: 3,
        job: "Artificial Intelligence Research Assistant",
        startdate: "2019-05-01",
        enddate: "2019-07-01",
        company: "Southwestern University",
        place: "Georgetown, TX",
        responsibilities: [
          {
            id: 1,
            description:
              "Explored methods to generate video game dungeons based off of The Legend of Zelda",
          },
          {
            id: 2,
            description:
              "Developed a game in Java to test the generated dungeons",
          },
          {
            id: 3,
            description:
              "Contributed 50K+ lines of code to an established codebase via Git",
          },
        ],
      },
    ],
    projects: [
      {
        id: 1,
        title: "Gitlytics",
        techstack: "Python, Flask, React, PostgreSQL, Docker",
        startdate: "2020-06-01",
        enddate: "2020-05-01",
        features: [
          {
            id: 1,
            description:
              "Developed a full-stack web application using Flask serving a REST API with React as the frontend",
          },
          {
            id: 2,
            description:
              "Implemented GitHub OAuth to get data from user’s repositories",
          },
          {
            id: 3,
            description: "Visualized GitHub data to show collaboration",
          },
        ],
      },
      {
        id: 2,
        title: "Simple Paintball",
        techstack: "Spigot API, Java, Maven, TravisCI, Git",
        startdate: "2018-05-01",
        enddate: "2020-05-01",
        features: [
          {
            id: 1,
            description:
              "Developed a Minecraft server plugin to entertain kids during free time for a previous job",
          },
          {
            id: 2,
            description:
              "Published plugin to websites gaining 2K+ downloads and an average 4.5/5-star review",
          },
          {
            id: 3,
            description:
              "Implemented continuous delivery using TravisCI to build the plugin upon new a release",
          },
        ],
      },
    ],
    skills: [
      {
        id: 1,
        category: "Languages",
        skillslist:
          "Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R",
      },
      {
        id: 2,
        category: "Frameworks",
        skillslist:
          "React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI",
      },
      {
        id: 3,
        category: "Developer Tools",
        skillslist:
          "Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse",
      },
      {
        id: 4,
        category: "Libraries",
        skillslist: "pandas, NumPy, Matplotlib",
      },
    ],
  };

  const [resumeData, setResumeData] = useState(dummyData);
  const resumePreviewRef = useRef(); // Ref to be passed to ResumePreview

  const updateResumeData = (section, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleDownload = () => {
    const element = resumePreviewRef.current; // Now targets .resume-preview-page
    if (!element) return;

    html2canvas(element, {
      scale: 2, // Higher resolution
      useCORS: true, // For external resources (if any)
      width: 595.276, // Match A4 width in pixels
      scrollY: 0, // Start from top
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.95); // High-quality JPEG
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth(); // 595.28px
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 841.89px
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = pdfWidth / imgWidth; // Scale to fit width
      const scaledWidth = pdfWidth;
      const scaledHeight = imgHeight * ratio;

      let heightLeft = scaledHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "JPEG", 0, position, scaledWidth, scaledHeight);

      // Add additional pages if content exceeds one page
      heightLeft -= pdfHeight;
      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, scaledWidth, scaledHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`${resumeData.title.name || "resume"}.pdf`);
    }).catch((error) => {
      console.error("Error generating PDF:", error);
    });
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <ResumeForm resumeData={resumeData} updateResumeData={updateResumeData} />
      </div>
      <div className="pdf-container">
        <ResumePreview ref={resumePreviewRef} resumeData={resumeData} />
        <button onClick={handleDownload} className="download-button">
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default App;