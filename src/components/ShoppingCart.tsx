import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function ShoppingCart() {
  const [, setLocation] = useLocation();
  const { items, removeItem, updateQuantity, totalPrice, isOpen, setIsOpen } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2" data-testid="text-empty-cart">
              Your cart is empty
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add items to get started
            </p>
            <Button onClick={() => setIsOpen(false)} data-testid="button-continue-shopping">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4" data-testid={`cart-item-${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                    data-testid={`img-cart-item-${item.id}`}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm line-clamp-2" data-testid={`text-cart-item-name-${item.id}`}>
                      {item.name}
                    </h4>
                    <p className="text-sm font-bold text-primary mt-1" data-testid={`text-cart-item-price-${item.id}`}>
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        data-testid={`button-decrease-${item.id}`}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm" data-testid={`text-quantity-${item.id}`}>
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        data-testid={`button-increase-${item.id}`}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 ml-auto"
                        onClick={() => removeItem(item.id)}
                        data-testid={`button-remove-${item.id}`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span data-testid="text-subtotal">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-chart-3" data-testid="text-shipping">
                    {totalPrice >= 50 ? "Free" : "$5.99"}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary" data-testid="text-total">
                    ${(totalPrice + (totalPrice >= 50 ? 0 : 5.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  setIsOpen(false);
                  setLocation("/checkout");
                }}
                data-testid="button-checkout"
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsOpen(false)}
                data-testid="button-continue-shopping-bottom"
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
