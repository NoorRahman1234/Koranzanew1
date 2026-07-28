import React from 'react';
import { Search, ArrowRight, User, Clock, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import './ArticlesPage.css';

const ArticlesPage = () => {
    const { addToCart } = useShop();

    const recommendedProduct = {
        id: 1,
        name: 'Aura Dew Serum',
        price: 999,
        image: 'https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=300'
    };
    const categories = [
        { name: 'Hydration Science', count: 12 },
        { name: 'The Ritual', count: 8 },
        { name: 'Primary Identity', count: 15, active: true },
        { name: 'Sustainable Beauty', count: 6 },
    ];

    const relatedArticles = [
        {
            title: 'The Art of Unwinding: Deep Repair While You Sleep',
            category: 'EVENING RITUAL',
            description: 'Discover why the window between 10 PM and 2 AM is crucial for your skin\'s regenerative processes.',
            image: 'https://images.pexels.com/photos/6732439/pexels-photo-6732439.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
        {
            title: 'Nature\'s Alchemists: Beyond The Surface',
            category: 'INGREDIENTS',
            description: 'A deep dive into the rare botanicals harvested for our Luminous collection and their ancient histories.',
            image: 'https://images.pexels.com/photos/8128062/pexels-photo-8128062.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
        {
            title: 'Minimalism in the Vanity: Editing Your Life',
            category: 'LIFESTYLE',
            description: 'Why a curated selection of five key products is often more effective than a shelf full of trendy chaos.',
            image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
    ];

    return (
        <div className="articles-page">
            {/* ARTICLE HERO */}
            <section className="article-hero">
                <div className="hero-overlay">
                    <div className="hero-content text-center">
                        <span className="tag-category">SKINCARE TIPS</span>
                        <h1 className="article-title serif">Luminous Aura: The Science of The Glow</h1>
                        <p className="article-subtitle">
                            Explore the transformative power of moisture-locking layers and the philosophy behind your skin's future glow.
                        </p>
                    </div>
                </div>
                <img 
                    src="https://images.pexels.com/photos/3762871/pexels-photo-3762871.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                    alt="Article Hero" 
                    className="hero-main-image"
                />
            </section>

            <div className="container article-layout">
                {/* MAIN CONTENT */}
                <main className="article-main">
                    <div className="article-meta">
                        <div className="author-info">
                            <div className="author-avatar-small">
                                <img src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Author" />
                            </div>
                            <div className="author-text">
                                <span className="author-name">BY KAINAT AKHTAR</span>
                                <span className="meta-details">Beauty Editor • 8 min read</span>
                            </div>
                        </div>
                    </div>

                    <div className="article-body">
                        <p className="dropcap">
                            True beauty begins at the cellular level, where the dialogue between moisture and membrane creates the foundation of our 'Korenza'.
                        </p>
                        <p>
                            In an era dominated by fleeting trends, the concept of a "ritual" serves as an anchor. It is more than just applying product; it is an act of reclamation. When we talk about Luminous Aura, we are referring to the natural radiance that exists within every skin type, waiting to be unlocked by the right sequence of ingredients and intention.
                        </p>

                        <figure className="article-figure">
                            <img src="https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Product texture" />
                        </figure>

                        <h2 className="serif">The Science of The Glow</h2>
                        <p>
                            Our research suggests that environmental stressors contribute to 80% of visible aging. The primary barrier—your skin's outermost layer—is the frontline of defense. Our latest formula focuses on biomimetic lipids that mirror the skin's natural structure, allowing for deep penetration without disruption.
                        </p>

                        <blockquote>
                            "Skincare is the ultimate form of self-respect. It is the silent language we speak to our future selves."
                        </blockquote>

                        <p>
                            The ritual begins with our Luminous Cleansing Balm, followed by the Aura Mist. This layering technique ensures that hydration is not just applied, but sealed. As you move through your morning, these active botanicals work in harmony with your skin's circadian rhythm.
                        </p>
                    </div>

                    {/* SUBSCRIPTION SECTION */}
                    <section className="article-subscription">
                        <div className="subscription-card">
                            <h3 className="serif">Subscribe for beauty tips</h3>
                            <p>Join our inner circle for exclusive editorial content, early access to new rituals, and personal skincare guidance.</p>
                            <form className="subscription-form" onSubmit={(e) => e.preventDefault()}>
                                <input type="email" placeholder="your@email.com" required />
                                <button type="submit" className="btn-join">JOIN US</button>
                            </form>
                        </div>
                    </section>
                </main>

                {/* SIDEBAR */}
                <aside className="article-sidebar">
                    <div className="sidebar-widget">
                        <h4 className="widget-title small-caps">Search Articles</h4>
                        <div className="search-field">
                            <input type="text" placeholder="Explore rituals..." />
                            <Search size={16} className="search-icon" />
                        </div>
                    </div>

                    <div className="sidebar-widget">
                        <h4 className="widget-title small-caps">Categories</h4>
                        <ul className="category-list">
                            {categories.map((cat, idx) => (
                                <li key={idx} className={cat.active ? 'active' : ''}>
                                    <span className="cat-name">{cat.name}</span>
                                    <span className="cat-count">{cat.count.toString().padStart(2, '0')}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="sidebar-widget">
                        <h4 className="widget-title small-caps">Recommended for you</h4>
                        <div className="recommended-card">
                            <img src="https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=300" alt="Recommended Product" />
                            <div className="recommended-info">
                                <h5 className="serif">Aura Dew Serum</h5>
                                <p className="price">Pkr 999</p>
                                <button 
                                    className="btn-add-ritual" 
                                    onClick={() => addToCart({ ...recommendedProduct, quantity: 1 })}
                                >
                                    ADD TO RITUAL
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* CONTINUING THE STORY */}
            <section className="container related-articles">
                <h2 className="section-title text-center serif">Continuing The Story</h2>
                <div className="grid-3">
                    {relatedArticles.map((article, idx) => (
                        <div key={idx} className="article-preview-card">
                            <div className="card-image">
                                <img src={article.image} alt={article.title} />
                            </div>
                            <div className="card-content">
                                <span className="card-tag text-magenta">{article.category}</span>
                                <h4 className="serif">{article.title}</h4>
                                <p>{article.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ArticlesPage;
