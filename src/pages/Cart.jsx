

import React, { useState, useEffect } from "react";
import "./Cart.css";
import { useShop } from "../context/ShopContext";
import { useNavigate, Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { orderAPI , paymentAPI  } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

const CartTable = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useShop();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState({
  //   fullName: "",
  //   email: "",
  //   phone: "",
  //   address: "",
  //   orderDate: new Date().toISOString().split("T")[0] // Default to today's date
  // });

  const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  address: "",
  orderDate: new Date().toISOString().split("T")[0],
  paymentMethod: "Cash on Delivery"
});

  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (!price) return 0;
    const cleanPrice = String(price).replace(/[^0-9.]/g, '');
    return Number(cleanPrice) || 0;
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (parsePrice(item.price) * item.quantity), 0);

  const openFormModal = () => {
    if (cartItems.length === 0) return;
    setShowForm(true);
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.orderDate) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    const orderData = {
      customer: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      date: formData.orderDate,
      total: subtotal,
      status: "Pending",
      items: cartItems.map(item => ({
        product: item.name,
        quantity: item.quantity,
        price: parsePrice(item.price)
      }))
    };

    try {
      const response = await orderAPI.create(orderData);

      if (response.success) {



        const createdOrder = response.data;

const paymentData = {
  orderId: createdOrder.id,
  customer: formData.fullName,
  email: formData.email,
  amount: subtotal,
  method: formData.paymentMethod,
  status: "Pending"
};

await paymentAPI.create(paymentData);



        alert("Order placed successfully!");
        setShowForm(false);
        setFormData({ 
          fullName: "", 
          email: "", 
          phone: "", 
          address: "", 
          orderDate: new Date().toISOString().split("T")[0] 
        });
        clearCart();
        navigate("/");
      } else {
        alert(response.message || "Failed to place order.");
      }
    } catch (error) {
      console.error("Order submit error:", error);
      alert("Failed to submit order. Check backend connection.");
    } finally {
      setLoading(false);
    }
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
              <button className="btn-primary full-width" onClick={openFormModal}>
                ORDER
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
                  <p className="modal-subtitle">Enter your details to confirm your order.</p>
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
                  <div className="form-row split">
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
                    <div className="form-field">
                      <label>Preferred Delivery Date *</label>
                      <input
                        type="date"
                        name="orderDate"
                        value={formData.orderDate}
                        onChange={handleInputChange}
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













                    {/* <div className="form-field">
  <label>Payment Method *</label>

  <select
    name="paymentMethod"
    value={formData.paymentMethod}
    onChange={handleInputChange}
    required
  >
    <option value="Cash on Delivery">Cash on Delivery</option>
    <option value="JazzCash">JazzCash</option>
    <option value="Easypaisa">Easypaisa</option>
    <option value="Bank Transfer">Bank Transfer</option>
    <option value="Raast">Raast</option>
  </select>
</div> */}



                  <div className="form-actions">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      className="btn-submit"
                      disabled={loading}
                    >
                      {loading ? "SUBMITTING..." : "CONFIRM ORDER"}
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







