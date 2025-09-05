import React from 'react';

type AdminPanelProps = {
  onAddProduct: () => void;
};

export const AdminPanel = ({ onAddProduct }: AdminPanelProps) => {
  return (
    <div className="admin-panel">
      <h2>Admin Dashboard</h2>
      <button className="add-product-btn" onClick={onAddProduct}>
        + Add New Product
      </button>
    </div>
  );
};
