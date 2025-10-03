import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart as CartIcon, Heart, Share2, Truck, Shield, RotateCw } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { addItem, setIsOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", id],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Product not found</h2>
            <Button onClick={() => setLocation("/")}>Go back to shop</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const price = parseFloat(product.price);
  const originalPrice = product.originalPrice ? parseFloat(product.originalPrice) : null;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const rating = parseFloat(product.rating);

  const images = [product.image];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price,
      image: product.image,
    }, quantity);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-6"
            data-testid="button-back"
          >
            ← Back to Shop
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  data-testid="img-product-main"
                />
                {discount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute top-4 left-4 text-base px-3 py-1"
                    data-testid="badge-discount"
                  >
                    -{discount}% OFF
                  </Badge>
                )}
              </div>
              
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === idx ? "border-primary" : "border-transparent"
                      }`}
                      data-testid={`button-thumbnail-${idx}`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-product-name">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(rating)
                            ? "fill-chart-4 text-chart-4"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-semibold" data-testid="text-rating">
                      {rating}
                    </span>
                  </div>
                  <span className="text-muted-foreground" data-testid="text-reviews">
                    ({product.reviews.toLocaleString()} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-primary" data-testid="text-price">
                  ${price.toFixed(2)}
                </span>
                {originalPrice && (
                  <span className="text-2xl text-muted-foreground line-through" data-testid="text-original-price">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-description">
                  {product.description}
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="font-semibold">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      data-testid="button-decrease-quantity"
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-semibold" data-testid="text-quantity">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      data-testid="button-increase-quantity"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 gap-2"
                    size="lg"
                    onClick={handleAddToCart}
                    data-testid="button-add-to-cart"
                  >
                    <CartIcon className="h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleAddToCart}
                    data-testid="button-buy-now"
                  >
                    Buy Now
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => setLiked(!liked)}
                    data-testid="button-wishlist"
                  >
                    <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                    {liked ? "In Wishlist" : "Add to Wishlist"}
                  </Button>
                  <Button variant="outline" size="icon" data-testid="button-share">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                {product.freeShipping === 1 && (
                  <div className="flex items-center gap-3 text-sm">
                    <Truck className="h-5 w-5 text-chart-3" />
                    <span className="font-medium">Free Shipping</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Secure Payment & Buyer Protection</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCw className="h-5 w-5 text-primary" />
                  <span>30-Day Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ShoppingCart />
    </div>
  );
}
