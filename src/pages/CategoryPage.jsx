// import React, { useEffect, useState } from 'react';
// import { useParams, useLocation, Link } from 'react-router-dom';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// import { useShop } from '../context/ShopContext';
// import './CategoryPage.css';
// import ProductCard from '../Components/ProductCard';

// const CategoryPage = () => {
//     const { categoryName } = useParams();
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const searchQuery = searchParams.get('q');

//     const { products, productsLoading, parsePrice, categories } = useShop();
//     const [categoryProducts, setCategoryProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Filter states
//     const [filterBy, setFilterBy] = useState('all'); // 'all', 'best-seller', 'new-arrival'
//     const [sortBy, setSortBy] = useState('Recommended');
//     const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
//     const [selectedConcerns, setSelectedConcerns] = useState([]);
//     const [maxPrice, setMaxPrice] = useState(100000);

//     const skinTypes = ['Normal', 'Oily', 'Dry', 'Sensitive', 'Combination'];
//     const concerns = ['Anti-Aging', 'Hydration', 'Brightening', 'Acne'];

//     const handleSkinTypeChange = (type) => {
//         setSelectedSkinTypes(prev => 
//             prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
//         );
//     };

//     const handleConcernChange = (concern) => {
//         setSelectedConcerns(prev => 
//             prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern]
//         );
//     };

//     useEffect(() => {
//         setLoading(true);
        
//         let filtered = [...products];

//         // 1. Filter by category
//         if (categoryName && categoryName.toLowerCase() !== 'all') {
//             filtered = filtered.filter(p => 
//                 p.category && p.category.toLowerCase() === categoryName.toLowerCase()
//             );
//         }

//         // 2. Filter by search query
//         if (searchQuery) {
//             filtered = filtered.filter(p => 
//                 p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
//             );
//         }

//         // 3. Filter by Best Seller / New Arrival
//         if (filterBy === 'best-seller') {
//             filtered = filtered.filter(p => p.isBestSeller);
//         } else if (filterBy === 'new-arrival') {
//             filtered = filtered.filter(p => p.isNew);
//         }

//         // 4. Filter by Skin Type
//         if (selectedSkinTypes.length > 0) {
//             filtered = filtered.filter(p => 
//                 p.skinType && selectedSkinTypes.some(type => p.skinType.includes(type))
//             );
//         }

//         // 5. Filter by Concern
//         if (selectedConcerns.length > 0) {
//             filtered = filtered.filter(p => 
//                 p.benefits && selectedConcerns.some(concern => p.benefits.toLowerCase().includes(concern.toLowerCase()))
//             );
//         }

//         // 6. Filter by Price
//         filtered = filtered.filter(p => parsePrice(p.price) <= maxPrice);

//         // 7. Sort
//         if (sortBy === 'Price: Low to High') {
//             filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
//         } else if (sortBy === 'Price: High to Low') {
//             filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
//         }

//         setCategoryProducts(filtered);
//         setLoading(false);
//         window.scrollTo(0, 0);
//     }, [categoryName, searchQuery, products, filterBy, sortBy, selectedSkinTypes, selectedConcerns, maxPrice, parsePrice]);

//     const displayTitle = categoryName === 'all' ? 'All Products' : categoryName;

//     return (
//         <div className="category-page">
//             <div className="container">
//                 <header className="category-header text-center">
//                     <h1 className="category-main-title serif text-magenta">{displayTitle}</h1>
//                     <p className="category-subtitle">
//                         Discover our collection of petal-soft essentials designed to illuminate your natural identity.
//                     </p>
//                 </header>

