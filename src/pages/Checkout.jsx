import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "./Checkout.css";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems } = useShop();
    const [orderItems, setOrderItems] = useState([]);
    const [step, setStep] = useState(1); // 1 = Details, 2 = Payment

    // WhatsApp configuration
    const phoneNumber = '923005822788';

    // Determine what we are checking out
    useEffect(() => {
        if (location.state?.product) {
            setOrderItems([location.state.product]);
        } else if (location.state?.fromCart) {
            setOrderItems(cartItems);
        } else {
            // Fallback
            setOrderItems(cartItems);
        }
    }, [location.state, cartItems]);

    // Helper to parse price string like "Rs 2999" to number 2999
    const parsePrice = (price) => {
        if (typeof price === 'number') return price;
        if (!price) return 0;
        // Remove all non-numeric characters except dot
        const cleanPrice = String(price).replace(/[^0-9.]/g, '');
        return Number(cleanPrice) || 0;
    };

    const subtotal = orderItems.reduce((acc, item) => acc + (parsePrice(item.price) * (item.quantity || 1)), 0);
    const shipping = 60; // Hardcoded
    const total = subtotal + shipping;

    const handleContinue = (e) => {
        e.preventDefault();

        // Get form data
        const form = e.target;
        const email = form.querySelector('input[placeholder="Email or mobile phone number"]')?.value || '';
        const country = form.querySelector('input[placeholder="Country/Region"]')?.value || '';
        const firstName = form.querySelector('input[placeholder="First name"]')?.value || '';
        const lastName = form.querySelector('input[placeholder="Last name"]')?.value || '';
        const address = form.querySelector('input[placeholder="Address"]')?.value || '';
        const city = form.querySelector('input[placeholder="City"]')?.value || '';
        const postalCode = form.querySelector('input[placeholder="Postal code"]')?.value || '';
        const phoneNumber_form = form.querySelector('input[placeholder="Phone number"]')?.value || '';

        // Validate required fields
        if (!email || !firstName || !lastName || !address || !city || !phoneNumber_form) {
            alert("Please fill in all required fields (Email, Name, Address, City, Phone)");
            return;
        }

        // Build the WhatsApp message
        let message = "🛒 *NEW ORDER FROM WEBSITE*\n\n";
        message += "📦 *Order Details:*\n";
        message += "─────────────────\n";

        orderItems.forEach((item, index) => {
            const itemTotal = parsePrice(item.price) * (item.quantity || 1);
            message += `${index + 1}. *${item.name}*\n`;
            message += `   Price: Rs ${parsePrice(item.price)} × ${item.quantity || 1}\n`;
            message += `   Subtotal: Rs ${itemTotal}\n\n`;
        });

        message += "─────────────────\n";
        message += `💰 *Subtotal: Rs ${subtotal}*\n`;
        message += `🚚 *Shipping: Rs ${shipping}*\n`;
        message += `💵 *Total Amount: Rs ${total}*\n\n`;

        message += "📍 *Customer Information:*\n";
        message += `• Name: ${firstName} ${lastName}\n`;
        message += `• Email: ${email}\n`;
        message += `• Phone: ${phoneNumber_form}\n`;
        message += `• Address: ${address}, ${city}${postalCode ? ' ' + postalCode : ''}\n`;
        if (country) message += `• Country: ${country}\n`;

        message += "\nPlease confirm my order. 😊";

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleBack = () => {
        setStep(1);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        alert(`Order Placed Successfully! Total: Rs ${total}`);
        navigate("/");
    };

    return (
        <div className="checkout-page container">
            <h1 className="page-title">Complete Your Ritual</h1>

            <div className="checkout-layout">
                <main className="checkout-form-area">
                    <form className="checkout-form" onSubmit={handleContinue}>
                        <section className="form-section">
                            <h3>CONTACT INFORMATION</h3>
                            <div className="form-field">
                                <label>Email Address</label>
                                <input type="email" placeholder="email@example.com" required />
                            </div>
                        </section>

                        <section className="form-section">
                            <h3>SHIPPING DETAILS</h3>
                            <div className="input-row">
                                <div className="form-field half">
                                    <label>First Name</label>
                                    <input type="text" placeholder="First Name" required />
                                </div>
                                <div className="form-field half">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="Last Name" required />
                                </div>
                            </div>
                            <div className="form-field">
                                <label>Delivery Address</label>
                                <input type="text" placeholder="Street Address" required />
                            </div>
                            <div className="input-row">
                                <div className="form-field half">
                                    <label>City</label>
                                    <input type="text" placeholder="City" required />
                                </div>
                                <div className="form-field half">
                                    <label>Postal Code</label>
                                    <input type="text" placeholder="Postal Code" />
                                </div>
                            </div>
                            <div className="form-field">
                                <label>Phone Number</label>
                                <input type="tel" placeholder="+92 3XX XXXXXXX" required />
                            </div>
                        </section>

                        <button type="submit" className="btn-primary full-width">
                            CONFIRM VIA WHATSAPP
                        </button>
                    </form>
                </main>

                <aside className="order-summary-sidebar glass">
                    <h3>ORDER SUMMARY</h3>
                    <div className="summary-items">
                        {orderItems.map((item, index) => (
                            <div key={index} className="summary-item">
                                <div className="item-img-mini glass">
                                    <img src={item.image || item.img} alt={item.name} />
                                </div>
                                <div className="item-info-mini">
                                    <p className="item-name-mini">{item.name}</p>
                                    <p className="item-price-mini">PKR {parsePrice(item.price)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="summary-footer">
                        <div className="summary-line">
                            <span>Subtotal</span>
                            <span>PKR {subtotal}</span>
                        </div>
                        <div className="summary-line">
                            <span>Shipping</span>
                            <span>PKR {shipping}</span>
                        </div>
                        <div className="summary-total-line">
                            <span>Total</span>
                            <span>PKR {total}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Checkout;
