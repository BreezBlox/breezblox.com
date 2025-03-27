import '../styles/About.css';

const About = () => {
  // Skills data for visualization
  const skills = [
    { name: 'Art & Design', level: 90 },
    { name: 'Photography', level: 85 },
    { name: '3D CAD Design', level: 80 },
    { name: 'HTML/CSS', level: 70 },
    { name: 'JavaScript', level: 60 },
    { name: 'React', level: 50 },
  ];

  return (
    <div className="about">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="section-title">About Me</h1>
          <div className="about-hero-inner">
            <div className="about-image-container">
              <div className="about-image-placeholder">
                {/* Placeholder for profile image */}
                <div className="image-placeholder-text">Profile</div>
              </div>
            </div>
            <div className="about-text">
              <p className="about-greeting">Hello, I'm <span className="highlight">BreezBlox</span></p>
              <p>
                I'm a creative professional with a passion for combining art, design, and technology. 
                My journey started in traditional art and photography, which evolved into a love for 
                digital creation and 3D CAD design.
              </p>
              <p>
                Recently, I've been exploring web development to bring my visual ideas to life through 
                interactive digital experiences. This website showcases my work across different mediums
                and documents my progress as I learn to code.
              </p>
              <p>
                When I'm not creating, you can find me exploring nature, taking photographs, or learning 
                about new technologies that can enhance my creative process.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="skills-section">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="skills-container">
          {skills.map((skill, index) => (
            <div className="skill-item" key={index}>
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{ width: `${skill.level}%` }}
                  data-level={skill.level}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="timeline-section">
        <h2 className="section-title">My Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3>2023 - Present</h3>
              <h4>Web Development Journey</h4>
              <p>
                Started learning web development to create interactive digital experiences.
                Building projects with HTML, CSS, JavaScript, and React.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3>2020 - 2023</h3>
              <h4>3D CAD Design</h4>
              <p>
                Expanded skills to include 3D CAD design for practical applications and
                digital art. Created models for various personal and collaborative projects.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3>2018 - 2020</h3>
              <h4>Digital Art & Design</h4>
              <p>
                Transitioned to digital art and design, exploring new mediums and styles.
                Started sharing work online and building a portfolio.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3>2015 - 2018</h3>
              <h4>Photography & Traditional Art</h4>
              <p>
                Began serious pursuit of art and photography. Developed foundational skills
                in composition, color theory, and visual storytelling.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="interests-section">
        <h2 className="section-title">Personal Interests</h2>
        <div className="interests-grid">
          <div className="interest-item">
            <div className="interest-icon">🎨</div>
            <h3>Art & Creativity</h3>
            <p>Exploring different artistic styles and mediums to express ideas visually.</p>
          </div>
          <div className="interest-item">
            <div className="interest-icon">📷</div>
            <h3>Photography</h3>
            <p>Capturing moments and exploring the world through a camera lens.</p>
          </div>
          <div className="interest-item">
            <div className="interest-icon">🌐</div>
            <h3>Technology</h3>
            <p>Learning about new technologies and how they can enhance creative processes.</p>
          </div>
          <div className="interest-item">
            <div className="interest-icon">🏞️</div>
            <h3>Nature</h3>
            <p>Finding inspiration in natural landscapes and the organic world.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 