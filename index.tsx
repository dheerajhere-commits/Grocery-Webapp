import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI, Type } from "@google/genai";

import { Product, CartItem, Recipe, Review, Role, Order, ShippingInfo } from './types';
import { initialProductsData } from './data';
import { Header } from './components/Header';
import { CategoryFilters } from './components/CategoryFilters';
import { ProductGrid } from './components/ProductGrid';
import { CartSidebar } from './components/CartSidebar';
import { RecipeModal } from './components/RecipeModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Footer } from './components/Footer';
import { TechStackModal } from './components/TechStackModal';
import { AdminPanel } from './components/AdminPanel';
import { ProductFormModal } from './components/ProductFormModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';


// --- MAIN APP ---
const App = () => {
  const [productsData, setProductsData] = useState<Product[]>(initialProductsData);
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role>('USER');
  const [editingProduct, setEditingProduct] = useState<Product | null | undefined>(undefined); // undefined to signal new product
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderHistoryModalOpen, setIsOrderHistoryModalOpen] = useState(false);


  const filteredProducts = useMemo(() =>
    activeCategory === 'All'
      ? productsData
      : productsData.filter(p => p.category === activeCategory),
    [activeCategory, productsData]
  );

  const cartItemCount = useMemo(() =>
    cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );
  
  const handleFindRecipe = async () => {
    if (cart.length < 2) return;
    setIsRecipeModalOpen(true);
    setIsGeneratingRecipe(true);
    setRecipe(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const ingredientList = cart.map(item => item.name).join(', ');
      const prompt = `Generate a simple recipe using ONLY the following ingredients: ${ingredientList}. You can assume pantry staples like oil, salt, and pepper are available. Provide a creative recipe name, a short, appealing description, a list of ingredients (including the ones provided), and step-by-step instructions.`;

      const schema = {
        type: Type.OBJECT,
        properties: {
          recipeName: { type: Type.STRING, description: "The name of the recipe." },
          description: { type: Type.STRING, description: "A brief, appealing description of the dish." },
          ingredients: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of ingredients required for the recipe."
          },
          instructions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "The step-by-step cooking instructions."
          }
        },
        required: ['recipeName', 'description', 'ingredients', 'instructions']
      };
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });

      const recipeJson = JSON.parse(response.text);
      setRecipe(recipeJson);

    } catch (error) {
      console.error("Error generating recipe:", error);
      setRecipe({ error: "Sorry, I couldn't generate a recipe right now. Please try again later." } as Recipe);
    } finally {
      setIsGeneratingRecipe(false);
    }
  };


  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      setIsCartOpen(false);
      setIsCheckoutModalOpen(true);
    }
  };
  
  const handlePlaceOrder = (shippingInfo: ShippingInfo) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder: Order = {
      id: `#${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total: total,
      shippingInfo: shippingInfo,
      status: 'Processing',
    };
    setOrders(prev => [...prev, newOrder]);
    setCart([]);
    // The modal will show a confirmation and then close.
    // Let's keep it open to show confirmation. The modal will close itself.
  };


  const handleAddReview = (productId: number, review: Omit<Review, 'id'>) => {
    const newReview = { ...review, id: Date.now() };
    const updatedProducts = productsData.map(p => {
        if (p.id === productId) {
            const updatedProduct = { ...p, reviews: [...p.reviews, newReview] };
            // also update the selected product if it's the one being reviewed
            if (selectedProduct && selectedProduct.id === productId) {
                setSelectedProduct(updatedProduct);
            }
            return updatedProduct;
        }
        return p;
    });
    setProductsData(updatedProducts);
  };

  // --- ADMIN ACTIONS ---
  const handleSaveProduct = (productToSave: Omit<Product, 'id' | 'reviews'> & { id?: number }) => {
    if (productToSave.id) { // Editing existing product
        setProductsData(productsData.map(p => p.id === productToSave.id ? { ...p, ...productToSave } : p));
    } else { // Adding new product
        const newProduct: Product = {
            ...productToSave,
            id: Date.now(),
            reviews: [],
        };
        setProductsData([...productsData, newProduct]);
    }
    setEditingProduct(null); // Close modal
  };

  const handleRemoveProduct = (productId: number) => {
      if (window.confirm('Are you sure you want to delete this product?')) {
          setProductsData(productsData.filter(p => p.id !== productId));
      }
  };

  return (
    <>
      <Header 
        cartItemCount={cartItemCount} 
        onCartClick={() => setIsCartOpen(true)}
        currentRole={currentRole}
        onSetRole={setCurrentRole}
        onMyOrdersClick={() => setIsOrderHistoryModalOpen(true)}
      />
      <main className="app-container">
        {currentRole === 'ADMIN' && <AdminPanel onAddProduct={() => setEditingProduct(undefined)} />}
        <CategoryFilters
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <ProductGrid 
          products={filteredProducts} 
          onAddToCart={handleAddToCart} 
          onProductClick={setSelectedProduct}
          currentRole={currentRole}
          onEditProduct={setEditingProduct}
          onRemoveProduct={handleRemoveProduct}
        />
      </main>
      <Footer onTechStackClick={() => setIsTechModalOpen(true)} />
      
      {/* User Modals & Sidebars */}
      {currentRole === 'USER' && (
        <>
            <CartSidebar
                isOpen={isCartOpen}
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
                onClose={() => setIsCartOpen(false)}
                onFindRecipe={handleFindRecipe}
            />
            {isRecipeModalOpen && (
                <RecipeModal
                isGenerating={isGeneratingRecipe}
                recipe={recipe}
                onClose={() => setIsRecipeModalOpen(false)}
                />
            )}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={handleAddToCart}
                    onAddReview={handleAddReview}
                />
            )}
            {isCheckoutModalOpen && (
              <CheckoutModal 
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                cart={cart}
                onPlaceOrder={handlePlaceOrder}
              />
            )}
            {isOrderHistoryModalOpen && (
              <OrderHistoryModal
                isOpen={isOrderHistoryModalOpen}
                onClose={() => setIsOrderHistoryModalOpen(false)}
                orders={orders}
              />
            )}
        </>
      )}

      {/* Admin Modal */}
      {editingProduct !== null && (
          <ProductFormModal
              product={editingProduct}
              onClose={() => setEditingProduct(null)}
              onSave={handleSaveProduct}
          />
      )}

      {/* General Modal */}
      {isTechModalOpen && (
        <TechStackModal isOpen={isTechModalOpen} onClose={() => setIsTechModalOpen(false)} />
      )}
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);