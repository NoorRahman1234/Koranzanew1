import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useShop } from "../context/ShopContext";
import ProductCard from "./ProductCard";
import "./TrendingItems.css";
import "./Newarrival.css";
import PriceWithDiscount from "./PriceWithDiscount";

const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) {
    return <p className="no-products">No products available</p>;
  }

  return (
    <div className="shop-products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant="shop" />
      ))}
    </div>
  );
};

const Newarrival = () => {
  const { products, productsLoading } = useShop();

  // Target IDs for "All Products" section as per the original design
  const targetIds = [8, 10, 21, 26];
  const topBeautyProducts = products.filter(p => targetIds.includes(p.id));

  if (productsLoading) {
    return (
      <section className="trending-container">
        <p className="loading">Loading products...</p>
      </section>
    );
  }

  return (
    <section className="trending-container">
      <h2 className="section-title second heading-line">All Products</h2>
      <ProductGrid products={topBeautyProducts} />
    </section>
  );
};

export default Newarrival;
