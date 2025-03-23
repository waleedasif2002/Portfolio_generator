// Data Entry Page
import React, { useState, useRef } from 'react';
import '../styles/DataEntryForm.css';

function DataEntryForm({ setPortfolioData }) {
  const [formData, setFormData] = useState({
    name: '',
    shortBio: '',
    profilePicture: '',
    profilePictureFile: null,
    skills: '',
    interests: '',
    aboutMe: '',
    projects: [
      { title: '', description: '', image: '', imageFile: null, githubLink: '' },
      { title: '', description: '', image: '', imageFile: null, githubLink: '' },
      { title: '', description: '', image: '', imageFile: null, githubLink: '' }
    ],
    socialLinks: [
      { name: 'GitHub', url: '' },
      { name: 'LinkedIn', url: '' }
    ]
  });
  
  // Refs for file inputs
  const profilePictureInput = useRef(null);


  // Handle form input changes
  const handleChange = (e, index, field) => {
    const { name, value } = e.target;
    
    if (field === 'projects') {
      const updatedProjects = [...formData.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [name]: value
      };
      setFormData({
        ...formData,
        projects: updatedProjects
      });
    } else if (field === 'socialLinks') {
      const updatedSocialLinks = [...formData.socialLinks];
      updatedSocialLinks[index] = {
        ...updatedSocialLinks[index],
        [name]: value
      };
      setFormData({
        ...formData,
        socialLinks: updatedSocialLinks
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle file uploads
  const handleFileUpload = (e, index, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileDataUrl = event.target.result;
      
      if (field === 'profilePicture') {
        const imageUrl = URL.createObjectURL(file);
        setFormData({
          ...formData,
          profilePicture: imageUrl,
          profilePictureFile: fileDataUrl
        });
      } 
    };
    reader.readAsDataURL(file);
  };

  // Toggle between URL and file upload
  const handleImageSourceChange = (e, index, field) => {
    const useFile = e.target.value === 'file';
    
    if (field === 'profilePicture') {
      if (useFile) {
        profilePictureInput.current.click();
      } else {
        setFormData({
          ...formData,
          profilePictureFile: null
        });
      }
    } 
  };

  // Add new social media link
  const addSocialMedia = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, { name: '', url: '' }]
    });
  };

  // Add new project
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: '', description: '', image: '', imageFile: null, githubLink: '' }]
    });
  };

  // Remove project
  const removeProject = (index) => {
    if (formData.projects.length <= 1) return;
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      projects: updatedProjects
    });
  };

  // Remove social link
  const removeSocialLink = (index) => {
    if (formData.socialLinks.length <= 1) return;
    const updatedSocialLinks = formData.socialLinks.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      socialLinks: updatedSocialLinks
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process skills and interests as arrays
    const processedData = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      interests: formData.interests.split(',').map(interest => interest.trim())
    };
    
    setPortfolioData(processedData);
  };

  return (
    <div className="data-entry-container">
      <h1>Create Your Portfolio</h1>
      <form onSubmit={handleSubmit} className="data-entry-form">
        <section className="form-section">
          <h2>Personal Information</h2>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
              required
              placeholder="John Doe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="shortBio">Short Bio</label>
            <input
              type="text"
              id="shortBio"
              name="shortBio"
              value={formData.shortBio}
              onChange={(e) => handleChange(e)}
              required
              placeholder="e.g., Full Stack Developer | AI Enthusiast"
            />
          </div>
        </section>

        <section className="form-section">
          <h2>About Me</h2>
          <div className="form-group">
            <label>Profile Picture</label>
            <div className="image-upload-container">
              <div className="upload-options">
                <label>
                  <input
                    type="radio"
                    name="profilePictureSource"
                    value="url"
                    defaultChecked
                    onChange={(e) => handleImageSourceChange(e, null, 'profilePicture')}
                  />
                  URL
                </label>
                <label>
                  <input
                    type="radio"
                    name="profilePictureSource"
                    value="file"
                    onChange={(e) => handleImageSourceChange(e, null, 'profilePicture')}
                  />
                  Upload File
                </label>
              </div>
              
              {formData.profilePictureFile ? (
                <div className="image-preview">
                  <img src={formData.profilePictureFile} alt="Profile Preview" />
                </div>
              ) : (
                <input
                  type="text"
                  name="profilePicture"
                  value={formData.profilePicture}
                  onChange={(e) => handleChange(e)}
                  placeholder="https://example.com/your-image.jpg"
                />
              )}
              
              <input
                type="file"
                ref={profilePictureInput}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={(e) => handleFileUpload(e, null, 'profilePicture')}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="skills">Skills (comma-separated)</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={(e) => handleChange(e)}
              required
              placeholder="React, JavaScript, CSS, Node.js"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="interests">Interests (comma-separated)</label>
            <input
              type="text"
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={(e) => handleChange(e)}
              required
              placeholder="Web Development, Machine Learning, UI/UX Design"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="aboutMe">About Me (Detailed Description)</label>
            <textarea
              id="aboutMe"
              name="aboutMe"
              value={formData.aboutMe}
              onChange={(e) => handleChange(e)}
              required
              rows="5"
              placeholder="Describe yourself, your background, experience, and what makes you unique."
            ></textarea>
          </div>
        </section>

        <section className="form-section">
          <h2>Projects</h2>
          <div className="projects-container">
            {formData.projects.map((project, index) => (
              <div key={index} className="project-entry">
                <div className="project-header">
                  <h3>Project {index + 1}</h3>
                  <button 
                    type="button" 
                    className="remove-btn"
                    onClick={() => removeProject(index)}
                  >
                    Remove
                  </button>
                </div>
                
                <div className="form-group">
                  <label htmlFor={`project-title-${index}`}>Title</label>
                  <input
                    type="text"
                    id={`project-title-${index}`}
                    name="title"
                    value={project.title}
                    onChange={(e) => handleChange(e, index, 'projects')}
                    required
                    placeholder="Project Name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor={`project-desc-${index}`}>Description</label>
                  <textarea
                    id={`project-desc-${index}`}
                    name="description"
                    value={project.description}
                    onChange={(e) => handleChange(e, index, 'projects')}
                    required
                    rows="3"
                    placeholder="Describe what this project does and the technologies used"
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor={`project-github-${index}`}>GitHub Link</label>
                  <input
                    type="text"
                    id={`project-github-${index}`}
                    name="githubLink"
                    value={project.githubLink}
                    onChange={(e) => handleChange(e, index, 'projects')}
                    required
                    placeholder="https://github.com/yourusername/project"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <button 
            type="button" 
            className="add-btn" 
            onClick={addProject}
          >
            Add New Project
          </button>
        </section>

        <section className="form-section">
          <h2>Social Media Links</h2>
          <div className="social-links-container">
            {formData.socialLinks.map((social, index) => (
              <div key={index} className="social-entry">
                <div className="social-header">
                  <h3>Platform {index + 1}</h3>
                  <button 
                    type="button" 
                    className="remove-btn"
                    onClick={() => removeSocialLink(index)}
                  >
                    Remove
                  </button>
                </div>
                
                <div className="form-group">
                  <label htmlFor={`social-name-${index}`}>Platform Name</label>
                  <input
                    type="text"
                    id={`social-name-${index}`}
                    name="name"
                    value={social.name}
                    onChange={(e) => handleChange(e, index, 'socialLinks')}
                    required
                    placeholder="GitHub, LinkedIn, Twitter, etc."
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor={`social-url-${index}`}>URL</label>
                  <input
                    type="text"
                    id={`social-url-${index}`}
                    name="url"
                    value={social.url}
                    onChange={(e) => handleChange(e, index, 'socialLinks')}
                    required
                    placeholder="https://platform.com/yourusername"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <button 
            type="button" 
            className="add-btn" 
            onClick={addSocialMedia}
          >
            Add Social Media
          </button>
        </section>

        <button type="submit" className="submit-btn">
          Generate Portfolio
        </button>
      </form>
    </div>
  );
}

export default DataEntryForm;