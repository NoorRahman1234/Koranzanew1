

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useShop } from "../context/ShopContext";
// import { orderAPI } from "../services/api";
// import "./Checkout.css";

// const Checkout = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { cartItems, clearCart } = useShop();
//     const [orderItems, setOrderItems] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (location.state?.product) {
//             setOrderItems([location.state.product]);
//         } else if (location.state?.fromCart) {
//             setOrderItems(cartItems);
//         } else {
//             setOrderItems(cartItems);
//         }
//     }, [location.state, cartItems]);

//     const parsePrice = (price) => {
//         if (typeof price === 'number') return price;
//         if (!price) return 0;
//         const cleanPrice = String(price).replace(/[^0-9.]/g, '');
//         return Number(cleanPrice) || 0;
//     };

//     const subtotal = orderItems.reduce((acc, item) => acc + (parsePrice(item.price) * (item.quantity || 1)), 0);
//     const shipping = 60;
//     const total = subtotal + shipping;

//     const handleContinue = async (e) => {
//         e.preventDefault();

//         if (orderItems.length === 0) {
//             alert("Your cart is empty!");
//             return;
//         }

//         setLoading(true);

//         const formData = new FormData(e.target);
//         const email = formData.get("email");
//         const firstName = formData.get("firstName");
//         const lastName = formData.get("lastName");
//         const address = formData.get("address");
//         const city = formData.get("city");
//         const postalCode = formData.get("postalCode");
//         const phone = formData.get("phone");

//         const orderData = {
//             customer: `${firstName} ${lastName}`,
//             email,
//             phone,
//             address,
//             city,
//             postalCode,
//             total,
//             status: "Pending",
//             items: orderItems.map(item => ({
//                 product: item.name,
//                 quantity: item.quantity || 1,
//                 price: parsePrice(item.price),
//             })),
//         };

//         try {
//             const response = await orderAPI.create(orderData);

//             if (response.success) {
//                 alert("Order placed successfully!");
//                 clearCart();
//                 navigate("/");
//             } else {
//                 alert(response.message || "Failed to place order.");
//             }
//         } catch (err) {
//             console.error("Order submission error:", err);
//             alert("Failed to place order. Check server connection.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="checkout-page container">
//             <h1 className="page-title">Complete Your Ritual</h1>

//             <div className="checkout-layout">
//                 <main className="checkout-form-area">
//                     <form className="checkout-form" onSubmit={handleContinue}>
//                         <section className="form-section">
//                             <h3>CONTACT INFORMATION</h3>
//                             <div className="form-field">
//                                 <label>Email Address</label>
//                                 <input type="email" name="email" placeholder="email@example.com" required />
//                             </div>
//                         </section>

//                         <section className="form-section">
//                             <h3>SHIPPING DETAILS</h3>
//                             <div className="input-row">
//                                 <div className="form-field half">
//                                     <label>First Name</label>
//                                     <input type="text" name="firstName" placeholder="First Name" required />
//                                 </div>
//                                 <div className="form-field half">
//                                     <label>Last Name</label>
//                                     <input type="text" name="lastName" placeholder="Last Name" required />
//                                 </div>
//                             </div>
//                             <div className="form-field">
//                                 <label>Delivery Address</label>
//                                 <input type="text" name="address" placeholder="Street Address" required />
//                             </div>
//                             <div className="input-row">
//                                 <div className="form-field half">
//                                     <label>City</label>
//                                     <input type="text" name="city" placeholder="City" required />
//                                 </div>
//                                 <div className="form-field half">
//                                     <label>Postal Code</label>
//                                     <input type="text" name="postalCode" placeholder="Postal Code" />
//                                 </div>
//                             </div>
//                             <div className="form-field">
//                                 <label>Phone Number</label>
//                                 <input type="tel" name="phone" placeholder="+92 3XX XXXXXXX" required />
//                             </div>
//                         </section>

//                         <button type="submit" className="btn-primary full-width" disabled={loading}>
//                             {loading ? "PLACING ORDER..." : "PLACE ORDER"}
//                         </button>
//                     </form>
//                 </main>

//                 <aside className="order-summary-sidebar glass">
//                     <h3>ORDER SUMMARY</h3>
//                     <div className="summary-items">
//                         {orderItems.map((item, index) => (
//                             <div key={index} className="summary-item">
//                                 <div className="item-img-mini glass">
//                                     <img src={item.image || item.img} alt={item.name} />
//                                 </div>
//                                 <div className="item-info-mini">
//                                     <p className="item-name-mini">{item.name}</p>
//                                     <p className="item-price-mini">PKR {parsePrice(item.price)}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="summary-footer">
//                         <div className="summary-line">
//                             <span>Subtotal</span>
//                             <span>PKR {subtotal}</span>
//                         </div>
//                         <div className="summary-line">
//                             <span>Shipping</span>
//                             <span>PKR {shipping}</span>
//                         </div>
//                         <div className="summary-total-line">
//                             <span>Total</span>
//                             <span>PKR {total}</span>
//                         </div>
//                     </div>
//                 </aside>
//             </div>
//         </div>
//     );
// };

// export default Checkout;








import React, { useState } from 'react';
import axios from 'axios';

const Checkout = ({ cartItems, totalAmount, user }) => {
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Prepare the payload matching your database schema
    const newOrder = {
      customerName: user ? user.name : "John Doe",
      items: cartItems, // Array of products [{ productName: "Premium Watch", quantity: 1, price: 250 }]
      totalAmount: totalAmount,
      status: "Pending"
    };

    try {
      // 2. Post the order to your Node.js backend
      const res = await axios.post('http://localhost:5000/api/orders', newOrder);

      if (res.data.success) {
        alert("Order placed successfully!");
        // Clear cart or redirect to success page here
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Something went wrong while placing your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <button onClick={handlePlaceOrder} disabled={loading}>
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;