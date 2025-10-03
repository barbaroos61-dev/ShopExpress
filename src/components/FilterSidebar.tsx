import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface FilterSidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  minRating: number | null;
  onMinRatingChange: (rating: number | null) => void;
  freeShippingOnly: boolean;
  onFreeShippingChange: (value: boolean) => void;
  onClearAll: () => void;
  hideCategories?: boolean;
}

const categories = ["Electronics", "Fashion", "Home", "Sports"];

export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  freeShippingOnly,
  onFreeShippingChange,
  onClearAll,
  hideCategories = false,
}: FilterSidebarProps) {
  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="font-semibold mb-4" data-testid="text-filter-title">
          Filters
        </h3>
        <Button
          variant="ghost"
          className="text-sm text-primary"
          onClick={onClearAll}
          data-testid="button-clear-filters"
        >
          Clear All
        </Button>
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="font-medium text-sm">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={(value) => onPriceRangeChange(value as [number, number])}
          max={1000}
          step={10}
          className="my-4"
          data-testid="slider-price-range"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span data-testid="text-price-min">${priceRange[0]}</span>
          <span data-testid="text-price-max">${priceRange[1]}</span>
        </div>
      </div>

      <Separator />

      {!hideCategories && (
        <>
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Category</h4>
            {categories.map((category) => (
              <div key={category} className="flex items-center gap-2">
                <Checkbox
                  id={category}
                  checked={selectedCategory === category}
                  onCheckedChange={(checked) => {
                    onCategoryChange(checked ? category : null);
                  }}
                  data-testid={`checkbox-${category.toLowerCase()}`}
                />
                <Label
                  htmlFor={category}
                  className="text-sm cursor-pointer flex-1"
                  data-testid={`label-${category.toLowerCase()}`}
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>

          <Separator />
        </>
      )}

      <div className="space-y-3">
        <h4 className="font-medium text-sm">Rating</h4>
        {[4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center gap-2">
            <Checkbox
              id={`rating-${rating}`}
              checked={minRating === rating}
              onCheckedChange={(checked) => {
                onMinRatingChange(checked ? rating : null);
              }}
              data-testid={`checkbox-rating-${rating}`}
            />
            <Label
              htmlFor={`rating-${rating}`}
              className="text-sm cursor-pointer flex items-center gap-1"
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < rating ? "fill-chart-4 text-chart-4" : "fill-muted text-muted"
                  }`}
                />
              ))}
              <span className="ml-1">& Up</span>
            </Label>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="font-medium text-sm">Shipping</h4>
        <div className="flex items-center gap-2">
          <Checkbox
            id="free-shipping"
            checked={freeShippingOnly}
            onCheckedChange={(checked) => onFreeShippingChange(checked as boolean)}
            data-testid="checkbox-free-shipping"
          />
          <Label htmlFor="free-shipping" className="text-sm cursor-pointer">
            Free Shipping
          </Label>
        </div>
      </div>
    </Card>
  );
}
