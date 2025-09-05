import React, { useState, useMemo } from 'react';
import { CartItem, ShippingInfo } from '../types';

type CheckoutModalProps = {
    isOpen: boolean;
    onClose: () => void;
    cart: CartItem[];
    onPlaceOrder: (shippingInfo: ShippingInfo) => void;
};

type CheckoutStep = 'SHIPPING' | 'PAYMENT' | 'REVIEW' | 'CONFIRMATION';

export const CheckoutModal = ({ isOpen, onClose, cart, onPlaceOrder }: CheckoutModalProps) => {
    const [step, setStep] = useState<CheckoutStep>('SHIPPING');
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        fullName: '',
        address: '',
        city: '',
        zipCode: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');

    const total = useMemo(() =>
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [cart]
    );

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('PAYMENT');
    };

    const handlePlaceOrderClick = () => {
        onPlaceOrder(shippingInfo);
        setStep('CONFIRMATION');
    };
    
    const handleCloseAndReset = () => {
        setStep('SHIPPING');
        setShippingInfo({ fullName: '', address: '', city: '', zipCode: '' });
        onClose();
    };

    if (!isOpen) return null;

    const progressPercentage = {
      'SHIPPING': '0%',
      'PAYMENT': '50%',
      'REVIEW': '100%',
      'CONFIRMATION': '100%'
    }[step];
    
    return (
        <div className="modal-overlay">
            <div className="modal-content checkout-modal" onClick={(e) => e.stopPropagation()}>
                {step !== 'CONFIRMATION' && <button className="close-btn" onClick={onClose} aria-label="Close checkout">×</button>}
                
                {step !== 'CONFIRMATION' && (
                    <div className="checkout-progress-bar">
                      <div className="progress-step active">Shipping</div>
                      <div className={`progress-step ${step !== 'SHIPPING' ? 'active' : ''}`}>Payment</div>
                      <div className={`progress-step ${step === 'REVIEW' ? 'active' : ''}`}>Review</div>
                      <div className="progress-line">
                        <div className="progress-line-fill" style={{ width: progressPercentage }}></div>
                      </div>
                    </div>
                )}

                {step === 'SHIPPING' && (
                    <form onSubmit={handleShippingSubmit} className="checkout-form">
                        <h3>Shipping Information</h3>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" id="fullName" value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="zipCode">Zip Code</label>
                            <input type="text" id="zipCode" value={shippingInfo.zipCode} onChange={e => setShippingInfo({...shippingInfo, zipCode: e.target.value})} required />
                        </div>
                        <div className="checkout-actions">
                            <button type="button" onClick={onClose}>Cancel</button>
                            <button type="submit" className="next-btn">Next: Payment</button>
                        </div>
                    </form>
                )}

                {step === 'PAYMENT' && (
                    <div className="checkout-form">
                        <h3>Payment Method</h3>
                        {/* Mock payment options */}
                        <div className="form-group">
                            <label><input type="radio" name="payment" value="Credit Card" checked={paymentMethod === 'Credit Card'} onChange={() => setPaymentMethod('Credit Card')} /> Credit Card</label>
                            <label><input type="radio" name="payment" value="PayPal" checked={paymentMethod === 'PayPal'} onChange={() => setPaymentMethod('PayPal')} /> PayPal</label>
                        </div>
                        <div className="checkout-actions">
                            <button type="button" onClick={() => setStep('SHIPPING')}>Back</button>
                            <button type="button" className="next-btn" onClick={() => setStep('REVIEW')}>Next: Review</button>
                        </div>
                    </div>
                )}
                
                {step === 'REVIEW' && (
                    <div>
                        <h3>Review Your Order</h3>
                        <div><strong>Shipping to:</strong> {shippingInfo.fullName}, {shippingInfo.address}</div>
                        <div><strong>Payment Method:</strong> {paymentMethod}</div>
                        <hr style={{ margin: '1rem 0' }} />
                        <h4>Items</h4>
                        {cart.map(item => (
                            <div key={item.id} className="order-summary-item">
                                <span>{item.name} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                         <div className="order-summary-item">
                            <strong>Total</strong>
                            <strong>${total.toFixed(2)}</strong>
                        </div>
                        <div className="checkout-actions">
                            <button type="button" onClick={() => setStep('PAYMENT')}>Back</button>
                            <button type="button" className="next-btn" onClick={handlePlaceOrderClick}>Place Order</button>
                        </div>
                    </div>
                )}

                {step === 'CONFIRMATION' && (
                    <div className="order-confirmation">
                        <h2>✅ Order Placed!</h2>
                        <p>Thank you for your purchase. Your order is being processed.</p>
                        <button className="close-btn-confirm" onClick={handleCloseAndReset}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
};
