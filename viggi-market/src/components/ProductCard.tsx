import React from 'react';
import { Link } from 'react-router-dom';
import type { CartItem as CartItemType } from './types';
import { Button } from "./ui/button";
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from './context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleIncreaseQuantity = () => {
    updateQuantity(item.productId, item.quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.productId);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div className="flex items-center py-4 border-b last:border-0">
      <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden mr-4">
        <Link to={`/products/${item.productId}`}>
          <img 
            src={item.product.image} 
            alt={item.product.name} 
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      
      <div className="flex-grow">
        <Link to={`/products/${item.productId}`} className="hover:text-viggi-primary">
          <h3 className="font-medium text-lg line-clamp-1">{item.product.name}</h3>
        </Link>
        <p className="text-viggi-gray text-sm line-clamp-1">{item.product.description}</p>
        <p className="font-bold text-viggi-dark mt-1">{formatPrice(item.price)}</p>
      </div>
      
      <div className="flex items-center space-x-2 mr-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleDecreaseQuantity}
          disabled={item.quantity <= 1}
        >
          <Minus size={16} />
        </Button>
        
        <span className="w-8 text-center">{item.quantity}</span>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleIncreaseQuantity}
        >
          <Plus size={16} />
        </Button>
      </div>
      
      <div className="text-right min-w-[100px]">
        <p className="font-bold text-viggi-dark">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="ml-4 text-red-500 hover:text-red-700 hover:bg-red-100"
        onClick={handleRemove}
      >
        <Trash2 size={20} />
      </Button>
    </div>
  );
};

export default CartItem;
