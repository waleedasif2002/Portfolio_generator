// Projects section component
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ProjectCard from './ProjectCard';
import '../styles/Projects.css';

function Projects({ initialProjects }) {
  const [projects, setProjects] = useState(initialProjects || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch projects from GitHub
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
  try {
    const response = await fetch('https://api.github.com/users/AhmadShykh/repos');

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    const data = await response.json();
    const fetchedProjects = data.slice(0, 6).map(repo => ({
      id: repo.id.toString(),
      title: repo.name,
      description: repo.description || 'No description available',
      githubLink: repo.html_url
    }));

    if (fetchedProjects.length > 0) {
      setProjects([...fetchedProjects,...projects]);
    }
  } catch (err) {
    console.error('Error fetching projects:', err);
    setError('Failed to fetch projects. Using provided data instead.');
  } finally {
    setLoading(false);
  }
    };

     fetchProjects();
     //eslint-disable-next-line
  }, [initialProjects]);

  // Handle drag end event
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setProjects(items);
  };

  return (
    <section id="projects" className="projects">
      <div className="section-header">
        <h2>My Projects</h2>
        <div className="underline"></div>
      </div>
      
      {loading && <div className="loading">Loading projects...</div>}
      
      {error && <div className="error">{error}</div>}
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="projects" direction="horizontal">
          {(provided) => (
            <div 
              className="projects-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {projects.map((project, index) => (
                <Draggable 
                  key={project.id || index}
                  draggableId={project.id?.toString() || index.toString()} 
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="project-card-wrapper"
                    >
                      <ProjectCard project={project} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}

export default Projects;