//                 <div className="category-controls">
//                     <div className="filter-pills">
//                         <span className="control-label">FILTER BY:</span>
//                         <button 
//                             className={`pill-btn ${filterBy === 'all' ? 'active' : ''}`}
//                             onClick={() => setFilterBy('all')}
//                         >
//                             All
//                         </button>
//                         <button 
//                             className={`pill-btn ${filterBy === 'best-seller' ? 'active' : ''}`}
//                             onClick={() => setFilterBy('best-seller')}
//                         >
//                             Best Sellers
//                         </button>
//                         <button 
//                             className={`pill-btn ${filterBy === 'new-arrival' ? 'active' : ''}`}
//                             onClick={() => setFilterBy('new-arrival')}
//                         >
//                             New Arrivals
//                         </button>
//                     </div>
//                     <div className="sort-control">
//                         <span className="control-label">SORT:</span>
//                         <select 
//                             className="minimal-select" 
//                             value={sortBy}
//                             onChange={(e) => setSortBy(e.target.value)}
//                         >
//                             <option>Recommended</option>
//                             <option>Price: Low to High</option>
//                             <option>Price: High to Low</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="category-layout">
//                     <aside className="category-sidebar">
//                         <div className="sidebar-group">
//                             <h3 className="sidebar-title text-magenta">Categories</h3>
//                             <div className="category-links-list">
//                                 <Link 
//                                     to="/category/all" 
//                                     className={`cat-sidebar-link ${categoryName === 'all' ? 'active' : ''}`}
//                                 >
//                                     All Products
//                                 </Link>
//                                 {categories.map((cat, idx) => {
//                                     const name = cat.name || cat.category;
//                                     return (
//                                         <Link 
//                                             key={cat.id || idx}
//                                             to={`/category/${name}`} 
//                                             className={`cat-sidebar-link ${categoryName === name ? 'active' : ''}`}
//                                         >
//                                             {name}
//                                         </Link>
//                                     );
//                                 })}
//                             </div>
//                         </div>

//                         <div className="sidebar-group">
//                             <h3 className="sidebar-title text-magenta">Skin Type</h3>
//                             <div className="checkbox-list">
//                                 {skinTypes.map(type => (
//                                     <label key={type} className={`custom-checkbox ${selectedSkinTypes.includes(type) ? 'active' : ''}`}>
//                                         <input 
//                                             type="checkbox" 
//                                             checked={selectedSkinTypes.includes(type)}
//                                             onChange={() => handleSkinTypeChange(type)}
//                                         /> 
//                                         <span className="checkmark"></span> {type}
//                                     </label>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="sidebar-group">
//                             <h3 className="sidebar-title text-magenta">Concern</h3>
//                             <div className="checkbox-list">
//                                 {concerns.map(concern => (
//                                     <label key={concern} className={`custom-checkbox ${selectedConcerns.includes(concern) ? 'active' : ''}`}>
//                                         <input 
//                                             type="checkbox" 
//                                             checked={selectedConcerns.includes(concern)}
//                                             onChange={() => handleConcernChange(concern)}
//                                         /> 
//                                         <span className="checkmark"></span> {concern}
//                                     </label>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="sidebar-group">
//                             <h3 className="sidebar-title text-magenta">Price Range</h3>
//                             <div className="price-slider-wrapper">
//                                 <input 
//                                     type="range" 
//                                     min="200" 
//                                     max="100000" 
//                                     step="500"
//                                     value={maxPrice} 
//                                     onChange={(e) => setMaxPrice(Number(e.target.value))}
//                                     className="styled-range" 
//                                 />
//                                 <div className="price-range-labels">
//                                     <span>Rs 200</span>
//                                     <span className="current-range">Rs {maxPrice}</span>
//                                     <span>Rs 100,000+</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </aside>

//                     <main className="category-products-area">
//                         {loading || productsLoading ? (
//                             <div className="loading-state">Loading the glow...</div>
//                         ) : categoryProducts.length === 0 ? (
//                             <div className="no-results-container">
//                                 <p className="no-results">No products found matching your criteria in "{displayTitle}".</p>
//                                 <button className="clear-filters-btn" onClick={() => {
//                                     setFilterBy('all');
//                                     setSelectedSkinTypes([]);
//                                     setSelectedConcerns([]);
//                                     setMaxPrice(6000);
//                                 }}>Clear All Filters</button>
//                             </div>
//                         ) : (
//                             <>
//                                 <p className="results-count">{categoryProducts.length} products found</p>
//                                 <div className="shop-products-grid">
//                                     {categoryProducts.map((product) => (
//                                         <ProductCard key={product.id} product={product} variant="shop" />
//                                     ))}
//                                 </div>
//                             </>
//                         )}

