import { Product } from './types';

export const initialProductsData: Product[] = [
  { id: 1, name: 'Organic Bananas', price: 1.25, category: 'Fruits', image: '🍌', reviews: [{id: 1, author: 'Alice', rating: 5, comment: 'So fresh and sweet!'}] },
  { id: 2, name: 'Crisp Apples', price: 2.50, category: 'Fruits', image: '🍎', reviews: [{id: 2, author: 'Bob', rating: 4, comment: 'Great for snacking.'}, {id: 3, author: 'Charlie', rating: 5, comment: 'Perfectly crisp.'}] },
  { id: 3, name: 'Fresh Strawberries', price: 4.00, category: 'Fruits', image: '🍓', reviews: [] },
  { id: 4, name: 'Broccoli Florets', price: 2.75, category: 'Vegetables', image: '🥦', reviews: [{id: 4, author: 'David', rating: 5, comment: 'My kids love these steamed.'}] },
  { id: 5, name: 'Carrot Bunch', price: 1.50, category: 'Vegetables', image: '🥕', reviews: [] },
  { id: 6, name: 'Spinach Bag', price: 3.25, category: 'Vegetables', image: '🥬', reviews: [] },
  { id: 7, name: 'Whole Milk', price: 3.50, category: 'Dairy', image: '🥛', reviews: [{id: 5, author: 'Eve', rating: 4, comment: 'Creamy and delicious.'}] },
  { id: 8, name: 'Cheddar Cheese', price: 5.00, category: 'Dairy', image: '🧀', reviews: [] },
  { id: 9, name: 'Free-Range Eggs', price: 4.25, category: 'Dairy', image: '🥚', reviews: [] },
  { id: 10, name: 'Sourdough Bread', price: 4.75, category: 'Bakery', image: '🍞', reviews: [{id: 6, author: 'Frank', rating: 5, comment: 'Best sourdough I have ever had.'}] },
  { id: 11, name: 'Croissants', price: 3.00, category: 'Bakery', image: '🥐', reviews: [] },
  { id: 12, name: 'Chicken Breast', price: 8.00, category: 'Meat', image: '🍗', reviews: [] },
];

export const categories = ['All', ...new Set(initialProductsData.map(p => p.category))];
