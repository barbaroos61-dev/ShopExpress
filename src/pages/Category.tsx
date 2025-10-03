import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import Header from "@/components/Header";
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
import { ArrowLeft } from "lucide-react";
import type { Product } from "@shared/schema";

const categoryNames: Record<string, string> = {
  electronics: "Electronics",
  fashion: "Fashion",
  home: "Home & Garden",
  sports: "Sports",
  watches: "Watches",
  cameras: "Cameras",
};

export default function Category() {
  const params = useParams<{ category: string }>();
  const [, setLocation] = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const categoryId = params.category || "";
  const categoryName = categoryNames[categoryId] || categoryId;

  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter((p) => p.category.toLowerCase() === categoryId.toLowerCase());

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
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
  }, [allProducts, categoryId, searchQuery, priceRange, minRating, freeShippingOnly, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <main className="flex-1">
        <div className="w-full px-4 md:px-6 lg:px-8 py-8 space-y-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold" data-testid="text-category-title">
                {categoryName}
              </h1>
              <p className="text-muted-foreground mt-1" data-testid="text-category-count">
                {isLoading ? "Loading..." : `${filteredProducts.length} products`}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
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

          <div className="flex gap-6 items-start">
            <aside
              className={`${
                showFilters ? "block" : "hidden"
              } md:block w-full md:w-64 flex-shrink-0 order-first md:sticky md:top-4 md:self-start`}
            >
              <div className="md:max-h-[calc(100vh-8rem)] md:overflow-y-auto">
                <FilterSidebar
                  selectedCategory={null}
                  onCategoryChange={() => {}}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  minRating={minRating}
                  onMinRatingChange={setMinRating}
                  freeShippingOnly={freeShippingOnly}
                  onFreeShippingChange={setFreeShippingOnly}
                  onClearAll={() => {
                    setPriceRange([0, 1000]);
                    setMinRating(null);
                    setFreeShippingOnly(false);
                  }}
                  hideCategories
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
                  <p className="text-xl text-muted-foreground">No products found in this category</p>
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
        </div>
      </main>

      <Footer />
      <ShoppingCart />
    </div>
  );
}
