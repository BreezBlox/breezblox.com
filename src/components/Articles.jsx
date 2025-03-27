import { useState } from 'react';
import '../styles/Articles.css';

const Articles = () => {
  // Mock data for medium articles - would be replaced with actual Medium API integration
  const [articles] = useState([
    {
      id: 1,
      title: 'Getting Started with Creative Coding',
      excerpt: 'An introduction to creative coding and generative art using modern web technologies.',
      date: 'Jan 15, 2023',
      readTime: '8 min read',
      link: 'https://medium.com/@BreezBlox/getting-started-with-creative-coding',
      thumbnail: '/placeholder.jpg'
    },
    {
      id: 2,
      title: 'My Journey into 3D Design',
      excerpt: 'How I transitioned from traditional art to 3D CAD design and what I learned along the way.',
      date: 'Mar 28, 2023',
      readTime: '12 min read',
      link: 'https://medium.com/@BreezBlox/journey-into-3d-design',
      thumbnail: '/placeholder.jpg'
    },
    {
      id: 3,
      title: 'The Art of Urban Photography',
      excerpt: 'Techniques and approaches for capturing compelling urban scenes and street photography.',
      date: 'May 10, 2023',
      readTime: '10 min read',
      link: 'https://medium.com/@BreezBlox/art-of-urban-photography',
      thumbnail: '/placeholder.jpg'
    },
    {
      id: 4,
      title: 'Learning Web Development as a Designer',
      excerpt: 'My experience learning to code as someone with a background in visual arts and design.',
      date: 'Jul 22, 2023',
      readTime: '15 min read',
      link: 'https://medium.com/@BreezBlox/web-development-for-designers',
      thumbnail: '/placeholder.jpg'
    }
  ]);

  return (
    <div className="articles-container">
      <h1 className="section-title">Articles</h1>
      <p className="articles-intro">
        Thoughts and insights on art, design, and technology. 
        All articles are originally published on <a href="https://medium.com/@BreezBlox" target="_blank" rel="noopener noreferrer">Medium</a>.
      </p>
      
      <div className="articles-grid">
        {articles.map(article => (
          <div className="article-card" key={article.id}>
            <div className="article-thumbnail">
              <div className="thumbnail-placeholder"></div>
            </div>
            <div className="article-content">
              <div className="article-meta">
                <span className="article-date">{article.date}</span>
                <span className="article-read-time">{article.readTime}</span>
              </div>
              <h2 className="article-title">{article.title}</h2>
              <p className="article-excerpt">{article.excerpt}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="read-more-link">
                Read on Medium
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles; 