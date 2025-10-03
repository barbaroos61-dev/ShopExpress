import { QueryClient } from "@tanstack/react-query";
import { mockApi } from "./mockApi";

// Mock query function that uses our mock API
const mockQueryFn = async ({ queryKey }) => {
  const path = queryKey[0];
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (path === "/api/products") {
    return await mockApi.getAllProducts();
  }
  
  if (typeof path === "string" && path.startsWith("/api/products/")) {
    const productId = path.split("/")[3];
    const product = await mockApi.getProductById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }
  
  // For any other path, return an empty array or object
  return [];
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // @ts-ignore
      queryFn: mockQueryFn,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});