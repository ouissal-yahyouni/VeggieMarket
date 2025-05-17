import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-viggi-dark to-viggi-primary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Découvrez l'Excellence <br className="hidden md:block" />
              avec <span className="text-viggi-light">Viggi Market</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
              Des produits de qualité supérieure à portée de clic. Explorez notre vaste sélection et bénéficiez d'une expérience d'achat incomparable.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-viggi-primary hover:bg-gray-100"
                asChild
              >
                <Link to="/products">
                  Découvrir les produits
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white/10"
                asChild
              >
                <Link to="/categories">
                  Explorer les catégories
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3" 
                alt="Shopping Experience" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-viggi-primary/30 to-transparent pointer-events-none" />
            </div>
            
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-white rounded-lg shadow-xl p-4 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-viggi-primary">30%</span>
              <span className="text-xl font-medium text-viggi-dark mt-2">de Réduction</span>
              <span className="text-sm text-viggi-gray">Sur votre première commande</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
