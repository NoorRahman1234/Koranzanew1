import React from 'react';
import { Star } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
  const data = [
    {
      name: "Elena R.",
      role: "VERIFIED GLOW",
      text: "My skin hasn't felt this soft since my teens. The Ritual is now the best part of my morning.",
      img: "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg",
      rating: 5
    },
    {
      name: "Sophia M.",
      role: "VERIFIED GLOW",
      text: "The Radiance Serum is magic in a bottle. It's so lightweight yet so incredibly hydrating.",
      img: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg",
      rating: 5
    },
    {
      name: "Julianne K.",
      role: "VERIFIED GLOW",
      text: "Packaging is gorgeous, but the results are what keep me coming back. Truly high-end quality.",
      img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      rating: 5
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container text-center">
        <h2 className="section-title">Loved by thousands</h2>
        <p className="section-subtitle">Trusted by over 10,000+ happy customers worldwide.</p>
        
        <div className="testimonial-grid grid-3">
          {data.map((item, index) => (
            <div className="testimonial-card" key={index}>
              <div className="rating-stars">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="var(--primary)" color="var(--primary)" />
                ))}
              </div>

              <p className="testimonial-text">"{item.text}"</p>

              <div className="testimonial-user">
                <div className="user-avatar">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="user-details">
                  <h4 className="user-name">{item.name}</h4>
                  <span className="user-role">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;