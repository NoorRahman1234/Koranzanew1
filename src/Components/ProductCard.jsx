import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Star, Heart, ShoppingCart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import './ProductCard.css';
import defaultHoverImg from '../assets/Images/face/Detail.png';

const ProductCard = ({ product, variant = 'standard' }) => {
  const { addToCart, addToWishlist, isInWishlist } = useShop();

  const parseNum = (val) => Number(String(val || 0).replace(/[^0-9.]/g, ''));
  const currentPrice = parseNum(product.price);
  const originalPrice = product.originalPrice ? parseNum(product.originalPrice) : null;
  const discountPercent = originalPrice > currentPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  // Stock helpers
  const stock = product.stock ?? product.quantity ?? null;
  const isOutOfStock = stock !== null && stock <= 0;
  const isLowStock = stock !== null && stock > 0 && stock <= 5;
  const hasStock = stock !== null;

  const StockBadge = () => {
    if (!hasStock) return null;
    if (isOutOfStock) return <span className="stock-badge out-of-stock">Out of Stock</span>;
    if (isLowStock)   return <span className="stock-badge low-stock">⚡ Only {stock} left</span>;
    return               <span className="stock-badge in-stock-badge">{stock} in stock</span>;
  };

  // ── WISHLIST VARIANT ────────────────────────────────────────
  if (variant === 'wishlist') {
    return (
      <div className="product-card wishlist-variant">
        <div className="product-image-wrapper">
          <Link to={`/product/${product.id}`}>
            <img src={product.img || product.image} alt={product.name} className="product-image" loading="lazy" />
            <img
              src={product.hoverImg || defaultHoverImg}
              alt={`${product.name} Detail`}
              className="product-image-hover"
              loading="lazy"
            />
          </Link>
          <button className="heart-icon-btn active" onClick={() => addToWishlist(product)}>
            <Heart size={16} fill="white" color="white" />
          </button>
          {product.isBestSeller && <div className="tag best-seller-mini">BEST SELLER</div>}
          {discountPercent > 0 && <div className="tag discount-mini">{discountPercent}% OFF</div>}
        </div>

        <div className="product-info">
          <div className="name-price-row">
            <Link to={`/product/${product.id}`}>
              <h3 className="product-name serif">{product.name}</h3>
            </Link>
            <div className="price-stack">
              <span className="product-price-magenta">Pkr {currentPrice.toLocaleString()}</span>
              {originalPrice && <span className="price-old">Pkr {originalPrice.toLocaleString()}</span>}
            </div>
          </div>

          <p className="product-short-desc">{product.description || product.benefits || 'Premium glow ritual essential.'}</p>
          <StockBadge />

          <button className="btn-add-cart-full" onClick={() => addToCart(product)} disabled={isOutOfStock}>
            <ShoppingCart size={14} style={{ marginRight: '8px' }} />
            {isOutOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>
        </div>
      </div>
    );
  }

  // ── SHOP VARIANT (CATEGORY PAGE) ───────────────────────────
  if (variant === 'shop') {
    const active = isInWishlist(product.id);
    return (
      <div className={`product-card shop-variant ${isOutOfStock ? 'card-out-of-stock' : ''}`}>
        <div className="product-image-wrapper">
          <Link to={`/product/${product.id}`}>
            <img src={product.img || product.image} alt={product.name} className="product-image" loading="lazy" />
            <img
              src={product.hoverImg || defaultHoverImg}
              alt={`${product.name} Detail`}
              className="product-image-hover"
              loading="lazy"
            />
          </Link>
          <button
            className={`heart-icon-btn ${active ? 'active' : ''}`}
            onClick={() => addToWishlist(product)}
            aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} fill={active ? '#FF4D8D' : 'none'} color={active ? '#FF4D8D' : '#777'} />
          </button>
          <div className="card-tags">
            {product.isBestSeller && <span className="tag best-seller">BEST SELLER</span>}
            {product.isNew && <span className="tag new">NEW</span>}
            {product.isEditorsPick && <span className="tag editors-pick">EDITOR'S PICK</span>}
            {discountPercent > 0 && <span className="tag discount">{discountPercent}% OFF</span>}
          </div>
          {isOutOfStock && <div className="out-of-stock-overlay">Out of Stock</div>}
        </div>

        <div className="product-info">
          <Link to={`/product/${product.id}`}>
            <h3 className="product-name serif">{product.name}</h3>
          </Link>

          <div className="price-row">
            <span className="product-price-main">Pkr {currentPrice.toLocaleString()}</span>
            {originalPrice && (
              <>
                <span className="price-old-mini">Pkr {originalPrice.toLocaleString()}</span>
                {discountPercent > 0 && <span className="discount-pill">{discountPercent}% OFF</span>}
              </>
            )}
          </div>

          <div className="rating-row">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} fill="#FF4D8D" color="#FF4D8D" />
              ))}
            </div>
            <span className="rating-count">({product.reviews || 0})</span>
          </div>

          {hasStock && (
            isOutOfStock
              ? <span className="stock-badge out-of-stock" style={{marginBottom:'0.5rem'}}>Out of Stock</span>
              : isLowStock
                ? <span className="stock-badge low-stock" style={{marginBottom:'0.5rem'}}>⚡ Only {stock} left!</span>
                : <span className="stock-badge in-stock-badge" style={{marginBottom:'0.5rem'}}>{stock} in stock</span>
          )}

          <button
            className="btn-add-to-cart"
            onClick={() => addToCart(product)}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>
        </div>
      </div>
    );
  }

  // ── COMPLEMENT VARIANT (PRODUCT DETAILS PAGE) ──────────────
  if (variant === 'complement') {
    const active = isInWishlist(product.id);
    return (
      <div className="product-card complement-variant">
        <div className="product-image-wrapper">
          <Link to={`/product/${product.id}`}>
            <img src={product.img || product.image} alt={product.name} className="product-image" loading="lazy" />
            <img
              src={product.hoverImg || defaultHoverImg}
              alt={`${product.name} Detail`}
              className="product-image-hover"
              loading="lazy"
            />
          </Link>
          <button
            className={`heart-icon-btn ${active ? 'active' : ''}`}
            onClick={() => addToWishlist(product)}
            aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} fill={active ? '#FF4D8D' : 'none'} color={active ? '#FF4D8D' : '#777'} />
          </button>
        </div>

        <div className="product-info">
          <Link to={`/product/${product.id}`}>
            <h3 className="product-name serif">{product.name}</h3>
          </Link>
          <div className="price-quick-add">
            <div className="complement-price-block">
              <span className="product-price-main-sm">Pkr {currentPrice.toLocaleString()}</span>
              {originalPrice && <span className="price-old-sub">Pkr {originalPrice.toLocaleString()}</span>}
            </div>
            <button className="btn-quick-add" onClick={() => addToCart(product)} disabled={isOutOfStock}>
              {isOutOfStock ? 'Sold Out' : 'Quick Add'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── STANDARD VARIANT (HOME PAGE) ──────────────────────────
  const active = isInWishlist(product.id);
  return (
    <div className={`product-card ${isOutOfStock ? 'card-out-of-stock' : ''}`}>
      <div className="product-image-wrapper">
        <Link to={`/product/${product.id}`}>
          <img src={product.img || product.image} alt={product.name} className="product-image" loading="lazy" />
          <img
            src={product.hoverImg || defaultHoverImg}
            alt={`${product.name} Detail`}
            className="product-image-hover"
            loading="lazy"
          />
        </Link>
        <button
          className={`heart-icon-btn ${active ? 'active' : ''}`}
          onClick={() => addToWishlist(product)}
          aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={active ? '#FF4D8D' : 'none'} color={active ? '#FF4D8D' : '#777'} />
        </button>
        <div className="card-tags">
          {product.isBestSeller && <span className="tag best-seller">BEST SELLER</span>}
          {product.isNew && <span className="tag new">NEW</span>}
          {product.isEditorsPick && <span className="tag editors-pick">EDITOR'S PICK</span>}
          {discountPercent > 0 && <span className="tag discount">{discountPercent}% OFF</span>}
        </div>
        {isOutOfStock && <div className="out-of-stock-overlay">Out of Stock</div>}
      </div>

      <div className="product-info">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name serif">{product.name}</h3>
        </Link>
        <p className="product-description">{product.benefits || 'Radiance & Glow'}</p>

        <div className="product-footer">
          <div className="price-block">
            <span className="product-price">Pkr {currentPrice.toLocaleString()}</span>
            {originalPrice && <span className="price-old">Pkr {originalPrice.toLocaleString()}</span>}
          </div>
          <button className="add-cart-mini" onClick={() => addToCart(product)} disabled={isOutOfStock}>
            <Plus size={18} strokeWidth={1.5} />
          </button>
        </div>

        {hasStock && (
          isOutOfStock
            ? <span className="stock-badge out-of-stock" style={{marginTop:'6px'}}>Out of Stock</span>
            : isLowStock
              ? <span className="stock-badge low-stock" style={{marginTop:'6px'}}>⚡ Only {stock} left!</span>
              : <span className="stock-badge in-stock-badge" style={{marginTop:'6px'}}>{stock} in stock</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
