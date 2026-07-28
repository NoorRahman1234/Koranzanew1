import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, ClipboardList, HelpCircle, LogOut, Package, Gift, Sparkles, Check, ChevronRight, ShoppingBag } from 'lucide-react';
import './Notifications.css';

const Notifications = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Orders', 'Offers', 'Rituals'];

    const notifications = [
        {
            id: 1,
            type: 'ORDER UPDATE',
            title: 'Your Radiance Glow Serum is out for delivery! 🚚',
            description: 'Estimated arrival: Today by 5:00 PM',
            time: '2 hours ago',
            icon: <Package size={20} />,
            category: 'Orders',
            unread: true
        },
        {
            id: 2,
            type: 'SPECIAL OFFER',
            title: 'Exclusive: 15% off your next ritual with code GLOW15 🌸',
            description: 'Treat yourself to the care you deserve. Valid for 48 hours.',
            time: '5 hours ago',
            icon: <Gift size={20} />,
            category: 'Offers',
            unread: false
        },
        {
            id: 3,
            type: 'RITUAL REMINDER',
            title: 'Time for your Evening Serenity Flow. Ready to glow? ✨',
            time: '1 day ago',
            icon: <Sparkles size={20} />,
            category: 'Rituals',
            actions: true,
            unread: false
        },
        {
            id: 4,
            type: 'NEW ARRIVAL',
            title: 'New Arrival: Silk Sleep Mask in Champagne Pink is now available.',
            description: 'Protect your beauty sleep with our most luxurious accessory yet.',
            time: '2 days ago',
            icon: <ShoppingBag size={20} />,
            category: 'Offers',
            image: 'https://images.pexels.com/photos/8459356/pexels-photo-8459356.jpeg',
            unread: false
        }
    ];

    const filteredNotifications = activeFilter === 'All' 
        ? notifications 
        : notifications.filter(n => n.category === activeFilter);

    return (
        <div className="notifications-page">
            <div className="dashboard-container">
                {/* SIDEBAR */}
                <aside className="dashboard-sidebar">
                    <div className="user-profile">
                        <div className="user-avatar">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="User" />
                        </div>
                        <div className="user-details">
                            <h3>Welcome, Khan</h3>
                            <p>Premium Member</p>
                        </div>
                    </div>

                    <nav className="sidebar-nav">
                        <div className="nav-group">
                            <Link to="/account" className="nav-item">
                                <Settings size={18} />
                                <span>Account Settings</span>
                            </Link>
                            <Link to="/orders" className="nav-item">
                                <ClipboardList size={18} />
                                <span>Order History</span>
                            </Link>
                        </div>

                        <div className="nav-group bottom">
                            <Link to="/support" className="nav-item">
                                <HelpCircle size={18} />
                                <span>Support</span>
                            </Link>
                            <Link to="/auth" className="nav-item">
                                <LogOut size={18} />
                                <span>Sign Out</span>
                            </Link>
                        </div>
                    </nav>
                </aside>

                {/* MAIN CONTENT */}
                <main className="dashboard-content">
                    <div className="content-header">
                        <div className="header-left">
                            <div className="breadcrumbs">
                                <span>DASHBOARD</span>
                                <ChevronRight size={12} />
                                <span className="active">NOTIFICATIONS</span>
                            </div>
                            <h1 className="content-title serif">Notifications</h1>
                        </div>
                        <button className="mark-read-btn">
                            <Check size={16} />
                            Mark all as read
                        </button>
                    </div>

                    <div className="filter-pills">
                        {filters.map(filter => (
                            <button 
                                key={filter} 
                                className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="notifications-list">
                        {filteredNotifications.map(notification => (
                            <div key={notification.id} className="notification-card">
                                <div className={`notif-icon-box type-${notification.category.toLowerCase()}`}>
                                    {notification.icon}
                                </div>
                                <div className="notif-body">
                                    <div className="notif-top">
                                        <span className="notif-type">{notification.type}</span>
                                        <div className="notif-time-status">
                                            <span className="notif-time">{notification.time}</span>
                                            {notification.unread && <span className="unread-dot"></span>}
                                        </div>
                                    </div>
                                    <h4 className="notif-title">{notification.title}</h4>
                                    {notification.description && <p className="notif-desc">{notification.description}</p>}
                                    
                                    {notification.actions && (
                                        <div className="notif-actions">
                                            <button className="btn-primary-small">Start Ritual</button>
                                            <button className="btn-secondary-small">Snooze</button>
                                        </div>
                                    )}
                                </div>
                                {notification.image && (
                                    <div className="notif-image">
                                        <img src={notification.image} alt="Notification" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="load-more">
                        <button className="btn-view-older">View Older Notifications</button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Notifications;
