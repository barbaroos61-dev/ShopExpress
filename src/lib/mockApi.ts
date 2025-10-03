// Mock API service to replace backend calls for Vercel deployment
import type { Product } from "@shared/schema";

// Mock data from the server storage
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones with Active Noise Cancellation",
    description: "Premium wireless headphones with advanced noise cancellation technology, 30-hour battery life, and superior sound quality.",
    price: "79.99",
    originalPrice: "129.99",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: "4.5",
    reviews: 1234,
    freeShipping: 1,
  },
  {
    id: "2",
    name: "Smart Watch Pro - Fitness Tracker with Heart Rate Monitor",
    description: "Advanced smartwatch with fitness tracking, heart rate monitoring, GPS, and 7-day battery life.",
    price: "299.99",
    originalPrice: "399.99",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: "4.8",
    reviews: 856,
    freeShipping: 1,
  },
  {
    id: "3",
    name: "Premium Leather Backpack for Laptop and Travel",
    description: "Stylish and durable leather backpack with padded laptop compartment, perfect for work and travel.",
    price: "89.99",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Fashion",
    rating: "4.3",
    reviews: 432,
    freeShipping: 1,
  },
  {
    id: "4",
    name: "4K Ultra HD Smart TV 55 Inch with HDR",
    description: "Stunning 4K resolution with HDR support, built-in streaming apps, and voice control.",
    price: "549.99",
    originalPrice: "799.99",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: "4.7",
    reviews: 2103,
    freeShipping: 1,
  },
  {
    id: "5",
    name: "Wireless Gaming Mouse with RGB Lighting",
    description: "High-precision wireless gaming mouse with customizable RGB lighting and programmable buttons.",
    price: "49.99",
    originalPrice: "79.99",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: "4.4",
    reviews: 721,
    freeShipping: 0,
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker - Waterproof",
    description: "Compact waterproof Bluetooth speaker with 360-degree sound and 12-hour battery life.",
    price: "39.99",
    originalPrice: "59.99",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: "4.2",
    reviews: 543,
    freeShipping: 0,
  },
  {
    id: "7",
    name: "Men's Classic Cotton T-Shirt Pack of 3",
    description: "Comfortable 100% cotton t-shirts in classic colors, perfect for everyday wear.",
    price: "29.99",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Fashion",
    rating: "4.6",
    reviews: 1892,
    freeShipping: 0,
  },
  {
    id: "8",
    name: "Yoga Mat with Carrying Strap - Non-Slip",
    description: "Extra thick non-slip yoga mat with carrying strap, perfect for yoga and fitness.",
    price: "34.99",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    category: "Sports",
    rating: "4.5",
    reviews: 678,
    freeShipping: 0,
  },
  {
    id: "9",
    name: "Stainless Steel Water Bottle 32oz",
    description: "Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours.",
    price: "24.99",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "Sports",
    rating: "4.7",
    reviews: 934,
    freeShipping: 0,
  },
  {
    id: "10",
    name: "Digital Camera 24MP with Wifi",
    description: "High-quality 24MP digital camera with WiFi connectivity and 4K video recording.",
    price: "449.99",
    originalPrice: "599.99",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: "4.6",
    reviews: 412,
    freeShipping: 1,
  },
  {
    id: "11",
    name: "Cozy Throw Blanket - Soft Fleece",
    description: "Ultra-soft fleece throw blanket, perfect for cozy nights on the couch.",
    price: "29.99",
    originalPrice: "49.99",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop",
    category: "Home",
    rating: "4.8",
    reviews: 1543,
    freeShipping: 0,
  },
  {
    id: "12",
    name: "LED Desk Lamp with USB Charging Port",
    description: "Modern LED desk lamp with adjustable brightness and built-in USB charging port.",
    price: "34.99",
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    category: "Home",
    rating: "4.3",
    reviews: 287,
    freeShipping: 0,
  },
];

// Mock API functions
export const mockApi = {
  getAllProducts: async (): Promise<Product[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts;
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockProducts.find(product => product.id === id);
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts.filter(product => product.category === category);
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const lowerQuery = query.toLowerCase();
    return mockProducts.filter(
      product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
  },

  submitOrder: async (orderData: any): Promise<{ success: boolean; orderId: string; message: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      orderId: Math.random().toString(36).substring(7),
      message: "Order placed successfully"
    };
  }
};