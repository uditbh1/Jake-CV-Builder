import React from "react";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Title from "./Title";
import Projects from "./Projects";
// import ResumePreview from './components/ResumePreview'

const ResumeForm = ({resumeData,updateResumeData }) => {
  // Initial structure for resume data
  const initialResumeData = {
    title: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      leetcode: "",
      twitter: "",
    },
    education: [
      {
        id: 1,
        institution: "",
        startdate: "",
        enddate: "",
        place: "",
        degree: "",
        score: "",
      },
    ],
    experience: [
      {
        id: 1,
        job: "",
        startdate: "",
        enddate: "",
        company: "",
        place: "",
        responsibilities: [{ id: 1, description: "" }],
      },
    ],
    projects: [
      {
        id: 1,
        title: "",
        techstack: "",
        startdate: "",
        enddate: "",
        features: [{ id: 1, description: "" }],
      },
    ],
    skills: [{ id: 1, category: "", skillslist: "" }],
  };

  // Function to clear the form and reset data
  const handleClear = () => {
    updateResumeData("title", initialResumeData.title);
    updateResumeData("education", initialResumeData.education);
    updateResumeData("experience", initialResumeData.experience);
    updateResumeData("projects", initialResumeData.projects);
    updateResumeData("skills", initialResumeData.skills);
  };
  return (
    <div className="resume-form">
      <h1>CV BUILDER</h1>
      <hr />
      {console.log("resumeform",resumeData.title)}
      <Title updateResumeData={updateResumeData} resumeData={resumeData.title}  />
      <hr />
      <Education updateResumeData={updateResumeData} resumeData={resumeData.education} />
      <hr />
      <Experience updateResumeData={updateResumeData} resumeData={resumeData.experience} />
      <hr />
      <Projects updateResumeData={updateResumeData} resumeData={resumeData.projects} />
      <hr />
      <Skills updateResumeData={updateResumeData} resumeData={resumeData.skills} />
      <hr />
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

export default ResumeForm;
