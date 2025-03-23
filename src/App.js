import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DataEntryForm from './components/DataEntryForm';
import './App.css';

function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Effect to apply dark mode theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // If data hasn't been submitted yet, show the data entry form
  if (!portfolioData) {
    return <DataEntryForm setPortfolioData={setPortfolioData} />;
  }

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <Hero name={portfolioData.name} bio={portfolioData.shortBio} />
          <About 
            profilePicture={portfolioData.profilePicture} 
            skills={portfolioData.skills} 
            interests={portfolioData.interests} 
            description={portfolioData.aboutMe} 
          />
          <Projects initialProjects={portfolioData.projects} />
          <Contact />
        </main>
        <Footer socialLinks={portfolioData.socialLinks} />
      </div>
    </Router>
  );
}

export default App;
