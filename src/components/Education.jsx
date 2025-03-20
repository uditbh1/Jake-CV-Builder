import React, { useState,useEffect } from 'react';
import "../styles/Education.css";

const Education = ({ updateResumeData,resumeData }) => {
  const [educationData, setEducationData] = useState([
    { id:1, institution: '', startdate: '', enddate: '', place: '', degree: '', score: '' }
  ]);
  useEffect(() => {
        setEducationData(resumeData);
      }, [resumeData]);
  

  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // Manages collapse state

  const handleChange = (id, field, value) => {
    setEducationData((prevData) =>
      prevData.map((edu) =>
        edu.id === id
          ? {
              ...edu,
              [field]: value,
              ...(field === "startdate" && { formattedStartDate: formatDate(value) }),
              ...(field === "enddate" && { formattedEndDate: formatDate(value) })
            }
          : edu
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateResumeData('education', educationData);
    setIsDisabled(true);
    setIsSubmitted(true);
    console.log(educationData)
  };

  const handleEdit = () => {
    if (isSubmitted) {
      setIsDisabled(false);
      setIsSubmitted(false);
    }
  };

  const addEducation = () => {
    setEducationData((prevData) => [
      ...prevData,
      { id: prevData.length + 1, institution: '', startdate: '', enddate: '', place: '', degree: '', score: '' }
    ]);
  };

  const removeEducation = (id) => {
    setEducationData((prevData) => {
      const newData = prevData.filter((edu) => edu.id !== id);
      return newData;
    });
  };
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();

    // Check if it's the current month and year
    if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
      return "Present";
    }

    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
  };

  return (
    <div className="education-section">
      <h3 onClick={() => setIsCollapsed(!isCollapsed)} className="education-header">
        Education {isCollapsed ? '▼' : '▲'}
      </h3>

        <form onSubmit={handleSubmit} className={`education-form ${isCollapsed ? 'collapsed' : 'expanded'}`}>
          {educationData.map((edu) => (
            <div key={edu.id} className="education-entry">
                <div>
                    Institution:
                    <input
                        type="text"
                        name="institution"
                        value={edu.institution}
                        onChange={(e) => handleChange(edu.id, 'institution', e.target.value)}
                        placeholder="Institution"
                        disabled={isDisabled}
                    />
                </div>
                <div>
                    Degree:
                    <input
                        type="text"
                        name="degree"
                        value={edu.degree}
                        onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                        placeholder="Degree"
                        disabled={isDisabled}
                    />
                </div>
                <div>
                    Place:
                    <input
                        type="text"
                        name="place"
                        value={edu.place}
                        onChange={(e) => handleChange(edu.id, 'place', e.target.value)}
                        placeholder="Location"
                        disabled={isDisabled}
                    />
                </div>
                <div>
                    From:
                    <input
                        type="date"
                        name="startdate"
                        value={edu.startdate}
                        onChange={(e) => handleChange(edu.id, 'startdate', e.target.value)}
                        disabled={isDisabled}
                    />
                </div>
                <div>
                    To:
                    <input
                        type="date"
                        name="enddate"
                        value={edu.enddate}
                        onChange={(e) => handleChange(edu.id, 'enddate', e.target.value)}
                        disabled={isDisabled}
                    />
                </div>
                <div>
                    Grades:
                    <input
                        type="text"
                        name="score"
                        value={edu.score}
                        onChange={(e) => handleChange(edu.id, 'score', e.target.value)}
                        placeholder="Score (GPA/Percentage)"
                        disabled={isDisabled}
                    />
                </div>
              <button className='education-delete-button' type="button" onClick={() => removeEducation(edu.id)} disabled={isDisabled}>
                Delete
              </button>
            </div>
          ))}


          <div className="education-buttons">
          <button type="button" onClick={addEducation} disabled={isDisabled || educationData.length >= 3}>
            Add Education
          </button>
            <button type="submit" disabled={isDisabled}>Submit</button>
            <button type="button" onClick={handleEdit}>Edit</button>
          </div>
        </form>
    </div>
  );
};

export default Education;
