import React, { useState,useEffect } from 'react';
import "../styles/Title.css";

const Title = ({ updateResumeData,resumeData }) => {
  const [titleData, setTitleData] = useState(
    {name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    leetcode: '',
    twitter: ''
  });
  useEffect(() => {
    setTitleData(resumeData);
  }, [resumeData]);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // Controls collapse state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTitleData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateResumeData('title', titleData);
    setIsDisabled(true);
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    if (isSubmitted) {
      setIsDisabled(false);
      setIsSubmitted(false);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

//   if (resumeData !== titleData) {
//     setTitleData(resumeData);
//   }

  return (
      <div className="title-section">
        {console.log("title.jsx",resumeData)}
      <h3 className="title-header" onClick={toggleCollapse}>
        Personal Information {isCollapsed ? '▲' : '▼'}
      </h3>

      {/* Form stays in DOM, collapse controlled by CSS */}
      <form
        onSubmit={handleSubmit}
        className={`title-form ${isCollapsed ? 'collapsed' : 'expanded'}`}
      >
        <div>
          Name:
          <input
            type="text"
            name="name"
            value={titleData.name}
            onChange={handleChange}
            placeholder="Full Name"
            disabled={isDisabled}
          />
        </div>

        <div>
          Email:
          <input
            type="email"
            name="email"
            value={titleData.email}
            onChange={handleChange}
            placeholder="Email"
            disabled={isDisabled}
          />
        </div>

        <div>
          Phone No.:
          <input
            type="tel"
            name="phone"
            value={titleData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            disabled={isDisabled}
          />
        </div>

        <div>
          Linkedin:
          <input
            type="url"
            name="linkedin"
            value={titleData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn URL"
            disabled={isDisabled}
          />
        </div>

        <div>
          Github:
          <input
            type="url"
            name="github"
            value={titleData.github}
            onChange={handleChange}
            placeholder="GitHub URL"
            disabled={isDisabled}
          />
        </div>

        <div>
          Leetcode:
          <input
            type="url"
            name="leetcode"
            value={titleData.leetcode}
            onChange={handleChange}
            placeholder="LeetCode URL"
            disabled={isDisabled}
          />
        </div>

        <div>
          Twitter:
          <input
            type="url"
            name="twitter"
            value={titleData.twitter}
            onChange={handleChange}
            placeholder="Twitter URL"
            disabled={isDisabled}
          />
        </div>

        <div className="title-buttons">
          <button type="submit" disabled={isDisabled}>
            Submit
          </button>
          <button type="button" onClick={handleEdit}>
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Title;