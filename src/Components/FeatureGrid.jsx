import React from 'react';
import './FeatureGrid.css';
import faceImg from '../assets/Images/slider4.png';
import skinImg from '../assets/Images/slider5.png';
import vitaminImg from '../assets/Images/slider2.png';

const FeatureGrid = () => {
  return (
    <section className="feature-grid-section container">
      <div className="feature-grid">
        <div className="feature-item large pink-bg">
          <div className="feature-content">
            <h3>Face-Care</h3>
            <p>Elevate your skincare routine with our premium face care products.</p>
            <button className="btn-link">Explore More</button>
          </div>
          <img src={faceImg} alt="Face Care" className="feature-img" />
        </div>
        
        <div className="feature-column">
          <div className="feature-item small glass">
            <div className="feature-content">
              <h3>Skin-Care</h3>
              <p>Natural ingredients for glowing skin.</p>
            </div>
            <img src={skinImg} alt="Skin Care" className="feature-img" />
          </div>
          
          <div className="feature-item small secondary-bg">
            <div className="feature-content">
              <h3>Vitamins</h3>
              <p>Essential nutrients for your skin's health.</p>
            </div>
            <img src={vitaminImg} alt="Vitamins" className="feature-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
