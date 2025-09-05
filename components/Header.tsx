import React from 'react';
import { Role } from '../types';

type HeaderProps = {
  cartItemCount: number;
  onCartClick: () => void;
  currentRole: Role;
  onSetRole: (role: Role) => void;
  onMyOrdersClick: () => void;
};

export const Header = ({ cartItemCount, onCartClick, currentRole, onSetRole, onMyOrdersClick }: HeaderProps) => (
  <header className="header">
    <div className="header-left">
      <h1 className="logo">🛒 FreshCart</h1>
      <div className="role-switcher">
        <button 
          onClick={() => onSetRole('USER')}
          className={currentRole === 'USER' ? 'active' : ''}
          aria-pressed={currentRole === 'USER'}
        >
          User
        </button>
        <button 
          onClick={() => onSetRole('ADMIN')}
          className={currentRole === 'ADMIN' ? 'active' : ''}
          aria-pressed={currentRole === 'ADMIN'}
        >
          Admin
        </button>
      </div>
    </div>
    {currentRole === 'USER' && (
      <div className="header-right">
        <button className="header-button" onClick={onMyOrdersClick}>My Orders</button>
        <button className="cart-button" onClick={onCartClick} aria-label={`Open cart with ${cartItemCount} items`}>
          <span className="cart-icon">🛍️</span>
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </button>
      </div>
    )}
  </header>
);