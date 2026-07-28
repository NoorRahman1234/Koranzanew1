import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo text-magenta">Korenza</Link>
            <p className="footer-desc">
              Rituals for the luminous. Premium Korean skincare designed for your skin's unique identity.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link"><Instagram size={20} /></a>
              <a href="#" className="social-link"><Facebook size={20} /></a>
              <a href="#" className="social-link"><Twitter size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/category/Face Care">Face Care</Link></li>
              <li><Link to="/category/Glow Serum">Glow Serum</Link></li>
              <li><Link to="/category/Acne Care">Acne Care</Link></li>
              <li><Link to="/category/all">All Products</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/ritual">The Ritual</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/wholesale">Wholesale</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 KORENZA. ALL RIGHTS RESERVED.</p>
          <div className="footer-contact-info">
            <span><Mail size={14} /> hello@korenza.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;