import React, { useState, useEffect } from "react";
import "./Cart.css";
import { useShop } from "../context/ShopContext";
import { useNavigate, Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const CartTable = () => {
  const { cartItems, removeFromCart, updateQuantity } = useShop();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });

  // WhatsApp configuration
  const phoneNumber = '03139884980'; // Same as WhatsAppButton.jsx

  // Helper to parse price string like "Rs 2999" to number 2999
  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (!price) return 0;
    const cleanPrice = String(price).replace(/[^0-9.]/g, '');
    return Number(cleanPrice) || 0;
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (parsePrice(item.price) * item.quantity), 0);

  // Open the form modal
  const openFormModal = () => {
    if (cartItems.length === 0) return;
    setShowForm(true);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showForm]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill in all required fields");
      return;
    }

    let message = "🛒 *NEW ORDER FROM WEBSITE*\n\n";
    message += "📦 *Order Details:*\n";
    message += "─────────────────\n";

    cartItems.forEach((item, index) => {
      const itemTotal = parsePrice(item.price) * item.quantity;
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Price: Rs ${parsePrice(item.price)} × ${item.quantity}\n`;
      message += `   Subtotal: Rs ${itemTotal}\n\n`;
    });

    message += "─────────────────\n";
    message += `💰 *Total Amount: Rs ${subtotal}*\n\n`;

    message += "📍 *Customer Information:*\n";
    message += `• Name: ${formData.fullName}\n`;
    message += `• Email: ${formData.email}\n`;
    message += `• Phone: ${formData.phone}\n`;
    message += `• Address: ${formData.address}\n\n`;

    message += "Please confirm my order. 😊";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setShowForm(false);
    setFormData({ fullName: "", email: "", phone: "", address: "" });
  };

  const orderViaWhatsApp = () => {
    openFormModal();
  };

  const increaseQty = (id, currentQty) => {
    updateQuantity(id, currentQty + 1);
  };

  const decreaseQty = (id, currentQty) => {
    if (currentQty > 1) {
      updateQuantity(id, currentQty - 1);
    }
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  return (
    <>
      <div className="cart-page container">
        <h1 className="page-title text-center serif">Your Luminous Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart text-center">
            <p>Your cart is currently empty.</p>
            <Link to="/category/all" className="btn-primary">CONTINUE SHOPPING</Link>
          </div>
        ) : (
          <div className="cart-content">
            <table className="cart-table-premium">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="cart-item-row">
                    <td className="product-cell">
                      <div className="item-info">
                        <div className="item-image glass">
                          <img src={item.image || item.img} alt={item.name} />
                        </div>
                        <div className="item-details">
                          <h4 className="item-name">{item.name}</h4>
                          <span className="item-category">{item.category || 'SKINCARE'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="price-cell">Rs {parsePrice(item.price)}</td>
                    <td className="quantity-cell">
                      <div className="qty-selector">
                        <button onClick={() => decreaseQty(item.id, item.quantity)}><Minus size={14} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQty(item.id, item.quantity)}><Plus size={14} /></button>
                      </div>
                    </td>
                    <td className="total-cell">Rs {parsePrice(item.price) * item.quantity}</td>
                    <td className="action-cell">
                      <button className="btn-remove" onClick={() => removeItem(item.id)}>
                        <Trash2 size={20} strokeWidth={1.5} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-summary-box glass">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>Rs {subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>Rs {subtotal}</span>
              </div>
              <button className="btn-primary full-width" onClick={orderViaWhatsApp}>
                ORDER VIA WHATSAPP
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Customer Details Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div 
              className="modal-content premium-modal"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h3 className="serif text-magenta">Complete Order</h3>
                  <p className="modal-subtitle">Secure your glow ritual via WhatsApp concierge.</p>
                </div>
                <button className="modal-close" onClick={() => setShowForm(false)}>&times;</button>
              </div>

              <div className="modal-body">
                <div className="mini-order-summary glass">
                  <h4 className="summary-title">Order Summary</h4>
                  <div className="summary-scroll">
                    {cartItems.map(item => (
                      <div key={item.id} className="summary-item">
                        <span>{item.name} x {item.quantity}</span>
                        <span>Rs {parsePrice(item.price) * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="summary-total-row">
                    <span>Total Amount</span>
                    <span className="text-magenta">Rs {subtotal}</span>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className="customer-form premium-form">
                  <div className="form-row">
                    <div className="form-field">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Sarah J."
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row split">
                    <div className="form-field">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="0300-1234567"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Delivery Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street, City, Area"
                      rows="2"
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      className="btn-submit whatsapp-glow"
                    >
                      <svg
                        className="whatsapp-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      CONFIRM ORDER VIA WHATSAPP
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartTable;
