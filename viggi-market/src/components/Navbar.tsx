import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X 
} from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCart } from './context/CartContext';
import { Badge } from "./ui/badge";

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const cartItemsCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-viggi-primary">Viggi</span>
            <span className="text-2xl font-bold text-viggi-dark">Market</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-viggi-dark hover:text-viggi-primary transition-colors font-medium">
              Accueil
            </Link>
            <Link to="/products" className="text-viggi-dark hover:text-viggi-primary transition-colors font-medium">
              Produits
            </Link>
            <Link to="/categories" className="text-viggi-dark hover:text-viggi-primary transition-colors font-medium">
              Catégories
            </Link>
            <Link to="/about" className="text-viggi-dark hover:text-viggi-primary transition-colors font-medium">
              À propos
            </Link>
          </nav>

          {/* Search, Cart, and User on Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-[200px] focus:w-[300px] transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0"
              >
                <Search size={18} />
              </Button>
            </form>

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart size={24} />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-viggi-primary hover:bg-viggi-secondary">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User size={24} />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart size={24} />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-viggi-primary hover:bg-viggi-secondary">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-viggi-dark hover:text-viggi-primary transition-colors font-medium px-2 py-1" onClick={toggleMenu}>
                Accueil
              </Link>
              <Link to="/products" className="text-viggi-dark hover:text-viggi-primary transition-colors font-medium px-2 py-1" onClick={toggleMenu}>
                Produits
              </Link>
              <Link to="/categories" className="text-viggi-dark hover:text-viggi-primary transition-colors font-medium px-2 py-1" onClick={toggleMenu}>
                Catégories
              </Link>
              <Link to="/about" className="text-viggi-dark hover:text-viggi-primary transition-colors font-medium px-2 py-1" onClick={toggleMenu}>
                À propos
              </Link>
              <Link to="/login" className="text-viggi-dark hover:text-viggi-primary transition-colors font-medium px-2 py-1" onClick={toggleMenu}>
                Connexion
              </Link>
            </div>
            
            <form onSubmit={handleSearch} className="mt-4 relative">
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0"
              >
                <Search size={18} />
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
