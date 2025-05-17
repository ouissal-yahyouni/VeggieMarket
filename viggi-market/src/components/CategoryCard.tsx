import React from 'react';
import { Link } from 'react-router-dom';
import { type Category } from './types';
import { Card, CardContent } from "./ui/card";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/categories/${category.slug}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <div className="relative overflow-hidden pt-[60%]">
          <img 
            src={category.image || 'https://placehold.co/600x400'} 
            alt={category.name} 
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <CardContent className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white">{category.name}</h3>
          <p className="text-white/80 text-sm line-clamp-1">{category.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
