import React from "react";
import { Link } from "react-router-dom";
import "./TrendingItems.css";
import ProductCard from "./ProductCard";

const TrendingItems = () => {
  // Hardcoding the "Luminous Collection" products to match the screenshot 100% 
  // and avoid API discrepancies during this visual tuning phase.
  const trendingProducts = [
    {
      id: "luminous-1",
      name: 'Radiance Dew Serum',
      category: 'Skincare',
      price: '999.00',
      benefits: 'Hyaluronic & Rose Essence',
      isBestSeller: true,
      img: 'https://images.pexels.com/photos/8128062/pexels-photo-8128062.jpeg'
    },
    {
      id: "luminous-2",
      name: 'Silk Recovery Cream',
      category: 'Skincare',
      price: '999.00',
      benefits: 'Ceramides & Peptides',
      isNew: true,
      img: 'https://images.pexels.com/photos/8459356/pexels-photo-8459356.jpeg'
    },
    {
      id: "luminous-3",
      name: 'Cloud Cleanser',
      category: 'Skincare',
      price: '999.00',
      benefits: 'Gentle Amino Acids',
      img: 'https://images.pexels.com/photos/8140916/pexels-photo-8140916.jpeg'
    },
    {
      id: "luminous-4",
      name: 'Midnight Elixir',
      category: 'Skincare',
      price: '999.00',
      benefits: 'Bakuchiol & Squalane',
      isEditorsPick: true,
      img: 'https://images.pexels.com/photos/8128065/pexels-photo-8128065.jpeg'
    }
  ];

  return (
    <section className="trending-container container">
      <div className="section-header">
        <div className="header-left">
          <h2 className="section-title">The Luminous Collection</h2>
          <p className="section-subtitle">Essential steps for your daily glow ritual.</p>
        </div>
        <Link to="/category/all" className="view-all">View All Products</Link>
      </div>
      <div className="grid-4">
        {trendingProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default TrendingItems;
