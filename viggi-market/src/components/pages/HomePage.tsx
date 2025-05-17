import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../../components/HeroSection';
import ProductCard from '../../components/ProductCard';
import CategoryCard from '../../components/CategoryCard';
import { categories, products } from '../data/mockData';
import { Button } from "../../components/ui/button";
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  // Featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);
  
  return (
    <div>
      <HeroSection />
      
      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-viggi-dark">
              Catégories populaires
            </h2>
            <Button variant="ghost" className="text-viggi-primary" asChild>
              <Link to="/categories">
                Voir toutes les catégories
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-viggi-dark">
              Produits Vedettes
            </h2>
            <Button variant="ghost" className="text-viggi-primary" asChild>
              <Link to="/products">
                Voir tous les produits
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="py-12 bg-gradient-to-r from-viggi-light to-viggi-primary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-viggi-dark mb-4">
                Offres spéciales pour les nouveaux clients
              </h2>
              <p className="text-lg text-viggi-gray mb-6">
                Inscrivez-vous dès aujourd'hui et bénéficiez de 30% de réduction sur votre première commande. Une opportunité à ne pas manquer !
              </p>
              <Button className="bg-viggi-primary hover:bg-viggi-secondary" asChild>
                <Link to="/register">
                  S'inscrire maintenant
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3" 
                alt="Special Offer" 
                className="w-full h-[300px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -top-6 -right-6 bg-viggi-primary text-white rounded-full w-24 h-24 flex flex-col items-center justify-center transform rotate-12">
                <span className="text-xl font-bold">30%</span>
                <span className="text-xs">RÉDUCTION</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials / Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-viggi-dark text-center mb-12">
            Pourquoi Choisir Viggi Market ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-viggi-primary/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-viggi-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Livraison Rapide</h3>
              <p className="text-viggi-gray">
                Livraison en 2-3 jours ouvrables dans toute la France. Gratuite pour les commandes de plus de 50€.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-viggi-primary/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-viggi-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualité Garantie</h3>
              <p className="text-viggi-gray">
                Tous nos produits sont soigneusement sélectionnés pour assurer la plus haute qualité à nos clients.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-viggi-primary/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-viggi-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Satisfait ou Remboursé</h3>
              <p className="text-viggi-gray">
                Si vous n'êtes pas satisfait, nous vous remboursons intégralement dans les 30 jours suivant votre achat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
