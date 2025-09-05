import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { categories } from '../data';

type ProductFormModalProps = {
    product: Product | null | undefined; // null: closed, undefined: new, Product: editing
    onClose: () => void;
    onSave: (product: Omit<Product, 'id' | 'reviews'> & { id?: number }) => void;
};

export const ProductFormModal = ({ product, onClose, onSave }: ProductFormModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: categories.filter(c => c !== 'All')[0] || '',
        image: ''
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: String(product.price),
                category: product.category,
                image: product.image
            });
        } else {
            // Reset for new product
            setFormData({
                name: '',
                price: '',
                category: categories.filter(c => c !== 'All')[0] || '',
                image: ''
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const productToSave = {
            id: product?.id,
            name: formData.name,
            price: parseFloat(formData.price) || 0,
            category: formData.category,
            image: formData.image
        };
        onSave(productToSave);
    };
    
    if (product === null) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content product-form-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose} aria-label="Close form">×</button>
                <form onSubmit={handleSubmit} className="product-form">
                    <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required step="0.01" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" value={formData.category} onChange={handleChange}>
                           {categories.filter(c => c !== 'All').map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                     <div className="form-group">
                        <label htmlFor="image">Image (Emoji)</label>
                        <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required maxLength={2} />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="save-btn">Save Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};