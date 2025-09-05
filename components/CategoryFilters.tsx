import React from 'react';
import { categories } from '../data';

type CategoryFiltersProps = {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
};

export const CategoryFilters = ({ activeCategory, onSelectCategory }: CategoryFiltersProps) => (
  <div className="category-filters">
    {categories.map(category => (
      <button
        key={category}
        className={`category-btn ${activeCategory === category ? 'active' : ''}`}
        onClick={() => onSelectCategory(category)}
      >
        {category}
      </button>
    ))}
  </div>
);
