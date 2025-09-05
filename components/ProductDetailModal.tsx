import React, { useState } from 'react';
import { Product, Review } from '../types';
import { StarRating } from './StarRating';

type ProductDetailModalProps = {
    product: Product;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
    onAddReview: (productId: number, review: Omit<Review, 'id'>) => void;
};

export const ProductDetailModal = ({ product, onClose, onAddToCart, onAddReview }: ProductDetailModalProps) => {
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (author && rating > 0 && comment) {
            onAddReview(product.id, { author, rating, comment });
            setAuthor('');
            setRating(0);
            setComment('');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content product-detail-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose} aria-label="Close product details">×</button>
                <div className="product-detail-layout">
                    <div className="product-detail-info">
                        <div className="product-detail-image">{product.image}</div>
                        <h2>{product.name}</h2>
                        <p className="product-detail-price">${product.price.toFixed(2)}</p>
                        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>Add to Cart</button>
                    </div>
                    <div className="product-detail-reviews">
                        <h3>Customer Reviews</h3>
                        <div className="review-list">
                            {product.reviews.length > 0 ? (
                                product.reviews.map(review => (
                                    <div key={review.id} className="review-item">
                                        <strong>{review.author}</strong>
                                        <StarRating rating={review.rating} />
                                        <p>{review.comment}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews yet. Be the first!</p>
                            )}
                        </div>
                        <form onSubmit={handleSubmit} className="review-form">
                            <h4>Leave a Review</h4>
                            <input type="text" placeholder="Your Name" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                            <div className="star-rating-input">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span key={star} className={star <= rating ? 'selected' : ''} onClick={() => setRating(star)}>★</span>
                                ))}
                            </div>
                            <textarea placeholder="Your Review" value={comment} onChange={(e) => setComment(e.target.value)} required />
                            <button type="submit">Submit Review</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
