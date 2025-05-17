import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Cart, CartItem, Product } from '../types';
import { initialCart } from '../data/mockData';
import { toast } from 'sonner';

type CartAction = 
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.productId === product.id);
      
      if (existingItemIndex > -1) {
        // Item already exists, update quantity
        const newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
          price: product.price
        };
        
        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
          updatedAt: new Date().toISOString()
        };
      } else {
        // New item
        const newItem: CartItem = {
          id: state.items.length + 1,
          productId: product.id,
          product,
          quantity,
          price: product.price
        };
        
        return {
          ...state,
          items: [...state.items, newItem],
          total: calculateTotal([...state.items, newItem]),
          updatedAt: new Date().toISOString()
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.productId !== action.payload.productId);
      
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        updatedAt: new Date().toISOString()
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { productId } });
      }
      
      const newItems = state.items.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      );
      
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        updatedAt: new Date().toISOString()
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        updatedAt: new Date().toISOString()
      };
      
    default:
      return state;
  }
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  
  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        
        // Initialize with saved cart
        Object.keys(parsedCart).forEach(key => {
          if (key !== 'items') {
            (cart as any)[key] = parsedCart[key];
          }
        });
        
        // Add each item individually to properly calculate total
        if (Array.isArray(parsedCart.items)) {
          parsedCart.items.forEach((item: CartItem) => {
            if (item.product && item.quantity > 0) {
              dispatch({ 
                type: 'ADD_ITEM', 
                payload: { product: item.product, quantity: item.quantity } 
              });
            }
          });
        }
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    toast.success(`${product.name} ajouté au panier`);
  };
  
  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
    toast.info('Produit retiré du panier');
  };
  
  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.info('Panier vidé');
  };
  
  return (
    <CartContext.Provider 
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};
