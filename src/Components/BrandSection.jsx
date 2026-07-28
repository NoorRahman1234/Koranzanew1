import React from 'react';
import './BrandSection.css';
import aboutImg from '../assets/Images/About.png';

const BrandSection = () => {
  return (
    <section className="brand-section">
      <div className="container">
        <div className="brand-grid">
          <div className="brand-image-area">
            <div className="brand-image-wrapper">
              <img src={aboutImg} alt="Korenza Brand" className="brand-img" />
            </div>
            <div className="quote-box">
              "Self-care is the ultimate act of reclaiming your identity."
            </div>
          </div>
          
          <div className="brand-content">
            <span className="small-caps text-magenta">THE ESSENCE</span>
            <h2 className="brand-heading serif">Defined by Glow, <br /> Refined by Ritual.</h2>
            <p className="brand-text">
              Korenza was born from the belief that skincare is more than a routine—it's a dialogue with your true self. We curate ingredients that honor your biology and soothe your spirit.
            </p>
            <button className="btn-primary">Our Philosophy</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
