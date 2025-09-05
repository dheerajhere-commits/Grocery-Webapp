import React, { useMemo } from 'react';
import { CartItem } from '../types';

type CartSidebarProps = {
  isOpen: boolean;
  cart: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
  onClose: () => void;
  onFindRecipe: () => void;
};

export const CartSidebar = ({ isOpen, cart, onUpdateQuantity, onRemoveItem, onCheckout, onClose, onFindRecipe }: CartSidebarProps) => {
  const total = useMemo(() =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button className="close-btn" onClick={onClose} aria-label="Close cart">×</button>
      </div>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <span className="cart-item-image">{item.image}</span>
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">${item.price.toFixed(2)}</div>
              </div>
              <div className="cart-item-actions">
                <button className="quantity-btn" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button className="quantity-btn" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                <button className="remove-btn" onClick={() => onRemoveItem(item.id)} aria-label={`Remove ${item.name}`}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          {cart.length > 1 && (
             <button className="find-recipe-btn" onClick={onFindRecipe}>
                ✨ Find a Recipe with these ingredients
              </button>
          )}
          <button className="checkout-btn" onClick={onCheckout}>
            Checkout
          </button>
        </div>
      )}
    </aside>
  );
};
