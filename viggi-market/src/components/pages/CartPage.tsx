
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ShoppingCart, ArrowLeft, CreditCard, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../CartItem';

const CartPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };
  
  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-viggi-dark mb-6 flex items-center">
        <ShoppingCart size={28} className="mr-3" />
        Mon Panier
      </h1>
      
      {cart.items.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingCart size={32} className="text-viggi-gray" />
          </div>
          <h2 className="text-2xl font-bold text-viggi-dark mb-2">Votre panier est vide</h2>
          <p className="text-viggi-gray mb-6">
            Vous n'avez pas encore ajouté de produits à votre panier.
          </p>
          <Button className="bg-viggi-primary hover:bg-viggi-secondary" asChild>
            <Link to="/products">Découvrir nos produits</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 flex justify-between items-center border-b">
                <h2 className="text-xl font-semibold">
                  Articles ({cart.items.reduce((total, item) => total + item.quantity, 0)})
                </h2>
                <Button 
                  variant="ghost" 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 flex items-center"
                  onClick={handleClearCart}
                >
                  <Trash2 size={18} className="mr-2" />
                  Vider le panier
                </Button>
              </div>
              
              <div className="divide-y">
                {cart.items.map(item => (
                  <div key={item.id} className="p-4">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="mt-6 flex items-center"
              asChild
            >
              <Link to="/products">
                <ArrowLeft size={18} className="mr-2" />
                Continuer mes achats
              </Link>
            </Button>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-viggi-gray">Sous-total</span>
                  <span className="font-medium">{formatPrice(cart.total)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-viggi-gray">Frais de livraison</span>
                  <span className="font-medium">
                    {cart.total > 50 ? 'Gratuit' : formatPrice(4.99)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-viggi-gray">TVA (20%)</span>
                  <span className="font-medium">{formatPrice(cart.total * 0.2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-viggi-dark">
                    {formatPrice(cart.total + (cart.total > 50 ? 0 : 4.99))}
                  </span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-viggi-primary hover:bg-viggi-secondary flex items-center justify-center"
                size="lg"
                asChild
              >
                <Link to="/checkout">
                  <CreditCard size={20} className="mr-2" />
                  Procéder au paiement
                </Link>
              </Button>
              
              <div className="mt-4 text-center text-sm text-viggi-gray">
                <p>
                  En procédant au paiement, vous acceptez nos{' '}
                  <Link to="/terms" className="text-viggi-primary hover:underline">
                    conditions d'utilisation
                  </Link>{' '}
                  et notre{' '}
                  <Link to="/privacy" className="text-viggi-primary hover:underline">
                    politique de confidentialité
                  </Link>
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h3 className="text-lg font-semibold mb-3">Nous acceptons</h3>
              <div className="flex space-x-2">
                <div className="bg-gray-100 rounded p-2">
                  <svg viewBox="0 0 32 32" className="h-6 w-10">
                    <path fill="#2566af" d="M13.544 9.094h4.932l-2.465 11.545h-4.913l2.446-11.545z"></path>
                    <path fill="#e6a540" d="M26.418 9.094l-5.298 11.545h-4.913l5.309-11.545h4.902M27.173 20.639l.927-4.026-2.139 4.026h1.212z"></path>
                  </svg>
                </div>
                <div className="bg-gray-100 rounded p-2">
                  <svg viewBox="0 0 32 32" className="h-6 w-10">
                    <path fill="#3c58bf" d="M32 15.094c0 2.582-2.09 4.672-4.671 4.672h-22.658c-2.582 0-4.671-2.09-4.671-4.672v-4.671c0-2.581 2.09-4.671 4.671-4.671h22.658c2.581 0 4.671 2.09 4.671 4.671v4.671z"></path>
                    <path fill="#293688" d="M12.125 18.956l2.339-11.269h3.735l-2.339 11.269h-3.735z"></path>
                    <path fill="#293688" d="M23.58 8.095c-.736-.296-1.89-.608-3.333-.608-3.668 0-6.252 1.93-6.272 4.692-.034 2.037 1.846 3.17 3.251 3.846 1.437.693 1.924 1.14 1.917 1.761-.014.95-1.152 1.387-2.216 1.387-1.477 0-2.265-.213-3.476-.742l-.479-.226-.518 3.162c.863.394 2.457.742 4.116.756 3.877 0 6.394-1.903 6.422-4.851.015-1.618-.975-2.854-3.116-3.868-1.298-.653-2.091-1.093-2.079-1.755 0-.591.672-1.22 2.124-1.22 1.209-.02 2.085.254 2.768.545l.332.166.516-3.045z"></path>
                  </svg>
                </div>
                <div className="bg-gray-100 rounded p-2">
                  <svg viewBox="0 0 32 32" className="h-6 w-10">
                    <path fill="#828282" d="M32 5.094c0-2.761-2.239-5-5-5h-22c-2.761 0-5 2.239-5 5v16c0 2.761 2.239 5 5 5h22c2.761 0 5-2.239 5-5v-16z"></path>
                    <path fill="#0076c0" d="M25.536 20.94c0-2.761-2.239-5-5-5h-9.071c-2.761 0-5 2.239-5 5v.188c0 2.761 2.239 5 5 5h9.071c2.761 0 5-2.239 5-5v-.188z"></path>
                    <path fill="#ffffff" d="M16 18.956c-1.761 0-3.189 1.428-3.189 3.188 0 1.761 1.428 3.189 3.189 3.189 1.761 0 3.189-1.428 3.189-3.189 0-1.76-1.428-3.188-3.189-3.188z"></path>
                  </svg>
                </div>
                <div className="bg-gray-100 rounded p-2">
                  <svg viewBox="0 0 32 32" className="h-6 w-10">
                    <path fill="#003087" d="M25.198 9.147h-3.93c-.269 0-.502.181-.576.443l-1.699 10.766c-.034.212.13.403.344.403h1.877c.269 0 .502-.181.576-.443l.458-2.904c.074-.262.306-.443.575-.443h1.242c2.767 0 4.361-1.339 4.779-3.992.189-1.161.008-2.072-.538-2.709-.593-.693-1.647-1.06-3.05-1.121h-.058zm.484 3.939c-.229 1.509-1.375 1.509-2.484 1.509h-.631l.443-2.803c.027-.168.169-.291.34-.291h.289c.755 0 1.47 0 1.837.43.22.258.287.641.206 1.155z"></path>
                    <path fill="#009cde" d="M12.582 13.086h-1.888a.343.343 0 0 0-.34.291l-.871 5.531-.247 1.566c-.022.148.091.284.241.284h1.55a.343.343 0 0 0 .34-.291l.834-5.288c.027-.168.168-.291.339-.291h1.888c.17 0 .312.123.339.291l.834 5.288c.027.168.169.291.34.291h1.55c.15 0 .264-.136.241-.284l-.247-1.566-.871-5.531a.343.343 0 0 0-.34-.291h-1.888a.343.343 0 0 0-.339.291l-.207 1.308-.207-1.308a.343.343 0 0 0-.341-.291z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
