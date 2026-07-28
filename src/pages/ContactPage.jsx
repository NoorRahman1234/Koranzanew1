import React from 'react';
import { Mail, Clock, Lock, Instagram, Pin, Share2 } from 'lucide-react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="container">
        {/* HEADER SECTION */}
        <header className="contact-header text-center">
          <span className="small-caps text-magenta">GET IN TOUCH</span>
          <h1 className="contact-main-title serif text-magenta">Let's Begin the Ritual</h1>
          <p className="contact-subtitle">
            Have questions about our luminous products or need help crafting your personal ritual?
            Our concierge team is here to guide you.
          </p>
        </header>

        <div className="contact-layout">
          {/* LEFT COLUMN: INFO */}
          <div className="contact-info-column">
            <div className="concierge-box">
              <h3 className="box-title serif text-magenta">Concierge</h3>
              
              <div className="info-item">
                <div className="info-icon">
                  <Mail size={18} color="#FF4D8D" />
                </div>
                <div className="info-text">
                  <span className="info-label small-caps">EMAIL US</span>
                  <p>hello@Korenza.com</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Clock size={18} color="#FF4D8D" />
                </div>
                <div className="info-text">
                  <span className="info-label small-caps">WORKING HOURS</span>
                  <p>
                    Mon — Fri: 9am – 6pm EST<br />
                    Sat: 10am – 4pm EST
                  </p>
                </div>
              </div>
            </div>

            <div className="follow-glow">
              <h3 className="box-title serif text-magenta">Follow the Glow</h3>
              <div className="social-pills">
                <div className="social-pill-group">
                  <div className="social-pill"><Instagram size={18} /></div>
                  <span>INSTAGRAM</span>
                </div>
                <div className="social-pill-group">
                  <div className="social-pill"><Pin size={18} /></div>
                  <span>PINTEREST</span>
                </div>
                <div className="social-pill-group">
                  <div className="social-pill"><Share2 size={18} /></div>
                  <span>SOCIAL</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FORM */}
          <div className="contact-form-column">
            <div className="contact-form-card">
              <form className="concierge-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="small-caps">FULL NAME</label>
                    <input type="text" placeholder="Aura Luminous" />
                  </div>
                  <div className="form-group">
                    <label className="small-caps">EMAIL ADDRESS</label>
                    <input type="email" placeholder="hello@example.com" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="small-caps">INQUIRY SUBJECT</label>
                  <select className="custom-select">
                    <option>Product Recommendation</option>
                    <option>Order Status</option>
                    <option>Wholesale Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="small-caps">YOUR MESSAGE</label>
                  <textarea placeholder="Tell us how we can help your skin glow..." rows="6"></textarea>
                </div>

                <div className="form-footer">
                  <div className="privacy-note">
                    <Lock size={12} /> <span>Your privacy is our priority</span>
                  </div>
                  <button type="submit" className="btn-send-message">SEND MESSAGE</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;