import React, { useState,useEffect } from 'react';
import "../styles/Skills.css";

const Skills = ({ updateResumeData,resumeData }) => {
  const [skillsData, setSkillsData] = useState([
    { id: 1, category: '', skillslist: '' }
  ]);
  useEffect(() => {
        setSkillsData(resumeData);
      }, [resumeData]);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // Collapse/Expand state

  // Handle changes in skill fields
  const handleSkillChange = (id, field, value) => {
    setSkillsData((prevData) =>
      prevData.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  // Add a new skill category
  const addSkillCategory = () => {
    if (skillsData.length < 5) {
      setSkillsData((prevData) => [
        ...prevData,
        { id: prevData.length + 1, category: '', skillslist: '' }
      ]);
    }
  };

  // Remove a skill category
  const removeSkillCategory = (id) => {
    setSkillsData((prevData) => prevData.filter((skill) => skill.id !== id));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateResumeData('skills', skillsData);
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
    <div className="skills-section">
      <h3 onClick={() => setIsCollapsed(!isCollapsed)} className="skills-header">
        Skills {isCollapsed ? '▼' : '▲'}
      </h3>
      <form onSubmit={handleSubmit} className={`skills-form ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        {skillsData.map((skill) => (
          <div key={skill.id} className="skill-entry">
            <div>
              Category:
              <input
                type="text"
                name="category"
                value={skill.category}
                onChange={(e) => handleSkillChange(skill.id, 'category', e.target.value)}
                placeholder="Skill Category (e.g., Programming, Tools)"
                disabled={isDisabled}
              />
            </div>
            <div>
              Skills List:
              <input
                type="text"
                name="skillslist"
                value={skill.skillslist}
                onChange={(e) => handleSkillChange(skill.id, 'skillslist', e.target.value)}
                placeholder="Enter skills (comma-separated)"
                disabled={isDisabled}
              />
            </div>
            <button type="button" className="delete-skill-category" onClick={() => removeSkillCategory(skill.id)} disabled={isDisabled}>
              Delete Category
            </button>
          </div>
        ))}

        <div className="skills-buttons">
          <button type="button" onClick={addSkillCategory} disabled={isDisabled || skillsData.length >= 5}>
            Add Category
          </button>
          <button type="submit" disabled={isDisabled}>Submit</button>
          <button type="button" onClick={handleEdit}>Edit</button>
        </div>
      </form>
    </div>
  );
};

export default Skills;
