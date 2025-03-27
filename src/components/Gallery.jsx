import { useState } from 'react';
import '../styles/Gallery.css';

const Gallery = () => {
  // Mock data for gallery items - would be replaced with real data
  const [items] = useState([
    {
      id: 1,
      title: 'Abstract Composition',
      category: 'art',
      thumbnail: '/placeholder.jpg',
      description: 'Digital abstract composition exploring color and form.'
    },
    {
      id: 2,
      title: 'Urban Photography',
      category: 'photography',
      thumbnail: '/placeholder.jpg',
      description: 'Street photography capturing urban life and architecture.'
    },
    {
      id: 3,
      title: '3D Engine Model',
      category: '3d',
      thumbnail: '/placeholder.jpg',
      description: 'Detailed 3D CAD model of an engine component.'
    },
    {
      id: 4,
      title: 'Neon Cityscape',
      category: 'art',
      thumbnail: '/placeholder.jpg',
      description: 'Digital painting of a futuristic neon cityscape.'
    },
    {
      id: 5,
      title: 'Nature Close-up',
      category: 'photography',
      thumbnail: '/placeholder.jpg',
      description: 'Macro photography of natural elements.'
    },
    {
      id: 6,
      title: '3D Character Design',
      category: '3d',
      thumbnail: '/placeholder.jpg',
      description: 'Character concept designed and modeled in 3D software.'
    },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <div className="gallery-container">
      <h1 className="section-title">My Gallery</h1>
      
      <div className="gallery-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
          onClick={() => setFilter('all')}
        >
          All Works
        </button>
        <button 
          className={`filter-btn ${filter === 'art' ? 'active' : ''}`} 
          onClick={() => setFilter('art')}
        >
          Digital Art
        </button>
        <button 
          className={`filter-btn ${filter === 'photography' ? 'active' : ''}`} 
          onClick={() => setFilter('photography')}
        >
          Photography
        </button>
        <button 
          className={`filter-btn ${filter === '3d' ? 'active' : ''}`} 
          onClick={() => setFilter('3d')}
        >
          3D CAD Design
        </button>
      </div>
      
      <div className="gallery-grid">
        {filteredItems.map(item => (
          <div className="gallery-item" key={item.id}>
            <div className="gallery-item-inner">
              <div className="gallery-item-image">
                <div className="image-placeholder">
                  <span>{item.category}</span>
                </div>
              </div>
              <div className="gallery-item-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery; 