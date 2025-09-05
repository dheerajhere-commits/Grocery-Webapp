import React from 'react';
import { Order } from '../types';

type OrderHistoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
};

export const OrderHistoryModal = ({ isOpen, onClose, orders }: OrderHistoryModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content order-history-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close order history">×</button>
        <h2>Your Order History</h2>
        {orders.length === 0 ? (
          <p style={{ textAlign: 'center' }}>You have no past orders.</p>
        ) : (
          <div className="order-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <span>Order ID</span>
                    <strong>{order.id}</strong>
                  </div>
                   <div>
                    <span>Date</span>
                    <strong>{order.date}</strong>
                  </div>
                   <div>
                    <span>Total</span>
                    <strong>${order.total.toFixed(2)}</strong>
                  </div>
                  <div>
                    <span>Status</span>
                    <strong>{order.status}</strong>
                  </div>
                </div>
                <div className="order-item-list">
                  <strong>Items:</strong>
                  {order.items.map(item => (
                    <div key={item.id} className="order-item">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
