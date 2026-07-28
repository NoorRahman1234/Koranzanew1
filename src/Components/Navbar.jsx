import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Search, User, Heart, ShoppingCart, Bell } from "lucide-react";
import "./Navbar.css";

import { useShop } from "../context/ShopContext";
import logo from "../assets/Images/logo.png";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, wishlistItems, categories } = useShop();
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleSearch = () => setSearchOpen(!searchOpen);

  const toggleMobileMenu = () => {
    setSearchOpen(false);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e) => {
    const isClick = e.type === "click";
    const isEnter = e.key === "Enter";

    if (isClick || isEnter) {
      if (!searchOpen && isClick) {
        setSearchOpen(true);
        return;
      }

      if (searchQuery.trim()) {
        navigate(`/category/search?q=${searchQuery}`);
        setSearchOpen(false);
        setMobileMenuOpen(false);
        setSearchQuery(""); // Clear search after navigating
      } else if (isClick && searchOpen) {
        setSearchOpen(false); // Close if clicking search icon with empty query
      }
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        const hamburger = document.querySelector('.hamburger-menu');
        if (hamburger && !hamburger.contains(event.target)) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Helper to check if a link is active
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="navbar">
      {/* Mobile backdrop */}
      <div
        className={`nav-backdrop ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className="navbar-container">
        <Link to="/" className="nav-logo">
          Korenza
        </Link>

        <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <li className={isActive("/") ? "active" : ""}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          </li>
          <li 
            className={`has-dropdown ${isActive("/category") ? "active" : ""}`}
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <Link to="/category/all" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
            {shopDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/category/all" onClick={() => setShopDropdownOpen(false)}>All Products</Link></li>
                {categories.map((cat, idx) => {
                  const name = cat.name || cat.category;
                  return (
                    <li key={cat.id || idx}>
                      <Link to={`/category/${name}`} onClick={() => setShopDropdownOpen(false)}>
                        {name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
          <li className={isActive("/contact") ? "active" : ""}>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>contact us</Link>
          </li>
          <li className={isActive("/about") ? "active" : ""}>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About us</Link>
          </li>
          <li className={isActive("/articles") ? "active" : ""}>
            <Link to="/articles" onClick={() => setMobileMenuOpen(false)}>Articles / Blog</Link>
          </li>
        </ul>

        <div className="nav-icons">
          <Link to="/cart" className="icon-link">
            <ShoppingCart size={20} strokeWidth={1.5} />
            {cartItems.length > 0 && <span className="icon-badge">{cartItems.length}</span>}
          </Link>
          <Link to="/heart" className="icon-link">
            <Heart size={20} strokeWidth={1.5} />
            {wishlistItems.length > 0 && <span className="icon-badge">{wishlistItems.length}</span>}
          </Link>
          <Link to="/notifications" className="icon-link">
            <Bell size={20} strokeWidth={1.5} />
            <span className="icon-badge-dot"></span>
          </Link>
          <Link to="/account" className="icon-link">
            <User size={20} strokeWidth={1.5} />
          </Link>

          <button
            className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
