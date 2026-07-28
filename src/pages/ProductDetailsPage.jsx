import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Minus, Plus, Truck, Droplets, Sparkles, Waves, Flower2, FlaskConical, Microscope } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { products as localProducts } from '../data/products';
import './ProductDetailsPage.css';
import ProductCard from '../Components/ProductCard';

const BASE_URL = "http://localhost:3000";

/* ── Full 360° Drag-to-Rotate 3D Card ────────────────────── */
const Tilt3DImageBox = ({ selectedImage, product }) => {
    const cardRef  = useRef(null);
    const rafRef   = useRef(null);
    const [is360Active, setIs360Active] = useState(false);

    // Accumulated rotation (degrees, unbounded)
    const rot = useRef({ x: 0, y: 0 });
    // Physics velocity for momentum after drag
    const vel = useRef({ x: 0, y: 0 });

    // Drag tracking
    const drag = useRef({
        active: false,
        lastX: 0, lastY: 0,
        startRotX: 0, startRotY: 0,
    });

    // Hover gentle tilt (only when close to front face)
    const hover = useRef({ active: false, tx: 0, ty: 0 });

    /* ── apply transform ─────────────────────────────────── */
    const applyTransform = useCallback(() => {
        if (!cardRef.current) return;
        const { x, y } = rot.current;
        cardRef.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;

        // dynamic glare on the front face
        const glare = cardRef.current.querySelector('.tilt-glare');
        if (glare) {
            const norm = (n, range) => ((n % range) + range) % range;
            const gx = 50 + (norm(y, 360) - 180) * 0.15;
            const gy = 50 - (norm(x, 360) - 180) * 0.15;
            glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.32) 0%, transparent 60%)`;
            const intensity = Math.min(1, (Math.abs(vel.current.x) + Math.abs(vel.current.y)) / 6);
            glare.style.opacity = intensity;
        }
    }, []);

    /* ── animation loop ─────────────────────────────────── */
    const tick = useCallback(() => {
        if (!drag.current.active) {
            if (hover.current.active && is360Active) { // Only tilt if 360 mode is on
                // Gentle hover tilt when near front (rotY near 0/360)
                const normY = ((rot.current.y % 360) + 360) % 360;
                const nearFront = normY < 30 || normY > 330;
                if (nearFront) {
                    rot.current.x += (hover.current.tx - rot.current.x) * 0.1;
                    rot.current.y += (hover.current.ty - rot.current.y) * 0.1;
                    vel.current.x = 0;
                    vel.current.y = 0;
                } else {
                    // Coast with friction away from front
                    vel.current.x *= 0.94;
                    vel.current.y *= 0.94;
                    rot.current.x += vel.current.x;
                    rot.current.y += vel.current.y;
                }
            } else if (is360Active) {
                // Coast with friction (only if 360 mode is on)
                vel.current.x *= 0.94;
                vel.current.y *= 0.94;
                rot.current.x += vel.current.x;
                rot.current.y += vel.current.y;
            }
        }

        applyTransform();

        const stillMoving = is360Active && (
            drag.current.active ||
            hover.current.active ||
            Math.abs(vel.current.x) > 0.02 ||
            Math.abs(vel.current.y) > 0.02
        );

        if (stillMoving) {
            rafRef.current = requestAnimationFrame(tick);
        }
    }, [applyTransform, is360Active]);

    /* ── DRAG handlers (window-level so dragging outside works) */
    const onMouseDown = useCallback((e) => {
        if (!is360Active || e.button !== 0) return; // Disable drag if 360 mode is off
        drag.current = {
            active: true,
            lastX: e.clientX,
            lastY: e.clientY,
            startRotX: rot.current.x,
            startRotY: rot.current.y,
        };
        vel.current = { x: 0, y: 0 };
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(tick);
        e.preventDefault();
    }, [tick, is360Active]);

    useEffect(() => {
        const onMouseMove = (e) => {
            if (!drag.current.active) return;
            const dx = e.clientX - drag.current.lastX;
            const dy = e.clientY - drag.current.lastY;
            
            if (is360Active) {
                // Full rotation in 360 mode
                vel.current.y =  dx * 0.55;
                vel.current.x = -dy * 0.55;
                rot.current.y += dx * 0.55;
                rot.current.x -= dy * 0.55;
            } else {
                // Subtle tilt when NOT in 360 mode (limited range)
                const targetY = rot.current.y + dx * 0.2;
                const targetX = rot.current.x - dy * 0.2;
                // Clamp tilt so it doesn't flip when 360 is off
                rot.current.y += (Math.max(-25, Math.min(25, targetY)) - rot.current.y) * 0.2;
                rot.current.x += (Math.max(-25, Math.min(25, targetX)) - rot.current.x) * 0.2;
            }
            
            drag.current.lastX = e.clientX;
            drag.current.lastY = e.clientY;
            applyTransform();
        };

        const onMouseUp = () => {
            if (!drag.current.active) return;
            drag.current.active = false;
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(tick);
        };

        // Touch support
        const onTouchStart = (e) => {
            if (!is360Active) return; // Disable touch if 360 mode is off
            const t = e.touches[0];
            drag.current = { active: true, lastX: t.clientX, lastY: t.clientY };
            vel.current = { x: 0, y: 0 };
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(tick);
        };
        const onTouchMove = (e) => {
            if (!drag.current.active) return;
            const t = e.touches[0];
            const dx = t.clientX - drag.current.lastX;
            const dy = t.clientY - drag.current.lastY;
            
            if (is360Active) {
                vel.current.y =  dx * 0.55;
                vel.current.x = -dy * 0.55;
                rot.current.y += dx * 0.55;
                rot.current.x -= dy * 0.55;
            } else {
                rot.current.y = (dx / window.innerWidth) * 40;
                rot.current.x = -(dy / window.innerHeight) * 40;
            }
            
            drag.current.lastX = t.clientX;
            drag.current.lastY = t.clientY;
            applyTransform();
            e.preventDefault();
        };
        const onTouchEnd = () => {
            drag.current.active = false;
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(tick);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup',   onMouseUp);
        const card = cardRef.current;
        if (card) {
            card.addEventListener('touchstart', onTouchStart, { passive: false });
            card.addEventListener('touchmove',  onTouchMove,  { passive: false });
            card.addEventListener('touchend',   onTouchEnd);
        }
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup',   onMouseUp);
            if (card) {
                card.removeEventListener('touchstart', onTouchStart);
                card.removeEventListener('touchmove',  onTouchMove);
                card.removeEventListener('touchend',   onTouchEnd);
            }
        };
    }, [applyTransform, tick, is360Active]); // Added is360Active dependency

    /* ── Hover gentle tilt (front-face only) ─────────────── */
    const onMouseEnter = useCallback(() => {
        if (!is360Active) return; // Disable hover if 360 mode is off
        hover.current.active = true;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(tick);
    }, [tick, is360Active]);

    const onMouseMove = useCallback((e) => {
        if (drag.current.active) return;
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
        const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
        hover.current.tx = -dy * 10;
        hover.current.ty =  dx * 10;
    }, []);

    const onMouseLeave = useCallback(() => {
        hover.current.active = false;
        hover.current.tx = 0;
        hover.current.ty = 0;
        // Snap back to flat
        vel.current = { x: 0, y: 0 };
        const snapBack = () => {
            rot.current.x += (0 - rot.current.x) * 0.1;
            rot.current.y += (0 - rot.current.y) * 0.1;
            applyTransform();
            if (Math.abs(rot.current.x) > 0.1 || Math.abs(rot.current.y) > 0.1) {
                rafRef.current = requestAnimationFrame(snapBack);
            } else {
                rot.current = { x: 0, y: 0 };
                applyTransform();
            }
        };
        // Only snap back if we're near the front (no full spin in progress)
        const normY = ((rot.current.y % 360) + 360) % 360;
        const normX = ((rot.current.x % 360) + 360) % 360;
        if ((normY < 45 || normY > 315) && (normX < 45 || normX > 315)) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(snapBack);
        }
    }, [applyTransform]);

    /* ── Double-click → reset to front ────────────────────── */
    const onDoubleClick = useCallback(() => {
        vel.current = { x: 0, y: 0 };
        const snapToFront = () => {
            rot.current.x *= 0.85;
            rot.current.y *= 0.85;
            applyTransform();
            if (Math.abs(rot.current.x) > 0.3 || Math.abs(rot.current.y) > 0.3) {
                rafRef.current = requestAnimationFrame(snapToFront);
            } else {
                rot.current = { x: 0, y: 0 };
                applyTransform();
            }
        };
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(snapToFront);
    }, [applyTransform]);

    useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

    return (
        <div className="tilt-3d-scene">
            <div
                className={`tilt-3d-card ${is360Active ? 'mode-360' : ''}`}
                ref={cardRef}
                onMouseDown={onMouseDown}
                onMouseEnter={onMouseEnter}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onDoubleClick={onDoubleClick}
            >
                {/* FRONT FACE */}
                <div className="tilt-face tilt-front">
                    <div className="tilt-glare" />
                    <img src={selectedImage || product.image} alt={product.name} className="main-image" />
                </div>

                {/* BACK FACE (Now shows image for 360 feel) */}
                <div className="tilt-face tilt-back">
                    <img src={selectedImage || product.image} alt={product.name} className="main-image back-image-flip" />
                </div>
            </div>

            <div className="tilt-controls">
                <button 
                    className={`btn-360-toggle ${is360Active ? 'active' : ''}`}
                    onClick={() => {
                        if (is360Active) {
                            // Reset when exiting
                            vel.current = { x: 0, y: 0 };
                            const snap = () => {
                                rot.current.x *= 0.8;
                                rot.current.y *= 0.8;
                                applyTransform();
                                if (Math.abs(rot.current.x) > 0.1 || Math.abs(rot.current.y) > 0.1) {
                                    rafRef.current = requestAnimationFrame(snap);
                                } else {
                                    rot.current = { x: 0, y: 0 };
                                    applyTransform();
                                }
                            };
                            cancelAnimationFrame(rafRef.current);
                            rafRef.current = requestAnimationFrame(snap);
                        }
                        setIs360Active(!is360Active);
                    }}
                >
                    <Waves size={16} />
                    {is360Active ? 'EXIT 360°' : '360° VIEW'}
                </button>
                
                {/* Drag hint moved below button */}
                <p className="tilt-drag-hint">
                    <span>↔ {is360Active ? 'Drag to rotate 360°' : 'Drag to tilt view'} · double-click to reset</span>
                </p>
            </div>
        </div>
    );
};
/* ──────────────────────────────────────────────────────────── */

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const { addToCart, products, addToWishlist, isInWishlist } = useShop();

    // Fetch product details
    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            try {
                // Try API first
                const response = await axios.get(`${BASE_URL}/api/products/${productId}`);
                if (response.data.success) {
                    const data = response.data.data;
                    const getUrl = (path) => path && !path.startsWith('http') ? `${BASE_URL}${path}` : path;
                    setProduct({
                        ...data,
                        image: getUrl(data.image) || data.img,
                        hoverImg: getUrl(data.hoverImg),
                        image2: getUrl(data.image2),
                        image3: getUrl(data.image3),
                        image4: getUrl(data.image4),
                        originalPrice: data.original_price,
                        howToUse: data.how_to_use
                    });
                } else {
                    // Fallback to local products
                    let localMatch = localProducts.find(p => String(p.id) === String(productId));
                    
                    // Handle "luminous-X" and "sX" style IDs used in some components
                    if (!localMatch) {
                        const numericId = productId.replace(/[^0-9]/g, '');
                        if (numericId) {
                            localMatch = localProducts.find(p => String(p.id) === numericId);
                        }
                    }

                    if (localMatch) {
                        setProduct({
                            ...localMatch,
                            image: localMatch.image || localMatch.img
                        });
                    }
                }
            } catch (error) {
                // Fallback to local products on error
                let localMatch = localProducts.find(p => String(p.id) === String(productId));
                
                // Handle "luminous-X" and "sX" style IDs
                if (!localMatch) {
                    const numericId = productId.replace(/[^0-9]/g, '');
                    if (numericId) {
                        localMatch = localProducts.find(p => String(p.id) === numericId);
                    }
                }

                if (localMatch) {
                    setProduct({
                        ...localMatch,
                        image: localMatch.image || localMatch.img
                    });
                } else {
                    console.log("Error loading product:", error);
                }
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [productId]);

    useEffect(() => {
        if (product) {
            setSelectedImage(product.image);
        }
    }, [product]);

    // Get related products (excluding current)
    const perfectPairings = (products.length > 0 ? products : localProducts)
        .filter(p => String(p.id) !== String(productId))
        .slice(0, 3);

    const testimonials = [
        {
            name: "Elena R.",
            role: "VERIFIED GLOW",
            text: "My skin hasn't felt this soft since my teens. The Ritual is now the best part of my morning.",
            img: "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg",
            rating: 5
        },
        {
            name: "Sophia M.",
            role: "VERIFIED GLOW",
            text: "The Radiance Serum is magic in a bottle. It's so lightweight yet so incredibly hydrating.",
            img: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg",
            rating: 5
        },
        {
            name: "Julianne K.",
            role: "VERIFIED GLOW",
            text: "Packaging is gorgeous, but the results are what keep me coming back. Truly high-end quality.",
            img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
            rating: 5
        }
    ];

    if (loading || !product) {
        return (
            <div className="product-not-found">
                {loading ? 'Loading product...' : 'Product not found.'}
                <button onClick={() => navigate('/')}>Go Home</button>
            </div>
        );
    }

    return (
        <div className="product-details-page">
            <div className="container">
                {/* PRODUCT HERO SECTION */}
                <div className="product-main-grid">
                    <div className="product-gallery">
                        <Tilt3DImageBox selectedImage={selectedImage} product={product} />
                        <div className="thumbnail-grid">
                            <div 
                                className={`thumbnail ${selectedImage === product.image ? 'active' : ''}`} 
                                onClick={() => setSelectedImage(product.image)}
                            >
                                <img src={product.image} alt="thumbnail" loading="lazy" />
                            </div>
                            {(product.image2 || product.image3 || product.image4) ? (
                                <>
                                    {product.image2 && (
                                        <div 
                                            className={`thumbnail ${selectedImage === product.image2 ? 'active' : ''}`} 
                                            onClick={() => setSelectedImage(product.image2)}
                                        >
                                            <img src={product.image2} alt="thumbnail" loading="lazy" />
                                        </div>
                                    )}
                                    {product.image3 && (
                                        <div 
                                            className={`thumbnail ${selectedImage === product.image3 ? 'active' : ''}`} 
                                            onClick={() => setSelectedImage(product.image3)}
                                        >
                                            <img src={product.image3} alt="thumbnail" loading="lazy" />
                                        </div>
                                    )}
                                    {product.image4 && (
                                        <div 
                                            className={`thumbnail ${selectedImage === product.image4 ? 'active' : ''}`} 
                                            onClick={() => setSelectedImage(product.image4)}
                                        >
                                            <img src={product.image4} alt="thumbnail" loading="lazy" />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div 
                                        className={`thumbnail ${selectedImage === "https://images.pexels.com/photos/8140916/pexels-photo-8140916.jpeg" ? 'active' : ''}`} 
                                        onClick={() => setSelectedImage("https://images.pexels.com/photos/8140916/pexels-photo-8140916.jpeg")}
                                    >
                                        <img src="https://images.pexels.com/photos/8140916/pexels-photo-8140916.jpeg?auto=compress&cs=tinysrgb&w=300" alt="thumbnail" loading="lazy" />
                                    </div>
                                    <div 
                                        className={`thumbnail ${selectedImage === "https://images.pexels.com/photos/8128065/pexels-photo-8128065.jpeg" ? 'active' : ''}`} 
                                        onClick={() => setSelectedImage("https://images.pexels.com/photos/8128065/pexels-photo-8128065.jpeg")}
                                    >
                                        <img src="https://images.pexels.com/photos/8128065/pexels-photo-8128065.jpeg?auto=compress&cs=tinysrgb&w=300" alt="thumbnail" loading="lazy" />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="product-info-panel">
                        <div className="tag-bestseller">BESTSELLER</div>
                        <h1 className="product-name serif">{product.name}</h1>

                        {/* Price block */}
                        <div className="pdp-price-block">
                            <span className="pdp-price">
                                Pkr {product.price ? Number(String(product.price).replace(/[^0-9.]/g, '')).toLocaleString() : '0'}
                            </span>
                            {product.originalPrice && (
                                <>
                                    <span className="pdp-price-old">
                                        Pkr {Number(String(product.originalPrice).replace(/[^0-9.]/g, '')).toLocaleString()}
                                    </span>
                                    {(() => {
                                        const curr = Number(String(product.price).replace(/[^0-9.]/g, ''));
                                        const orig = Number(String(product.originalPrice).replace(/[^0-9.]/g, ''));
                                        const pct = orig > curr ? Math.round(((orig - curr) / orig) * 100) : 0;
                                        return pct > 0 ? <span className="pdp-discount-badge">{pct}% OFF</span> : null;
                                    })()}
                                </>
                            )}
                        </div>

                        {/* Stock indicator */}
                        {(() => {
                            const stock = product.stock ?? null;
                            if (stock === null) return null;
                            if (stock <= 0) return (
                                <div className="pdp-stock out">
                                    <span className="pdp-stock-dot"></span>
                                    Out of Stock
                                </div>
                            );
                            if (stock <= 5) return (
                                <div className="pdp-stock low">
                                    <span className="pdp-stock-dot"></span>
                                    ⚡ Only <strong style={{margin:'0 3px'}}>{stock}</strong> items left!
                                </div>
                            );
                            return (
                                <div className="pdp-stock in">
                                    <span className="pdp-stock-dot"></span>
                                    <strong style={{marginRight:'4px'}}>{stock}</strong> in stock
                                </div>
                            );
                        })()}
                        
                        <p className="product-summary">
                            {product.description || "A lightweight, transformative serum that infuses your skin with deep hydration and a luminous, petal-soft glow."}
                        </p>
                        
                        <div className="add-to-bag-row">
                            <button
                                className="btn-add-to-bag"
                                onClick={() => addToCart({ ...product, quantity: 1 })}
                                disabled={(product.stock ?? null) !== null && product.stock <= 0}
                                style={(product.stock ?? null) !== null && product.stock <= 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                            >
                                {((product.stock ?? null) !== null && product.stock <= 0) ? 'OUT OF STOCK' : 'ADD TO BAG'}
                            </button>
                            <button 
                                className={`wishlist-toggle-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                                onClick={() => addToWishlist(product)}
                                aria-label="Toggle wishlist"
                            >
                                <Heart size={20} fill={isInWishlist(product.id) ? "var(--primary)" : "none"} color={isInWishlist(product.id) ? "var(--primary)" : "#555"} />
                            </button>
                        </div>

                        <div className="shipping-info">
                            <Truck size={16} />
                            <span>Complimentary shipping on orders over Pkr 10,000</span>
                        </div>

                        <div className="benefit-items">
                            <div className="benefit-item">
                                <div className="benefit-icon"><Droplets size={20} /></div>
                                <div className="benefit-text">
                                    <strong>24h Hydration</strong>
                                    <span>Lock in moisture all day</span>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <div className="benefit-icon"><Sparkles size={20} /></div>
                                <div className="benefit-text">
                                    <strong>Instantly Luminous</strong>
                                    <span>Radiance from within</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* LUMINOUS RESULTS */}
                <section className="results-section">
                    <div className="section-intro text-center">
                        <h2 className="section-title">Luminous Results</h2>
                        <p className="section-subtitle">Scientifically formulated for visible skin transformation.</p>
                    </div>
                    <div className="results-grid">
                        <div className="result-card">
                            <div className="result-icon"><Droplets size={32} strokeWidth={1} /></div>
                            <h3>Hydrate</h3>
                            <p>Multi-weight hyaluronic acid penetrates deep to plump and quench thirsty skin cells.</p>
                        </div>
                        <div className="result-card">
                            <div className="result-icon"><Sparkles size={32} strokeWidth={1} /></div>
                            <h3>Brighten</h3>
                            <p>Rose essence and vitamin C work in harmony to fade dark spots and reveal a natural glow.</p>
                        </div>
                        <div className="result-card">
                            <div className="result-icon"><Waves size={32} strokeWidth={1} /></div>
                            <h3>Smooth</h3>
                            <p>Gentle fruit enzymes refine skin texture for a velvety, petal-soft finish without irritation.</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* YOUR DAILY PRACTICES - PINK BG */}
            <section className="practice-section">
                <div className="container">
                    <div className="section-intro text-center">
                        <span className="small-caps text-magenta">The Experience</span>
                        <h2 className="section-title">Your Daily Practices</h2>
                    </div>
                    <div className="practice-grid">
                        <div className="practice-step">
                            <div className="step-image-wrapper">
                                <img src="https://images.pexels.com/photos/8459356/pexels-photo-8459356.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Purify" loading="lazy" />
                                <div className="step-number">1</div>
                            </div>
                            <h4>Purify</h4>
                            <p>Start with a clean canvas using our Cloud Cleanser.</p>
                        </div>
                        <div className="practice-step">
                            <div className="step-image-wrapper">
                                <img src="https://images.pexels.com/photos/8128062/pexels-photo-8128062.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Infuse" loading="lazy" />
                                <div className="step-number">2</div>
                            </div>
                            <h4>Infuse</h4>
                            <p>Apply 3-4 drops of Radiance Dew onto damp face and neck.</p>
                        </div>
                        <div className="practice-step">
                            <div className="step-image-wrapper">
                                <img src="https://images.pexels.com/photos/8140916/pexels-photo-8140916.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Seal" loading="lazy" />
                                <div className="step-number">3</div>
                            </div>
                            <h4>Seal</h4>
                            <p>Press gently with palms and follow with Silk Recovery Cream.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PURE INTENTIONS */}
            <section className="intentions-section">
                <div className="container grid-2">
                    <div className="intentions-content">
                        <h2 className="section-title">Pure Intentions</h2>
                        <div className="intention-items">
                            <div className="intention-item">
                                <div className="intention-icon"><Flower2 size={24} /></div>
                                <div className="intention-details">
                                    <h4>Damask Rose Essence</h4>
                                    <p>Sourced from sustainably grown petals, this essence calms inflammation and provides a delicate, natural scent ritual.</p>
                                </div>
                            </div>
                            <div className="intention-item">
                                <div className="intention-icon"><FlaskConical size={24} /></div>
                                <div className="intention-details">
                                    <h4>Vegan Hyaluronic Acid</h4>
                                    <p>Triple-molecular weight structure that targets different skin layers for comprehensive deep hydration.</p>
                                </div>
                            </div>
                            <div className="intention-item">
                                <div className="intention-icon"><Microscope size={24} /></div>
                                <div className="intention-details">
                                    <h4>Kakadu Plum Extract</h4>
                                    <p>The world's richest source of Vitamin C, providing potent antioxidant protection against environmental stress.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="intentions-image">
                        <img src="https://images.pexels.com/photos/3762871/pexels-photo-3762871.jpeg" alt="Pure Intentions" />
                    </div>
                </div>
            </section>

            {/* LUMINOUS VOICES (TESTIMONIALS) */}
            <section className="voices-section container">
                <div className="section-intro">
                    <h2 className="section-title">Luminous Voices</h2>
                    <div className="rating-summary">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--primary)" color="var(--primary)" />)}
                        </div>
                        <span>4.9 / 5 (128 Reviews)</span>
                    </div>
                </div>
                <div className="voices-grid grid-3">
                    {testimonials.map((t, index) => (
                        <div className="voice-card" key={index}>
                            <div className="stars">
                                {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} color="#EAEAEA" />)}
                            </div>
                            <p className="voice-text italic">"{t.text}"</p>
                            <div className="voice-user">
                                <img src={t.img} alt={t.name} className="user-img" />
                                <div className="user-info">
                                    <h4>{t.name}</h4>
                                    <span>{t.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* COMPLEMENT YOUR GLOW */}
            <section className="complement-section container">
                <h2 className="section-title text-center">Complement Your Glow</h2>
                <div className="grid-3">
                    {perfectPairings.map(item => (
                        <ProductCard key={item.id} product={item} variant="complement" />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProductDetailsPage;
