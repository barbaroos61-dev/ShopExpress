import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  freeShipping?: boolean;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  freeShipping,
}: ProductCardProps) {
  const { addItem, setIsOpen } = useCart();
  const [liked, setLiked] = useState(false);

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({ id, name, price, image });
    setIsOpen(true);
  };

  return (
    <Card className="group relative overflow-hidden hover-elevate" data-testid={`card-product-${id}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          data-testid={`img-product-${id}`}
        />
        {discount > 0 && (
          <Badge
            variant="destructive"
            className="absolute top-2 left-2"
            data-testid={`badge-discount-${id}`}
          >
            -{discount}%
          </Badge>
        )}
        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white ${
            liked ? "text-destructive" : ""
          }`}
          onClick={() => setLiked(!liked)}
          data-testid={`button-like-${id}`}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
        </Button>
      </div>

      <div className="p-3 space-y-2">
        <h3
          className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]"
          data-testid={`text-product-name-${id}`}
        >
          {name}
        </h3>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(rating)
                  ? "fill-chart-4 text-chart-4"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1" data-testid={`text-reviews-${id}`}>
            ({reviews})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary" data-testid={`text-price-${id}`}>
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span
              className="text-sm text-muted-foreground line-through"
              data-testid={`text-original-price-${id}`}
            >
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <Button
          className="w-full gap-2"
          onClick={handleAddToCart}
          data-testid={`button-add-to-cart-${id}`}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
