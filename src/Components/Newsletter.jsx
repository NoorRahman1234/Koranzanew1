import React from 'react';
import './Newsletter.css';

const Newsletter = () => {
  return (
    <section className="newsletter-section container">
      <div className="newsletter-box">
        <h2 className="newsletter-title serif">Join Korenza</h2>
        <p className="newsletter-subtitle">Experience the glow ritual. Be the first to receive exclusive offers, skincare tips, and more.</p>
        
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Email Address" className="newsletter-input" required />
          <button type="submit" className="btn-primary newsletter-btn">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
