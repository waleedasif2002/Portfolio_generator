// Hero section component
import React from 'react';
import { Link } from 'react-scroll';
import '../styles/Hero.css';

function Hero({ name, bio }) {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1 className="animate-fade-in">Hello, I'm {name}</h1>
        <p className="animate-fade-in delay-1">{bio}</p>
        <div className="hero-btns animate-fade-in delay-2">
          <Link 
            to="projects" 
            smooth={true} 
            duration={500} 
            className="btn btn-primary"
          >
            View My Work
          </Link>
          <Link 
            to="contact" 
            smooth={true} 
            duration={500} 
            className="btn btn-secondary"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
