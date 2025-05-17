import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { categories, products } from '../data/mockData';
import type { Category, Product } from '../types';
import ProductCard from '../../components/ProductCard';

const CategoryProductsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (slug) {
      const foundCategory = categories.find(c => c.slug === slug);
      if (foundCategory) {
        setCategory(foundCategory);
        
        const filteredProducts = products.filter(
          product => product.categoryId === foundCategory.id
        );
        setCategoryProducts(filteredProducts);
      }
    }
  }, [slug]);
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-viggi-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-6 text-viggi-gray">
        <Link to="/" className="hover:text-viggi-primary">Accueil</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to="/categories" className="hover:text-viggi-primary">Catégories</Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-viggi-dark font-medium">{category.name}</span>
      </div>
      
      {/* Category Header */}
      <div className="relative rounded-lg overflow-hidden mb-8">
        <img 
          src={category.image || 'https://placehold.co/1200x300'} 
          alt={category.name} 
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="px-6 md:px-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {category.name}
            </h1>
            <p className="text-white/80 text-lg max-w-lg">
              {category.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Products Grid */}
      {categoryProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-viggi-gray mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
          <p className="text-viggi-gray mb-4">
            Il n'y a actuellement aucun produit dans cette catégorie.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProductsPage;
