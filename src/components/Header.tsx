import { Search, ShoppingCart, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-context";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/lib/theme-provider";
import { useLocation } from "wouter";

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export default function Header({ onSearch, searchQuery = "" }: HeaderProps) {
  const [, setLocation] = useLocation();
  const { totalItems, setIsOpen } = useCart();
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (value: string) => {
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <Button size="icon" variant="ghost" className="md:hidden" data-testid="button-menu">
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-8">
            <h1
              className="text-2xl font-bold text-primary cursor-pointer"
              onClick={() => setLocation("/")}
              data-testid="text-logo"
            >
              ShopExpress
            </h1>
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" className="text-sm" data-testid="link-electronics">
                Electronics
              </Button>
              <Button variant="ghost" className="text-sm" data-testid="link-fashion">
                Fashion
              </Button>
              <Button variant="ghost" className="text-sm" data-testid="link-home">
                Home & Garden
              </Button>
              <Button variant="ghost" className="text-sm" data-testid="link-sports">
                Sports
              </Button>
            </nav>
          </div>

          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="relative"
              onClick={() => setIsOpen(true)}
              data-testid="button-cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  data-testid="badge-cart-count"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              data-testid="input-search-mobile"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
