import { Card } from "@/components/ui/card";
import { Smartphone, Shirt, Home, Dumbbell, Watch, Camera } from "lucide-react";
import { useLocation } from "wouter";

const categories = [
  { id: "electronics", name: "Electronics", icon: Smartphone, count: 2453 },
  { id: "fashion", name: "Fashion", icon: Shirt, count: 5621 },
  { id: "home", name: "Home & Garden", icon: Home, count: 1832 },
  { id: "sports", name: "Sports", icon: Dumbbell, count: 943 },
  { id: "watches", name: "Watches", icon: Watch, count: 672 },
  { id: "cameras", name: "Cameras", icon: Camera, count: 421 },
];

export default function CategoryGrid() {
  const [, setLocation] = useLocation();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {categories.map((category) => (
        <Card
          key={category.id}
          className="p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover-elevate active-elevate-2"
          onClick={() => setLocation(`/category/${category.id}`)}
          data-testid={`card-category-${category.id}`}
        >
          <category.icon className="h-8 w-8 text-primary" />
          <div className="text-center">
            <h3 className="font-semibold text-sm" data-testid={`text-category-name-${category.id}`}>
              {category.name}
            </h3>
            <p className="text-xs text-muted-foreground" data-testid={`text-category-count-${category.id}`}>
              {category.count.toLocaleString()} items
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