//                         <div className="pagination">
//                             <button className="page-arrow"><ChevronLeft size={16} /></button>
//                             <button className="page-num active">1</button>
//                             <button className="page-num">2</button>
//                             <button className="page-num">3</button>
//                             <button className="page-arrow"><ChevronRight size={16} /></button>
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CategoryPage;






import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useShop } from '../context/ShopContext';
import './CategoryPage.css';
import ProductCard from '../Components/ProductCard';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q');

    const { products, productsLoading, parsePrice, categories } = useShop();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [filterBy, setFilterBy] = useState('all'); // 'all', 'best-seller', 'new-arrival'
    const [sortBy, setSortBy] = useState('Recommended');
    const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
    const [selectedConcerns, setSelectedConcerns] = useState([]);
    const [maxPrice, setMaxPrice] = useState(100000);

    const skinTypes = ['Normal', 'Oily', 'Dry', 'Sensitive', 'Combination'];
    const concerns = ['Anti-Aging', 'Hydration', 'Brightening', 'Acne'];

    const handleSkinTypeChange = (type) => {
        setSelectedSkinTypes(prev => 
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleConcernChange = (concern) => {
        setSelectedConcerns(prev => 
            prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern]
        );
    };

    // Helper function to normalize category strings safely
    const normalizeCategory = (cat) => 
        cat ? String(cat).toLowerCase().trim().replace(/%20|-/g, ' ') : '';

    useEffect(() => {
        setLoading(true);
        
        let filtered = [...products];

        // 1. Fixed Category Matching (Safe normalization for spaces, hyphens, & casing)
        if (categoryName && normalizeCategory(categoryName) !== 'all') {
            const normalizedParam = normalizeCategory(categoryName);
            filtered = filtered.filter(p => {
                if (!p.category) return false;
                const normalizedProdCat = normalizeCategory(p.category);
                return (
                    normalizedProdCat === normalizedParam ||
                    normalizedProdCat.includes(normalizedParam) ||
                    normalizedParam.includes(normalizedProdCat)
                );
            });
        }

        // 2. Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(p => 
                (p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // 3. Filter by Best Seller / New Arrival
        if (filterBy === 'best-seller') {
            filtered = filtered.filter(p => p.isBestSeller);
        } else if (filterBy === 'new-arrival') {
            filtered = filtered.filter(p => p.isNew);
        }

        // 4. Filter by Skin Type
        if (selectedSkinTypes.length > 0) {
            filtered = filtered.filter(p => 
                p.skinType && selectedSkinTypes.some(type => p.skinType.includes(type))
            );
        }

        // 5. Filter by Concern
        if (selectedConcerns.length > 0) {
            filtered = filtered.filter(p => 
                p.benefits && selectedConcerns.some(concern => p.benefits.toLowerCase().includes(concern.toLowerCase()))
            );
        }

        // 6. Filter by Price
        filtered = filtered.filter(p => parsePrice(p.price) <= maxPrice);

        // 7. Sort
        if (sortBy === 'Price: Low to High') {
            filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        } else if (sortBy === 'Price: High to Low') {
            filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        }

        setCategoryProducts(filtered);
        setLoading(false);
        window.scrollTo(0, 0);
    }, [categoryName, searchQuery, products, filterBy, sortBy, selectedSkinTypes, selectedConcerns, maxPrice, parsePrice]);

    const displayTitle = !categoryName || categoryName === 'all' ? 'All Products' : categoryName;

    return (
        <div className="category-page">
            <div className="container">
                <header className="category-header text-center">
                    <h1 className="category-main-title serif text-magenta">{displayTitle}</h1>
                    <p className="category-subtitle">
                        Discover our collection of petal-soft essentials designed to illuminate your natural identity.
                    </p>
                </header>

                <div className="category-controls">
                    <div className="filter-pills">
                        <span className="control-label">FILTER BY:</span>
                        <button 
                            className={`pill-btn ${filterBy === 'all' ? 'active' : ''}`}
                            onClick={() => setFilterBy('all')}
                        >
                            All
                        </button>
                        <button 
                            className={`pill-btn ${filterBy === 'best-seller' ? 'active' : ''}`}
                            onClick={() => setFilterBy('best-seller')}
                        >
                            Best Sellers
                        </button>
                        <button 
                            className={`pill-btn ${filterBy === 'new-arrival' ? 'active' : ''}`}
                            onClick={() => setFilterBy('new-arrival')}
                        >
                            New Arrivals
                        </button>
                    </div>
                    <div className="sort-control">
                        <span className="control-label">SORT:</span>
                        <select 
                            className="minimal-select" 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option>Recommended</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="category-layout">
                    <aside className="category-sidebar">
                        <div className="sidebar-group">
                            <h3 className="sidebar-title text-magenta">Categories</h3>
                            <div className="category-links-list">
                                <Link 
                                    to="/category/all" 
                                    className={`cat-sidebar-link ${!categoryName || categoryName === 'all' ? 'active' : ''}`}
                                >
                                    All Products
                                </Link>
                                {categories.map((cat, idx) => {
                                    const name = cat.name || cat.category;
                                    return (
                                        <Link 
                                            key={cat.id || idx}
                                            to={`/category/${encodeURIComponent(name)}`} 
                                            className={`cat-sidebar-link ${normalizeCategory(categoryName) === normalizeCategory(name) ? 'active' : ''}`}
                                        >
                                            {name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="sidebar-group">
                            <h3 className="sidebar-title text-magenta">Skin Type</h3>
                            <div className="checkbox-list">
                                {skinTypes.map(type => (
                                    <label key={type} className={`custom-checkbox ${selectedSkinTypes.includes(type) ? 'active' : ''}`}>
                                        <input 
                                            type="checkbox" 
                                            checked={selectedSkinTypes.includes(type)}
                                            onChange={() => handleSkinTypeChange(type)}
                                        /> 
                                        <span className="checkmark"></span> {type}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="sidebar-group">
                            <h3 className="sidebar-title text-magenta">Concern</h3>
                            <div className="checkbox-list">
                                {concerns.map(concern => (
                                    <label key={concern} className={`custom-checkbox ${selectedConcerns.includes(concern) ? 'active' : ''}`}>
                                        <input 
                                            type="checkbox" 
                                            checked={selectedConcerns.includes(concern)}
                                            onChange={() => handleConcernChange(concern)}
                                        /> 
                                        <span className="checkmark"></span> {concern}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="sidebar-group">
                            <h3 className="sidebar-title text-magenta">Price Range</h3>
                            <div className="price-slider-wrapper">
                                <input 
                                    type="range" 
                                    min="200" 
                                    max="100000" 
                                    step="500"
                                    value={maxPrice} 
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="styled-range" 
                                />
                                <div className="price-range-labels">
                                    <span>Rs 200</span>
                                    <span className="current-range">Rs {maxPrice}</span>
                                    <span>Rs 100,000+</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main className="category-products-area">
                        {loading || productsLoading ? (
                            <div className="loading-state">Loading the glow...</div>
                        ) : categoryProducts.length === 0 ? (
                            <div className="no-results-container">
                                <p className="no-results">No products found matching your criteria in "{displayTitle}".</p>
                                <button className="clear-filters-btn" onClick={() => {
                                    setFilterBy('all');
                                    setSelectedSkinTypes([]);
                                    setSelectedConcerns([]);
                                    setMaxPrice(100000); // Fixed: Resets to full price range
                                }}>Clear All Filters</button>
                            </div>
                        ) : (
                            <>
                                <p className="results-count">{categoryProducts.length} products found</p>
                                <div className="shop-products-grid">
                                    {categoryProducts.map((product) => (
                                        <ProductCard key={product._id || product.id} product={product} variant="shop" />
                                    ))}
                                </div>
                            </>
                        )}

                        <div className="pagination">
                            <button className="page-arrow"><ChevronLeft size={16} /></button>
                            <button className="page-num active">1</button>
                            <button className="page-num">2</button>
                            <button className="page-num">3</button>
                            <button className="page-arrow"><ChevronRight size={16} /></button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;