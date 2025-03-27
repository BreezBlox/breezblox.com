import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* VHS effect overlay */}
      <div className="vhs-effect"></div>
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="glitch-text" data-text="BREEZBLOX">BREEZBLOX</span>
          </h1>
          <p className="hero-subtitle">ART · DESIGN · CODE</p>
          <p className="hero-description">
            Creative developer specializing in visual arts, 3D CAD design, and web development.
          </p>
          <div className="hero-btns">
            <Link to="/about" className="btn hero-btn">About Me</Link>
            <Link to="/gallery" className="btn hero-btn">View Gallery</Link>
          </div>
        </div>
      </section>
      
      {/* Preview Sections */}
      <section className="preview-section">
        <h2 className="section-title">What I Do</h2>
        
        <div className="preview-grid">
          {/* Gallery Preview */}
          <div className="preview-card">
            <div className="preview-card-inner">
              <div className="preview-image-placeholder gallery-placeholder">
                <span className="preview-icon">🎨</span>
              </div>
              <div className="preview-content">
                <h3>Gallery</h3>
                <p>A collection of my artwork, photography, and 3D CAD designs.</p>
                <Link to="/gallery" className="preview-link">Explore Gallery</Link>
              </div>
            </div>
          </div>
          
          {/* Articles Preview */}
          <div className="preview-card">
            <div className="preview-card-inner">
              <div className="preview-image-placeholder articles-placeholder">
                <span className="preview-icon">📝</span>
              </div>
              <div className="preview-content">
                <h3>Articles</h3>
                <p>Thoughts and insights on art, design, and technology.</p>
                <Link to="/articles" className="preview-link">Read Articles</Link>
              </div>
            </div>
          </div>
          
          {/* Projects Preview */}
          <div className="preview-card">
            <div className="preview-card-inner">
              <div className="preview-image-placeholder projects-placeholder">
                <span className="preview-icon">💻</span>
              </div>
              <div className="preview-content">
                <h3>Projects</h3>
                <p>Web applications and coding projects I've been working on.</p>
                <Link to="/projects" className="preview-link">View Projects</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Section */}
      <section className="featured-section">
        <h2 className="section-title">Featured Work</h2>
        <div className="featured-item">
          <div className="featured-image-placeholder">
            <div className="featured-image-overlay">
              <h3>Latest Creation</h3>
              <Link to="/gallery" className="btn featured-btn">View Details</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 