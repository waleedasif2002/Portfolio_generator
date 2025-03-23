import React, { useState, useEffect } from 'react';
import '../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulating form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Message sent successfully!'
    });
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    
    
  };

  // Display success message for 3 seconds
  useEffect(() => {
    if (formStatus.submitted && formStatus.success) {
      const timer = setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  return (
    <section id="contact" className="contact">
      <div className="section-header">
        <h2>Get In Touch</h2>
        <div className="underline"></div>
      </div>
      
      <div className="contact-container">
        <div className="contact-info">
          <h3>Let's Connect</h3>
          <p>I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.</p>
        </div>
        
        <div className="contact-form">
          {formStatus.submitted && (
            <div className={`form-message ${formStatus.success ? 'success' : 'error'}`}>
              {formStatus.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
