import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { products, categories } from '../data/mockData';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { Filter, Search, SlidersHorizontal } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  
  const toggleCategory = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceRange([value, priceRange[1]]);
  };
  
  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceRange([priceRange[0], value]);
  };
  
  const filteredProducts = products.filter(product => {
    // Search query filter
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategories.length === 0 || 
                           selectedCategories.includes(product.categoryId);
    
    // Price range filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-viggi-dark">Nos Produits</h1>
        <Button 
          variant="outline" 
          className="md:hidden flex items-center"
          onClick={toggleFilters}
        >
          <Filter size={18} className="mr-2" />
          Filtres
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <SlidersHorizontal size={20} className="mr-2" />
              Filtres
            </h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Rechercher</h3>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Catégories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category.id}`} 
                      checked={selectedCategories.includes(category.id)} 
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <Label htmlFor={`category-${category.id}`} className="cursor-pointer">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Prix</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price-min">Min</Label>
                  <Input
                    id="price-min"
                    type="number"
                    min={0}
                    value={priceRange[0]}
                    onChange={handlePriceMinChange}
                  />
                </div>
                <div>
                  <Label htmlFor="price-max">Max</Label>
                  <Input
                    id="price-max"
                    type="number"
                    min={0}
                    value={priceRange[1]}
                    onChange={handlePriceMaxChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters - Mobile */}
        {showFilters && (
          <div className="md:hidden fixed inset-0 bg-white z-50 p-4 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filtres</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleFilters}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Rechercher</h3>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Catégories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`mobile-category-${category.id}`} 
                      checked={selectedCategories.includes(category.id)} 
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <Label htmlFor={`mobile-category-${category.id}`} className="cursor-pointer">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Prix</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mobile-price-min">Min</Label>
                  <Input
                    id="mobile-price-min"
                    type="number"
                    min={0}
                    value={priceRange[0]}
                    onChange={handlePriceMinChange}
                  />
                </div>
                <div>
                  <Label htmlFor="mobile-price-max">Max</Label>
                  <Input
                    id="mobile-price-max"
                    type="number"
                    min={0}
                    value={priceRange[1]}
                    onChange={handlePriceMaxChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white py-4 border-t">
              <Button 
                className="w-full bg-viggi-primary hover:bg-viggi-secondary"
                onClick={toggleFilters}
              >
                Appliquer les filtres
              </Button>
            </div>
          </div>
        )}
        
        {/* Products Grid */}
        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-viggi-gray mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
              <p className="text-viggi-gray mb-4">
                Aucun produit ne correspond à vos critères de recherche. Essayez d'ajuster vos filtres.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategories([]);
                  setPriceRange([0, 2000]);
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
