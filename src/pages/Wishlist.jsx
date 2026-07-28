import React from 'react';
import './Wishlist.css';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';

const Wishlist = () => {
  const { wishlistItems } = useShop();
  const navigate = useNavigate();

  const displayProducts = wishlistItems;

  return (
    <div className="wishlist-page">
      <div className="container">
        <header className="wishlist-header text-center">
          <h1 className="wishlist-title serif">Saved Products</h1>
          {displayProducts.length > 0 ? (
            <p className="wishlist-subtitle">
              A curated sanctuary for your favorite luminous essentials. Return to these Products when you are ready to glow.
            </p>
          ) : (
            <p className="wishlist-subtitle">
              Your wishlist is currently empty. Start exploring our collection to find your luminous essentials.
            </p>
          )}
        </header>
        
        {displayProducts.length > 0 ? (
          <div className="wishlist-grid grid-3">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} variant="wishlist" />
            ))}
          </div>
        ) : (
          <div className="wishlist-empty-state text-center" style={{ padding: '4rem 0' }}>
            <div className="empty-icon" style={{ fontSize: '3rem', color: '#FF4D8D', marginBottom: '1.5rem' }}>♡</div>
            <button className="btn-primary" onClick={() => navigate('/category/all')}>
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;