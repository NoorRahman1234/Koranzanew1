
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Lock,
  Bell,
  LogOut,
  Settings,
  ClipboardList,
  HelpCircle,
} from 'lucide-react';
import './AccountSettings.css';


const AccountSettings = () => {

  const navigate = useNavigate();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const [user, setUser] = useState({
    fullName: '',
    email: '',
    phone: '',
  });





const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});





  const [selectedImage, setSelectedImage] = useState(null);


  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));

    console.log('Saved User:', savedUser);

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleProfileUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const formData = new FormData();
  formData.append("profileImage", file);

  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      "http://localhost:3000/api/auth/upload-profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const updatedUser = {
      ...user,
      profileImage: response.data.profileImage,
    };

    setUser(updatedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert("Profile image uploaded successfully!");

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Upload failed"
    );
  }
};

  const handleDeleteAccount = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete your account?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      "http://localhost:3000/api/auth/delete-account",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Account deleted successfully.");

    navigate("/");
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to delete account."
    );
  }
};



const handleUpdatePassword = async () => {
  if (
    !passwordData.currentPassword ||
    !passwordData.newPassword ||
    !passwordData.confirmPassword
  ) {
    alert("Please fill all fields.");
    return;
  }

  if (passwordData.newPassword !== passwordData.confirmPassword) {
    alert("New password and confirm password do not match.");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      "http://localhost:3000/api/auth/change-password",
      {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to update password."
    );
  }
};






  return (
    <div className="account-settings-container">
      <div className="account-settings-layout">

        {/* Sidebar */}
        <aside className="account-sidebar">
          <div className="user-profile-summary">
            

<div className="avatar-wrapper">

  <label htmlFor="profileImage" style={{ cursor: "pointer" }}>
    <img
      src={
        user.profileImage
          ? `http://localhost:3000${user.profileImage}`
          : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.fullName || "Guest"}`
      }
      alt="Profile"
    />
  </label>

  <input
    type="file"
    id="profileImage"
    accept="image/*"
    onChange={handleProfileUpload}
    style={{ display: "none" }}
  />

</div>












            <div className="user-info">
              <h3>Welcome, {user.fullName || 'Guest'}</h3>
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

            {/* Profile */}
            <section className="settings-card">
              <div className="card-header">
                <User className="section-icon" size={24} />
                <h2>Profile Information</h2>
              </div>

              <div className="card-body">
                <div className="input-grid">

                  <div className="input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={user.fullName}
                      readOnly
                    />
                  </div>

                  <div className="input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                    />
                  </div>

                  <div className="input-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={user.phone || ''}
                      placeholder="No phone number"
                      readOnly
                    />
                  </div>

                </div>

                <div className="card-actions">
                  <button className="btn-save">
                    Save Changes
                  </button>
                </div>
              </div>
            </section>

            {/* Security */}
            <section className="settings-card">
              <div className="card-header">
                <Lock className="section-icon" size={24} />
                <h2>Security & Credentials</h2>
              </div>

              <div className="card-body">
                <div className="input-stack">

                  <div className="input-group">
                    <label>Current Password</label>
                    {/* <input
                      type="password"
                      defaultValue="********"
                    /> */}


                    <input
                        type="password"
                         placeholder="Enter current password"
                        value={passwordData.currentPassword}
                         onChange={(e) =>
                          setPasswordData({
                           ...passwordData,
                           currentPassword: e.target.value,
                            })
                           }
                              />
                  </div>

                  <div className="input-group">
                    <label>New Password</label>
                    {/* <input
                      type="password"
                      placeholder="Enter new password"
                    /> */}



                      <input
  type="password"
  placeholder="Enter new password"
  value={passwordData.newPassword}
  onChange={(e) =>
    setPasswordData({
      ...passwordData,
      newPassword: e.target.value,
    })
  }
/>


                  </div>

                  <div className="input-group">
                    <label>Confirm New Password</label>
                    {/* <input
                      type="password"
                      placeholder="Confirm new password"
                    /> */}

                      <input
  type="password"
  placeholder="Confirm new password"
  value={passwordData.confirmPassword}
  onChange={(e) =>
    setPasswordData({
      ...passwordData,
      confirmPassword: e.target.value,
    })
  }
/>



                  </div>

                </div>

                <div className="card-actions">
                  {/* <button className="btn-save">
                    Update Password
                  </button> */}

                    <button
  className="btn-save"
  onClick={handleUpdatePassword}
>
  Update Password
</button>




                </div>
              </div>
            </section>

            {/* Preferences */}
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
                  </div>

                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      id="email-toggle"
                      checked={emailNotifications}
                      onChange={() =>
                        setEmailNotifications(!emailNotifications)
                      }
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
                      onChange={() =>
                        setSmsNotifications(!smsNotifications)
                      }
                    />
                    <label htmlFor="sms-toggle"></label>
                  </div>
                </div>

              </div>
            </section>

            {/* Delete */}
            <div className="deactivate-section">
              <h3>Deactivate Account</h3>

              <p>
                Permanently remove your data and ritual history.
                This action cannot be undone.
              </p>

             <button
             className="btn-delete"
                onClick={handleDeleteAccount}
>
                 Delete Account
                </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountSettings;