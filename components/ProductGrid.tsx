import React from 'react';
import { Product, Role } from '../types';
import { ProductCard } from './ProductCard';

type ProductGridProps = {
    products: Product[];
    onAddToCart: (product: Product) => void;
    onProductClick: (product: Product) => void;
    currentRole: Role;
    onEditProduct: (product: Product) => void;
    onRemoveProduct: (productId: number) => void;
};

export const ProductGrid = ({ products, onAddToCart, onProductClick, currentRole, onEditProduct, onRemoveProduct }: ProductGridProps) => (
  <div className="product-grid">
    {products.map(product => (
      <ProductCard 
        key={product.id} 
        product={product} 
        onAddToCart={onAddToCart} 
        onProductClick={onProductClick}
        currentRole={currentRole}
        onEditProduct={onEditProduct}
        onRemoveProduct={onRemoveProduct}
      />
    ))}
  </div>
);