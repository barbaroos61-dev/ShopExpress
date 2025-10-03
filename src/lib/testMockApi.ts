// Simple test script to verify mock API functionality
import { mockApi } from "./mockApi";

async function testMockApi() {
  console.log("Testing mock API...");

  try {
    // Test getAllProducts
    const products = await mockApi.getAllProducts();
    console.log(`✓ getAllProducts returned ${products.length} products`);

    // Test getProductById
    if (products.length > 0) {
      const product = await mockApi.getProductById(products[0].id);
      console.log(`✓ getProductById returned product: ${product?.name}`);
    }

    // Test getProductsByCategory
    const electronics = await mockApi.getProductsByCategory("Electronics");
    console.log(`✓ getProductsByCategory returned ${electronics.length} electronics products`);

    // Test searchProducts
    const searchResults = await mockApi.searchProducts("headphones");
    console.log(`✓ searchProducts returned ${searchResults.length} results`);

    // Test submitOrder
    const orderResult = await mockApi.submitOrder({ test: true });
    console.log(`✓ submitOrder returned success: ${orderResult.success}`);

    console.log("All tests passed!");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

// Run the test
testMockApi();