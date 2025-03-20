import React, { forwardRef } from "react";
import "../styles/ResumePreview.css";
const ResumePreview = forwardRef(({ resumeData }, ref) => {
  const validEducation = resumeData.education.filter(
    (education) =>
      education.institution ||
      education.startdate ||
      education.enddate ||
      education.place ||
      education.degree ||
      education.score
  );
  const validExperience = resumeData.experience.filter(
    (experience) =>
      (experience.job ||
        experience.startdate ||
        experience.enddate ||
        experience.company ||
        experience.place) &&
      // Ensure that responsibilities array has at least one non-empty description
      experience.responsibilities &&
      experience.responsibilities.some(
        (responsibility) => responsibility.description.trim() !== ""
      )
  );
  const validProjects = resumeData.projects.filter(
    (project) =>
      (project.title ||
        project.techstack ||
        project.startdate ||
        project.enddate) &&
      // Ensure that features array has at least one non-empty feature description
      project.features &&
      project.features.some((feature) => feature.description.trim() !== "")
  );
  const validSkills = resumeData.skills.filter(
    (skill) => skill.category && skill.skillslist
  );
  return (
    <div className="resume-preview-page" ref={ref}>
      <div className="title">
        {resumeData.title.name && (<div className="title-name">{resumeData.title.name}</div>)}
        <div className="title-links">
          {resumeData.title.email && (<div className="email">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 3v18h24v-18h-24zm22 16l-6.526-6.618-3.445 3.483-3.418-3.525-6.611 6.66 5.051-8-5.051-6 10.029 7.446 9.971-7.446-4.998 6.01 4.998 7.99z" />
            </svg>
            <a href={resumeData.title.email}>{resumeData.title.email}</a>
          </div>)}
          {resumeData.title.phone && (<div className="phone">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M16 0v3h-8c-1.104 0-2 .896-2 2v17c0 1.104.896 2 2 2h8c1.104 0 2-.896 2-2v-22h-2zm0 13h-8v-7h8v7z" />
            </svg>

            <a href={resumeData.title.phone}>{resumeData.title.phone}</a>
          </div>)}
          {resumeData.title.linkedin && (<div className="linkedin">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>

            <a href={resumeData.title.linkedin}>{resumeData.title.linkedin.slice(8)}</a>
          </div>)}
          {resumeData.title.github && (<div className="github">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>

            <a href={resumeData.title.github}>{resumeData.title.github.slice(8)}</a>
          </div>)}
          {resumeData.title.leetcode && (<div className="leetcode">
            <svg
              fill="#000000"
              viewBox="0 0 24 24"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <title>LeetCode icon</title>
                <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" />
              </g>
            </svg>
            <a href={resumeData.title.leetcode}>{resumeData.title.leetcode.slice(8)}</a>
          </div>)}
          {resumeData.title.twitter && (<div className="twitter">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>

            <a href={resumeData.title.twitter}>{resumeData.title.twitter.slice(8)}</a>
          </div>)}
        </div>
        {validEducation.length > 0 && (
          <div className="education">
            <div className="education-preview-header">Education</div>
            <hr />
            <div className="education-entries">
              {validEducation.map((education) => (
                <div className="education-entry-preview" key={education.id}>
                  <div className="education-first">
                    <div className="instituition-score">
                      <div className="institution">{education.institution}</div>
                      <div className="score">{education.score}</div>
                    </div>
                    <div className="place">{education.place}</div>
                  </div>
                  <div className="education-second">
                    <div className="degree">{education.degree}</div>
                    <div className="education-dates">
                      <div className="education-start-date">
                        {education.startdate}
                      </div>
                      -
                      <div className="education-end-date">
                        {education.enddate}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {validExperience.length > 0 && (
          <div className="experience">
            <div className="experience-preview-header">Experience</div>
            <hr />
            <div className="experience-entries">
              {validExperience.map((experience) => (
                <div className="education-entry-preview" key={experience.id}>
                  <div className="experience-first">
                    <div className="job">{experience.job}</div>
                    <div className="experience-dates">
                      <div className="experience-start-date">
                        {experience.startdate}
                      </div>
                      -
                      <div className="experience-end-date">
                        {experience.enddate}
                      </div>
                    </div>
                  </div>
                  <div className="experience-second">
                    <div className="experience-company">
                      {experience.company}
                    </div>
                    <div className="experience-place">{experience.place}</div>
                  </div>
                  {/* Render responsibilities if they exist */}
                  {experience.responsibilities.length > 0 && (
                    <ul className="experience-responsibilities">
                      {experience.responsibilities.map((responsibility) => (
                        <li key={responsibility.id}>
                          {responsibility.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {validProjects.length > 0 && (
          <div className="projects">
            <div className="projects-preview-header">Projects</div>
            <hr />
            <div className="project-entries">
              {validProjects.map((project) => (
                <div className="project-entry-preview" key={project.id}>
                  <div className="project-first">
                    <div className="project-title-techstack">
                      <div className="project-title">{project.title}</div>
                      <div className="project-techstack">
                        {project.techstack}
                      </div>
                    </div>
                    <div className="project-dates">
                      <div className="project-start-date">
                        {project.startdate}
                      </div>
                      -<div className="project-end-date">{project.enddate}</div>
                    </div>
                  </div>
                  {/* Render features if they exist */}
                  {project.features.length > 0 && (
                    <ul className="project-features">
                      {project.features.map((feature) => (
                        <li key={feature.id}>{feature.description}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {validSkills.length > 0 && (
          <div className="skills">
            <div className="skills-preview-header">Skills</div>
            <hr />
            <div className="skill-entries">
              {validSkills.map((skill) => (
                <div className="skill-entry-preview" key={skill.id}>
                  <div className="skill-first">
                    <div className="category">{skill.category}:</div>
                    <div className="skillslist">{skill.skillslist}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default ResumePreview;
