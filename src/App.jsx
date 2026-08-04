

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import CategorySection from "./Components/CategorySection";
import TrendingItems from "./Components/TrendingItems";
import Newarrival from "./Components/Newarrival";
import Testimonials from "./Components/Testimonials";
import Footer from "./Components/Footer";
import About from "./pages/About";
import Cart from "./pages/Cart";
import ContactPage from "./pages/ContactPage";
import Wishlist from "./pages/Wishlist";
import Auth from "./pages/Auth";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ArticlesPage from "./pages/ArticlesPage";
import Checkout from "./pages/Checkout";
import Notifications from "./pages/Notifications";
import AccountSettings from "./pages/AccountSettings";
import WhatsAppButton from "./Components/WhatsAppButton";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./Components/ScrollToTop";
import FeatureGrid from "./Components/FeatureGrid";
import BrandSection from "./Components/BrandSection";
import Newsletter from "./Components/Newsletter";

const BASE_URL = "http://localhost:3000";

export default function App() {
  const location = useLocation();

  // Check if current route is the auth page
  const isAuthPage = location.pathname === "/auth";

  return (
    <>
      <ScrollToTop />
      {/* Hide Navbar on /auth route */}
      {!isAuthPage && <Navbar />}
      <WhatsAppButton />
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop 
        closeOnClick 
        rtl={false}
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored" 
      />

      {/* Remove top padding when Navbar is hidden so content stays aligned */}
      <div style={{ paddingTop: isAuthPage ? '0px' : '80px' }}>

        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <CategorySection />
                <BrandSection />
                <TrendingItems />
                <Testimonials />
                <Newsletter />
                <Footer />
              </>
            }
          />

          {/* ABOUT */}
          <Route
            path="/about"
            element={
              <>
                <About />
                <Footer />
              </>
            }
          />

          {/* CONTACT */}
          <Route
            path="/contact"
            element={
              <>
                <ContactPage />
                <Footer />
              </>
            }
          />

          {/* WISHLIST */}
          <Route
            path="/heart"
            element={
              <>
                <Wishlist />
                <Footer />
              </>
            }
          />

          {/* CART */}
          <Route
            path="/cart"
            element={
              <>
                <Cart />
                <Footer />
              </>
            }
          />

          {/* LOGIN / AUTH */}
          <Route path="/auth" element={<Auth />} />

          {/* SHOP ROUTES */}
          <Route path="/category/:categoryName" element={<><CategoryPage /><Footer /></>} />
          <Route path="/product/:productId" element={<><ProductDetailsPage /><Footer /></>} />
          <Route path="/articles" element={<><ArticlesPage /><Footer /></>} />
          <Route path="/checkout" element={<><Checkout /><Footer /></>} />
          <Route path="/notifications" element={<><Notifications /><Footer /></>} />
          <Route path="/account" element={<><AccountSettings /><Footer /></>} />
          
        </Routes>
      </div>
    </>
  );
}