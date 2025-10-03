import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import ShoppingCart from "@/components/ShoppingCart";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product } from "@shared/schema";

export default function Home() {
  const [, setLocation] = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    filtered = filtered.filter((p) => {
      const price = parseFloat(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (minRating) {
      filtered = filtered.filter((p) => parseFloat(p.rating) >= minRating);
    }

    if (freeShippingOnly) {
      filtered = filtered.filter((p) => p.freeShipping === 1);
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "rating":
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, priceRange, minRating, freeShippingOnly, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="flex-1">
        <HeroSection />

        <div className="w-full px-4 md:px-6 lg:px-8 py-12 space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-6" data-testid="text-categories-title">
              Shop by Category
            </h2>
            <CategoryGrid />
          </section>

          <section>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-3xl font-bold" data-testid="text-products-title">
                {selectedCategory ? `${selectedCategory}` : "All Products"}
                {isLoading && <span className="text-sm text-muted-foreground ml-2">Loading...</span>}
                {!isLoading && <span className="text-sm text-muted-foreground ml-2">({filteredProducts.length})</span>}
              </h2>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="md:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                  data-testid="button-toggle-filters"
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]" data-testid="select-sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <aside
                className={`${
                  showFilters ? "block" : "hidden"
                } md:block w-full md:w-64 flex-shrink-0 order-first md:sticky md:top-4 md:self-start`}
              >
                <div className="md:max-h-[calc(100vh-8rem)] md:overflow-y-auto">
                  <FilterSidebar
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                    minRating={minRating}
                    onMinRatingChange={setMinRating}
                    freeShippingOnly={freeShippingOnly}
                    onFreeShippingChange={setFreeShippingOnly}
                    onClearAll={() => {
                      setSelectedCategory(null);
                      setPriceRange([0, 1000]);
                      setMinRating(null);
                      setFreeShippingOnly(false);
                    }}
                  />
                </div>
              </aside>

              <div className="flex-1">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading products...</p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-xl text-muted-foreground">No products found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => setLocation(`/product/${product.id}`)}
                        className="cursor-pointer"
                      >
                        <ProductCard
                          id={product.id}
                          name={product.name}
                          price={parseFloat(product.price)}
                          originalPrice={product.originalPrice ? parseFloat(product.originalPrice) : undefined}
                          image={product.image}
                          rating={parseFloat(product.rating)}
                          reviews={product.reviews}
                          freeShipping={product.freeShipping === 1}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <ShoppingCart />
    </div>
  );
}
