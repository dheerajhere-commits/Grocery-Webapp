import React from 'react';
import { Recipe } from '../types';

type RecipeModalProps = {
    recipe: Recipe | null;
    isGenerating: boolean;
    onClose: () => void;
};

export const RecipeModal = ({ recipe, isGenerating, onClose }: RecipeModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content recipe-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close recipe">×</button>
        {isGenerating && <div className="loader"></div>}
        {recipe && !isGenerating && (
          recipe.error ? (
            <div className="recipe-content">
              <h2>Oh no!</h2>
              <p>{recipe.error}</p>
            </div>
          ) : (
            <div className="recipe-content">
              <h2>{recipe.recipeName}</h2>
              <p>{recipe.description}</p>
              <h3>Ingredients</h3>
              <ul>
                {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
              <h3>Instructions</h3>
              <ol>
                {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </div>
          )
        )}
      </div>
    </div>
  );
};
