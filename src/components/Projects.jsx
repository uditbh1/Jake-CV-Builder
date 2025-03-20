import React, { useState,useEffect } from 'react';
import "../styles/Projects.css";

const Projects = ({ updateResumeData,resumeData }) => {
  const [projectsData, setProjectsData] = useState([
    {
      id: 1,
      title: '',
      techstack: '',
      startdate: '',
      enddate: '',
      features: [{ id: 1, description: '' }]
    }
  ]);
  useEffect(() => {
        setProjectsData(resumeData);
      }, [resumeData]);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // Collapse/Expand state

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();

    return (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear())
      ? "Present"
      : new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
  };

  // Handle changes in project fields
  const handleProjectChange = (id, field, value) => {
    setProjectsData((prevData) =>
      prevData.map((proj) =>
        proj.id === id
          ? {
              ...proj,
              [field]: value,
              ...(field === "startdate" && { formattedStartDate: formatDate(value) }),
              ...(field === "enddate" && { formattedEndDate: formatDate(value) })
            }
          : proj
      )
    );
  };

  // Handle changes in feature descriptions
  const handleFeatureChange = (projId, featId, value) => {
    setProjectsData((prevData) =>
      prevData.map((proj) =>
        proj.id === projId
          ? {
              ...proj,
              features: proj.features.map((feat) =>
                feat.id === featId ? { ...feat, description: value } : feat
              )
            }
          : proj
      )
    );
  };

  // Add a new project entry
  const addProject = () => {
    if (projectsData.length < 3) {
      setProjectsData((prevData) => [
        ...prevData,
        {
          id: prevData.length + 1,
          title: '',
          techstack: '',
          startdate: '',
          enddate: '',
          features: [{ id: 1, description: '' }]
        }
      ]);
    }
  };

  // Remove a project entry
  const removeProject = (id) => {
    setProjectsData((prevData) => prevData.filter((proj) => proj.id !== id));
  };

  // Add a new feature to a project
  const addFeature = (projId) => {
    setProjectsData((prevData) =>
      prevData.map((proj) =>
        proj.id === projId && proj.features.length < 3
          ? {
              ...proj,
              features: [
                ...proj.features,
                { id: proj.features.length + 1, description: '' }
              ]
            }
          : proj
      )
    );
  };

  // Remove a feature from a project
  const removeFeature = (projId, featId) => {
    setProjectsData((prevData) =>
      prevData.map((proj) =>
        proj.id === projId
          ? {
              ...proj,
              features: proj.features.filter((feat) => feat.id !== featId)
            }
          : proj
      )
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateResumeData('projects', projectsData);
    setIsDisabled(true);
    setIsSubmitted(true);
  };

  // Enable editing
  const handleEdit = () => {
    if (isSubmitted) {
      setIsDisabled(false);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="projects-section">
      <h3 onClick={() => setIsCollapsed(!isCollapsed)} className="projects-header">
        Projects {isCollapsed ? '▼' : '▲'}
      </h3>
      <form onSubmit={handleSubmit} className={`projects-form ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        {projectsData.map((proj) => (
          <div key={proj.id} className="project-entry">
            <div>
              Title:
              <input
                type="text"
                name="title"
                value={proj.title}
                onChange={(e) => handleProjectChange(proj.id, 'title', e.target.value)}
                placeholder="Project Title"
                disabled={isDisabled}
              />
            </div>
            <div>
              Tech Stack:
              <input
                type="text"
                name="techstack"
                value={proj.techstack}
                onChange={(e) => handleProjectChange(proj.id, 'techstack', e.target.value)}
                placeholder="Tech Stack (e.g., React, Node.js)"
                disabled={isDisabled}
              />
            </div>
            <div>
              From:
              <input
                type="date"
                name="startdate"
                value={proj.startdate}
                onChange={(e) => handleProjectChange(proj.id, 'startdate', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div>
              To:
              <input
                type="date"
                name="enddate"
                value={proj.enddate}
                onChange={(e) => handleProjectChange(proj.id, 'enddate', e.target.value)}
                disabled={isDisabled}
              />
            </div>
            <div className="project-features">
              <h1>Features:</h1>
              {proj.features.map((feat) => (
                <div key={feat.id} className="feature-entry">
                  <textarea
                    type="text"
                    value={feat.description}
                    onChange={(e) =>
                      handleFeatureChange(proj.id, feat.id, e.target.value)
                    }
                    placeholder="Feature"
                    disabled={isDisabled}
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(proj.id, feat.id)}
                    disabled={isDisabled}
                    className="delete-feature"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button className="add-feature" type="button" onClick={() => addFeature(proj.id)} disabled={isDisabled || proj.features.length >= 3}>
                Add Feature
              </button>
            </div>
            <button type="button" id="delete-project" onClick={() => removeProject(proj.id)} disabled={isDisabled}>
              Delete Project
            </button>
          </div>
        ))}

        <div className="projects-buttons">
          <button type="button" onClick={addProject} disabled={isDisabled || projectsData.length >= 3}>
            Add Project
          </button>
          <button type="submit" disabled={isDisabled}>Submit</button>
          <button type="button" onClick={handleEdit}>Edit</button>
        </div>
      </form>
    </div>
  );
};

export default Projects;
