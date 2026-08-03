import React, { useState } from 'react';
import './Hero.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from '../assets/Images/slider2.png';
import img2 from '../assets/Images/slider5.png';
import img3 from '../assets/Images/slider4.png';
import slider1 from '../assets/Images/slider1.png';

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    { id: 1, img: slider1 },
    { id: 2, img: img1 },
    { id: 3, img: img2 },
    { id: 4, img: img3 },
  ];

  const nextSlide = () => {
    setCurrentIndex(prev =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  // ✅ SHOP NOW CLICK HANDLER
  const handleShopNow = () => {
    const categorySection = document.getElementById('categories');
    if (categorySection) {
      categorySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-static">
      <div className="hero-background">
        <img src={slider1} alt="Hero" className="hero-bg-img" fetchPriority="high" />
      </div>

      <div className="hero-content  cont2">
        <span className="small-caps text-magenta">THE NEW STANDARD OF GLOW</span>
        <h1 className="hero-heading">
          Your Skin's <br />
          <span className="serif italic text-magenta">Primary Identity</span>
        </h1>
        <p className="hero-text">
          Rituals crafted for your most luminous self. Soft, effective, and intentionally yours. Elevate your daily routine into a celebration.
        </p>
        <button className="btn-primary" onClick={handleShopNow}>
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;