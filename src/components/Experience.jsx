import React, { useState,useEffect } from 'react';
import "../styles/Experience.css";

const Experience = ({ updateResumeData,resumeData }) => {
  const [experienceData, setExperienceData] = useState([
    {
      id: 1,
      job: '',
      startdate: '',
      enddate: '',
      company: '',
      place: '',
      responsibilities: [{ id: 1, description: '' }]
    }
  ]);
    useEffect(() => {
      setExperienceData(resumeData);
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

  // Handle changes in experience fields
  const handleExperienceChange = (id, field, value) => {
    setExperienceData((prevData) =>
      prevData.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              [field]: value,
              ...(field === "startdate" && { formattedStartDate: formatDate(value) }),
              ...(field === "enddate" && { formattedEndDate: formatDate(value) })
            }
          : exp
      )
    );
  };

  // Handle changes in responsibility descriptions
  const handleResponsibilityChange = (expId, resId, value) => {
    setExperienceData((prevData) =>
      prevData.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              responsibilities: exp.responsibilities.map((res) =>
                res.id === resId ? { ...res, description: value } : res
              )
            }
          : exp
      )
    );
  };

  // Add a new experience entry
  const addExperience = () => {
    setExperienceData((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        job: '',
        startdate: '',
        enddate: '',
        company: '',
        place: '',
        responsibilities: [{ id: 1, description: '' }]
      }
    ]);
  };

  // Remove an experience entry
  const removeExperience = (id) => {
    setExperienceData((prevData) => prevData.filter((exp) => exp.id !== id));
  };

  // Add a new responsibility to a job
  const addResponsibility = (expId) => {
    setExperienceData((prevData) =>
      prevData.map((exp) =>
        exp.id === expId && exp.responsibilities.length < 3
          ? {
              ...exp,
              responsibilities: [
                ...exp.responsibilities,
                { id: exp.responsibilities.length + 1, description: '' }
              ]
            }
          : exp
      )
    );
  };

//   if (resumeData !== experienceData) {
//     setExperienceData(resumeData);
//   }
  

  // Remove a responsibility from a job
  const removeResponsibility = (expId, resId) => {
    setExperienceData((prevData) =>
      prevData.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              responsibilities: exp.responsibilities.filter(
                (res) => res.id !== resId
              )
            }
          : exp
      )
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateResumeData('experience', experienceData);
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
    <div className="experience-section">
      <h3 onClick={() => setIsCollapsed(!isCollapsed)} className="experience-header">
        Experience {isCollapsed ? '▼' : '▲'}
      </h3>
        <form onSubmit={handleSubmit} className={`experience-form ${isCollapsed ? 'collapsed' : 'expanded'}`}>
          {experienceData.map((exp) => (
            <div key={exp.id} className="experience-entry">
                <div>
                    Job:
                    <input
                        type="text"
                        name="job"
                        value={exp.job}
                        onChange={(e) => handleExperienceChange(exp.id, 'job', e.target.value)}
                        placeholder="Job Title"
                        disabled={isDisabled}
                    />
                </div>
                <div>
                    Company:
                    <input
                        type="text"
                        name="company"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                        placeholder="Company"
                        disabled={isDisabled}
                    />
                </div>
                <div>
                    Place:
                    <input
                        type="text"
                        name="place"
                        value={exp.place}
                        onChange={(e) => handleExperienceChange(exp.id, 'place', e.target.value)}
                        placeholder="Location"
                        disabled={isDisabled}
                    />
                </div>
                <div>
                    From:
                    <input
                        type="date"
                        name="startdate"
                        value={exp.startdate}
                        onChange={(e) => handleExperienceChange(exp.id, 'startdate', e.target.value)}
                        disabled={isDisabled}
                    />
                </div>
                <div>
                    To:
                    <input
                        type="date"
                        name="enddate"
                        value={exp.enddate}
                        onChange={(e) => handleExperienceChange(exp.id, 'enddate', e.target.value)}
                        disabled={isDisabled}
                    />
                </div>
                <div className='experience-responsibilities'>
                    <h1>Responsibilities:</h1>
                    {exp.responsibilities.map((res) => (
                        <div key={res.id} className="experience-responsibility-entry">
                        <textarea
                            type="text"
                            value={res.description}
                            onChange={(e) =>
                            handleResponsibilityChange(exp.id, res.id, e.target.value)
                            }
                            placeholder="Responsibility"
                            disabled={isDisabled}
                        />
                        <button
                            type="button"
                            onClick={() => removeResponsibility(exp.id, res.id)}
                            disabled={isDisabled}
                            className='delete-experience-resonsibility'
                        >
                            Delete
                        </button>
                        </div>
                    ))}
                    <button className='add-experience-responsibility' type="button" onClick={() => addResponsibility(exp.id)} disabled={isDisabled || exp.responsibilities.length >= 3}>
                        Add Responsibility
                    </button>
                </div>
              <button type="button" id="delete-experience" onClick={() => removeExperience(exp.id)} disabled={isDisabled}>
                Delete Experience
              </button>
            </div>
          ))}

          <div className="experience-buttons">
            <button type="button" onClick={addExperience} disabled={isDisabled || experienceData.length >= 3}>
                Add Experience
            </button>
            <button type="submit" disabled={isDisabled}>Submit</button>
            <button type="button" onClick={handleEdit}>Edit</button>
          </div>
        </form>
    </div>
  );
};

export default Experience;
