export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'customer';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  slug: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Cart {
  id: number;
  sessionId: string;
  userId?: number;
  items: CartItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  product?: Product;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: 'stripe' | 'paypal';
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  transactionId: string;
  status: 'pending' | 'success' | 'failed';
  method: 'stripe' | 'paypal';
  createdAt: string;
  updatedAt: string;
}
