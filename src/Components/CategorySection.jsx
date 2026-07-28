import React from 'react';
import { Link } from 'react-router-dom';
import './CategorySection.css';

// Import Hensam images
import hansamMain from '../assets/Images/Hensam/Hansam.png';

const CategorySection = () => {
    const stories = [
        { label: 'MORNING DEW', img: 'https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=300' },
        { label: 'THE SERUM', img: 'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=300' },
        { label: 'RITUAL GUIDE', img: 'https://images.pexels.com/photos/3762882/pexels-photo-3762882.jpeg?auto=compress&cs=tinysrgb&w=300' }
    ];

    return (
        <section className="category-section" id="categories">
            <div className="container">
                {/* STORIES SECTION */}
                <div className="stories-container">
                    {stories.map((story, index) => (
                        <div key={index} className="story-item">
                            <div className="story-circle">
                                <img src={story.img} alt={story.label} loading="lazy" />
                            </div>
                            <span className="story-label">{story.label}</span>
                        </div>
                    ))}
                </div>

                {/* BENTO GRID */}
                <div className="bento-grid">
                    {/* LEFT COLUMN */}
                    <div className="bento-column">
                        <div className="bento-card large eyes-products">
                            <Link to="/category/Eyes Products">
                                <img src="https://images.pexels.com/photos/3762402/pexels-photo-3762402.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Eyes Products" loading="lazy" />
                                <div className="card-overlay bottom">
                                    <h2 className="card-title serif">Eyes Products</h2>
                                    <p className="card-subtitle">Illuminate your gaze with our premium eye collection.</p>
                                    <span className="explore-btn">Explore Collection</span>
                                </div>
                            </Link>
                        </div>

                        <div className="bento-card small lip-products">
                            <Link to="/category/Lip Products">
                                <img src="https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Lip Products" loading="lazy" />
                                <div className="card-overlay flex-row">
                                    <div className="text-content">
                                        <h3 className="card-title serif">Lip Products</h3>
                                        <p className="card-subtitle">Velvet tints and hydrating serums for a perfect pout.</p>
                                    </div>
                                    <div className="arrow-circle">→</div>
                                </div>
                            </Link>
                        </div>

                        <div className="bento-card small face-products">
                            <Link to="/category/Face Products">
                                <img src="https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Face Products" loading="lazy" />
                                <div className="card-overlay top">
                                    <h3 className="card-title serif">Face Products</h3>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="bento-column">
                        <div className="bento-card small skincare">
                            <Link to="/category/Skincare">
                                <img src="https://images.pexels.com/photos/3762882/pexels-photo-3762882.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Skincare" loading="lazy" />
                                <div className="card-overlay bottom">
                                    <h3 className="card-title serif">Skincare</h3>
                                </div>
                            </Link>
                        </div>

                        <div className="bento-card small herbal-wellness">
                            <Link to="/category/Herbal Wellness">
                                <img src={hansamMain} alt="Herbal Wellness" loading="lazy" />
                                <div className="card-overlay flex-row">
                                    <div className="text-content">
                                        <h3 className="card-title serif">Herbal Wellness</h3>
                                        <p className="card-subtitle">Traditional Korean herbal secrets for holistic beauty.</p>
                                    </div>
                                    <div className="arrow-circle">→</div>
                                </div>
                            </Link>
                        </div>

                        <div className="bento-card large all-products">
                            <Link to="/category/all">
                                <img src="https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=800" alt="All Products" loading="lazy" />
                                <div className="card-overlay bottom">
                                    <h2 className="card-title serif">Shop All</h2>
                                    <p className="card-subtitle">Discover our entire collection of luminous essentials.</p>
                                    <span className="explore-btn">Explore Everything</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
