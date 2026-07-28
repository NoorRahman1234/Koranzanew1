import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, Bell, LogOut, Settings, ClipboardList, HelpCircle, Phone, Mail } from 'lucide-react';
import './AccountSettings.css';

const AccountSettings = () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);

    return (
        <div className="account-settings-container">
            <div className="account-settings-layout">
                {/* Sidebar */}
                <aside className="account-sidebar">
                    <div className="user-profile-summary">
                        <div className="avatar-wrapper">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Khan" alt="User Avatar" />
                        </div>
                        <div className="user-info">
                            <h3>Welcome, Khan</h3>
                            <p>Premium Member</p>
                        </div>
                    </div>

                    <nav className="sidebar-nav">
                        <Link to="/account" className="nav-item active">
                            <Settings size={20} />
                            <span>Account Settings</span>
                        </Link>
                        <Link to="/notifications" className="nav-item">
                            <ClipboardList size={20} />
                            <span>Order History</span>
                        </Link>
                    </nav>

                    <div className="sidebar-footer">
                        <Link to="/support" className="nav-item">
                            <HelpCircle size={20} />
                            <span>Support</span>
                        </Link>
                        <Link to="/auth" className="nav-item sign-out">
                            <LogOut size={20} />
                            <span>Sign Out</span>
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="account-main-content">
                    <header className="account-content-header">
                        <h1 className="serif">Account Settings</h1>
                        <p>Curate your personal ritual space and security preferences.</p>
                    </header>

                    <div className="account-settings-sections">
                        {/* Profile Information */}
                        <section className="settings-card">
                            <div className="card-header">
                                <User className="section-icon" size={24} />
                                <h2>Profile Information</h2>
                            </div>
                            <div className="card-body">
                                <div className="input-grid">
                                    <div className="input-group">
                                        <label>Full Name</label>
                                        <input type="text" defaultValue="Khan" />
                                    </div>
                                    <div className="input-group">
                                        <label>Email Address</label>
                                        <input type="email" defaultValue="aura.glow@luminous.com" />
                                    </div>
                                    <div className="input-group">
                                        <label>Phone Number</label>
                                        <input type="text" defaultValue="+92 3000000000" />
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <button className="btn-save">Save Changes</button>
                                </div>
                            </div>
                        </section>

                        {/* Security & Credentials */}
                        <section className="settings-card">
                            <div className="card-header">
                                <Lock className="section-icon" size={24} />
                                <h2>Security & Credentials</h2>
                            </div>
                            <div className="card-body">
                                <div className="input-stack">
                                    <div className="input-group">
                                        <label>Current Password</label>
                                        <input type="password" defaultValue="**********" />
                                    </div>
                                    <div className="input-group">
                                        <label>New Password</label>
                                        <input type="password" placeholder="Enter new password" />
                                    </div>
                                    <div className="input-group">
                                        <label>Confirm New Password</label>
                                        <input type="password" placeholder="Confirm new password" />
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <button className="btn-save">Update Password</button>
                                </div>
                            </div>
                        </section>

                        {/* Korenza Preferences */}
                        <section className="settings-card">
                            <div className="card-header">
                                <Bell className="section-icon" size={24} />
                                <h2>Korenza Preferences</h2>
                            </div>
                            <div className="card-body">
                                <div className="preference-item">
                                    <div className="preference-info">
                                        <h3>Email Notifications</h3>
                                        <p>Stay updated with skincare tips and order status.</p>
                                        <div className="checkbox-group">
                                            <label className="account-checkbox-container">
                                                <input type="checkbox" defaultChecked />
                                                <span className="account-checkmark"></span>
                                                Exclusive Newsletters & Pre-orders
                                            </label>
                                            <label className="account-checkbox-container">
                                                <input type="checkbox" defaultChecked />
                                                <span className="account-checkmark"></span>
                                                Order & Shipping Updates
                                            </label>
                                        </div>
                                    </div>
                                    <div className="toggle-switch">
                                        <input 
                                            type="checkbox" 
                                            id="email-toggle" 
                                            checked={emailNotifications}
                                            onChange={() => setEmailNotifications(!emailNotifications)}
                                        />
                                        <label htmlFor="email-toggle"></label>
                                    </div>
                                </div>

                                <div className="divider"></div>

                                <div className="preference-item">
                                    <div className="preference-info">
                                        <h3>SMS Notifications</h3>
                                        <p>Real-time alerts for delivery and flash arrivals.</p>
                                    </div>
                                    <div className="toggle-switch">
                                        <input 
                                            type="checkbox" 
                                            id="sms-toggle" 
                                            checked={smsNotifications}
                                            onChange={() => setSmsNotifications(!smsNotifications)}
                                        />
                                        <label htmlFor="sms-toggle"></label>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Deactivate Account */}
                        <div className="deactivate-section">
                            <h3>Deactivate Account</h3>
                            <p>Permanently remove your data and ritual history. This action cannot be undone.</p>
                            <button className="btn-delete">Delete Account</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AccountSettings;
