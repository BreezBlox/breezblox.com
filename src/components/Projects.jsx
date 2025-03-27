import '../styles/Projects.css';

const Projects = () => {
  // Mock data for projects - would be replaced with real data
  const projects = [
    {
      id: 1,
      title: 'Personal Portfolio',
      description: 'This website - a React-based portfolio showcasing my work across different mediums.',
      technologies: ['React', 'CSS', 'JavaScript', 'Vite'],
      demoLink: 'https://breezblox.com',
      githubLink: 'https://github.com/BreezBlox/breezblox.com',
      image: '/placeholder.jpg',
      featured: true
    },
    {
      id: 2,
      title: 'Digital Art Gallery',
      description: 'An interactive gallery for showcasing digital artwork with category filtering.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      demoLink: '#',
      githubLink: 'https://github.com/BreezBlox/art-gallery',
      image: '/placeholder.jpg',
      featured: false
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A simple weather application using a weather API to display current conditions.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
      demoLink: '#',
      githubLink: 'https://github.com/BreezBlox/weather-app',
      image: '/placeholder.jpg',
      featured: false
    }
  ];

  return (
    <div className="projects-container">
      <h1 className="section-title">Web Projects</h1>
      <p className="projects-intro">
        A showcase of my web development projects. These represent my journey learning to code
        and bringing my design skills to life through interactive experiences.
      </p>
      
      <div className="featured-project">
        {projects.filter(project => project.featured).map(project => (
          <div className="featured-project-card" key={project.id}>
            <div className="featured-project-content">
              <div className="featured-label">Featured Project</div>
              <h2 className="featured-project-title">{project.title}</h2>
              <div className="featured-project-description">
                <p>{project.description}</p>
              </div>
              <div className="tech-stack">
                {project.technologies.map((tech, index) => (
                  <span className="tech-tag" key={index}>{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  Live Demo
                </a>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  View Code
                </a>
              </div>
            </div>
            <div className="featured-project-image">
              <div className="image-placeholder"></div>
            </div>
          </div>
        ))}
      </div>
      
      <h2 className="other-projects-title">Other Projects</h2>
      <div className="projects-grid">
        {projects.filter(project => !project.featured).map(project => (
          <div className="project-card" key={project.id}>
            <div className="project-card-inner">
              <div className="project-image">
                <div className="image-placeholder"></div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="tech-stack">
                  {project.technologies.map((tech, index) => (
                    <span className="tech-tag" key={index}>{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    Live Demo
                  </a>
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    View Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 