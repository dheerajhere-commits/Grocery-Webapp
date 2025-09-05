import React, { useMemo } from 'react';
import { Product, Role } from '../types';
import { StarRating } from './StarRating';

type ProductCardProps = {
    product: Product;
    onAddToCart: (product: Product) => void;
    onProductClick: (product: Product) => void;
    currentRole: Role;
    onEditProduct: (product: Product) => void;
    onRemoveProduct: (productId: number) => void;
};

export const ProductCard = ({ product, onAddToCart, onProductClick, currentRole, onEditProduct, onRemoveProduct }: ProductCardProps) => {
    const averageRating = useMemo(() => {
        if (!product.reviews || product.reviews.length === 0) return 0;
        const total = product.reviews.reduce((sum, review) => sum + review.rating, 0);
        return total / product.reviews.length;
    }, [product.reviews]);

    const handleCardClick = () => {
        if (currentRole === 'USER') {
            onProductClick(product);
        }
    };

    return (
      <div className={`product-card ${currentRole === 'USER' ? 'user-mode' : ''}`} onClick={handleCardClick}>
        <div className="product-image">{product.image}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        
        {currentRole === 'USER' ? (
            <>
                <div className="product-rating">
                    {product.reviews.length > 0 ? (
                        <>
                            <StarRating rating={averageRating} />
                            <span className="review-count">({product.reviews.length})</span>
                        </>
                    ) : (
                        <span className="review-count">No reviews yet</span>
                    )}
                </div>
                <button className="add-to-cart-btn" onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>
                  Add to Cart
                </button>
            </>
        ) : (
            <div className="admin-actions">
                <button className="edit-btn" onClick={() => onEditProduct(product)}>Edit</button>
                <button className="remove-btn-admin" onClick={() => onRemoveProduct(product.id)}>Remove</button>
            </div>
        )}
      </div>
    );
};