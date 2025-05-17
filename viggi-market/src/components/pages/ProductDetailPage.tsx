import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { 
  ShoppingCart, 
  Heart, 
  ChevronRight, 
  Minus, 
  Plus, 
  ArrowLeft 
} from 'lucide-react';
import { products } from '../data/mockData';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import ProductCard from '../../components/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const { addToCart } = useCart();
  
  // Optional image gallery
  const [additionalImages] = useState<string[]>([]);
  
  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setActiveImage(foundProduct.image);
      }
    }
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-viggi-primary"></div>
        </div>
      </div>
    );
  }
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);
  
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-6 text-viggi-gray">
        <Link to="/" className="hover:text-viggi-primary">Accueil</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to="/products" className="hover:text-viggi-primary">Produits</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to={`/categories/${product.category?.slug}`} className="hover:text-viggi-primary">
          {product.category?.name}
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-viggi-dark font-medium">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="relative bg-white rounded-lg overflow-hidden mb-4">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-[400px] object-contain"
            />
          </div>
          
          {additionalImages.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              <div 
                className={`cursor-pointer rounded-md overflow-hidden border-2 ${activeImage === product.image ? 'border-viggi-primary' : 'border-transparent'}`}
                onClick={() => setActiveImage(product.image)}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-20 object-cover"
                />
              </div>
              
              {additionalImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`cursor-pointer rounded-md overflow-hidden border-2 ${activeImage === img ? 'border-viggi-primary' : 'border-transparent'}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} - Image ${index + 2}`} 
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <Link 
            to={`/categories/${product.category?.slug}`} 
            className="inline-block text-sm font-medium text-viggi-primary bg-viggi-primary/10 rounded-full px-3 py-1 mb-2"
          >
            {product.category?.name}
          </Link>
          
          <h1 className="text-3xl font-bold text-viggi-dark mb-2">{product.name}</h1>
          
          <div className="mb-4">
            <span className="text-2xl font-bold text-viggi-dark">
              {formatPrice(product.price)}
            </span>
            {/* If there's a discount, show old price */}
            {/* <span className="text-lg text-viggi-gray line-through ml-2">{formatPrice(product.price * 1.2)}</span> */}
          </div>
          
          <p className="text-viggi-gray mb-6">{product.description}</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Disponibilité:</span>
              {isOutOfStock ? (
                <span className="text-red-500 font-medium">Rupture de stock</span>
              ) : (
                <span className="text-green-500 font-medium">En stock ({product.stock} disponibles)</span>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="font-medium">Catégorie:</span>
              <Link 
                to={`/categories/${product.category?.slug}`} 
                className="text-viggi-primary hover:underline"
              >
                {product.category?.name}
              </Link>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="mb-2 font-medium">Quantité:</div>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10"
                onClick={decreaseQuantity}
                disabled={quantity <= 1 || isOutOfStock}
              >
                <Minus size={18} />
              </Button>
              
              <span className="mx-4 w-10 text-center text-lg font-medium">
                {quantity}
              </span>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10"
                onClick={increaseQuantity}
                disabled={isOutOfStock}
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="flex-1 bg-viggi-primary hover:bg-viggi-secondary"
              size="lg"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              <ShoppingCart size={20} className="mr-2" />
              Ajouter au panier
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="flex-1"
            >
              <Heart size={20} className="mr-2" />
              Ajouter aux favoris
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs - Simplified version */}
      <div className="mt-12">
        <div className="border-b">
          <div className="inline-block border-b-2 border-viggi-primary px-4 py-2 text-viggi-primary font-medium">
            Détails du produit
          </div>
        </div>
        
        <div className="py-6">
          <p className="text-viggi-gray mb-4">
            {product.description}
          </p>
          <p className="text-viggi-gray">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nunc. Sed euismod, nunc ut aliquam tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nunc.
          </p>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-viggi-dark mb-6">Produits similaires</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      )}
      
      {/* Back Button */}
      <div className="mt-12">
        <Button 
          variant="outline" 
          className="flex items-center"
          asChild
        >
          <Link to="/products">
            <ArrowLeft size={18} className="mr-2" />
            Retour aux produits
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
