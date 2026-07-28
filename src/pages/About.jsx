import React from 'react';
import { Sparkles, Leaf, ShieldCheck, Quote } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="hero-overlay">
          <div className="container text-center">
            <span className="small-caps text-magenta">BORN FROM THE SOUL</span>
            <h1 className="hero-quote serif italic">
              Where skin finds its inner light and the spirit finds its rest.
            </h1>
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="about-vision container">
        <div className="vision-grid">
          <div className="vision-text">
            <h2 className="section-title serif text-magenta">A Vision for Korenza</h2>
            <p>
              Korenza was born not in a laboratory, but in the quiet moments between the dawn and the day’s first light. 
              It began as a search for something more than a routine—a desire for a ritual that honored the person beneath the skin.
            </p>
            <p>
              We believe that beauty isn’t a mask to be applied, but a radiance to be nurtured. Our founder, inspired by the resilient 
              grace of botanical life, sought to create a collection that bridged the gap between scientific efficacy and the emotional warmth.
            </p>
          </div>
          <div className="vision-image">
            <img src="https://images.pexels.com/photos/3762402/pexels-photo-3762402.jpeg" alt="Vision" />
          </div>
        </div>
      </section>

      {/* BELIEF SECTION */}
      <section className="about-belief">
        <div className="container text-center">
          <span className="small-caps text-magenta">THE LUMINOUS WAY</span>
          <h2 className="section-title serif">Rooted in Belief</h2>
          
          <div className="belief-grid grid-3">
            <div className="belief-card">
              <div className="belief-icon"><Sparkles size={20} /></div>
              <h3>Radiance from Within</h3>
              <p>True luminosity transcends the surface. We formulate to support your skin’s natural vitality, letting your inner light shine through naturally.</p>
            </div>
            <div className="belief-card">
              <div className="belief-icon"><Leaf size={20} /></div>
              <h3>The Power of Korenza</h3>
              <p>Skincare is a sacred conversation with oneself. Our textures and scents are designed to turn minutes into moments of mindfulness.</p>
            </div>
            <div className="belief-card">
              <div className="belief-icon"><ShieldCheck size={20} /></div>
              <h3>Kindness to Skin</h3>
              <p>We prioritize barrier health and gentle potency. No harsh actives, only supportive botanicals that respect your skin’s delicate balance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GIFTS SECTION */}
      <section className="about-gifts container">
        <div className="gifts-grid">
          <div className="gifts-text">
            <h2 className="section-title serif">Gifts from the Earth, Crafted for You.</h2>
            <div className="ingredient-list">
              <div className="ingredient-item">
                <span className="dot"></span>
                <div>
                  <h4>ROSEHIP REGENERATION</h4>
                  <p>Cold-pressed and rich in essential fatty acids to repair and brighten.</p>
                </div>
              </div>
              <div className="ingredient-item">
                <span className="dot"></span>
                <div>
                  <h4>BOTANICAL PEONY</h4>
                  <p>Soothing extracts that calm inflammation and restore youthful elasticity.</p>
                </div>
              </div>
              <div className="ingredient-item">
                <span className="dot"></span>
                <div>
                  <h4>LUMINOUS ALOE</h4>
                  <p>Sustainably sourced marine extracts for deep, long-lasting hydration.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="gifts-gallery">
            <div className="gallery-main">
              <img src="https://images.pexels.com/photos/8140916/pexels-photo-8140916.jpeg" alt="Ingredient 1" />
            </div>
            <div className="gallery-side">
              <img src="https://images.pexels.com/photos/8128065/pexels-photo-8128065.jpeg" alt="Ingredient 2" className="side-top" />
              <img src="https://images.pexels.com/photos/8459356/pexels-photo-8459356.jpeg" alt="Ingredient 3" className="side-bottom" />
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="about-quote">
        <div className="container text-center">
          <div className="quote-icon"><Quote size={30} fill="#FF4D8D" color="#FF4D8D" /></div>
          <p className="founder-quote">
            “My hope is that when you use Korenza, you don’t just see a difference in your skin—you 
            feel a difference in your day. You are your own primary identity, and you deserve to glow from the inside out.”
          </p>
          <div className="founder-info">
            <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" alt="Founder" />
            <div>
              <strong>Khan</strong>
              <span>Founder, Korenza</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;