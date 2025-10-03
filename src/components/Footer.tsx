import { Separator } from "@/components/ui/separator";
import { SiVisa, SiMastercard, SiPaypal, SiAmericanexpress } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">ShopExpress</h3>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for everything you need. Quality products at
              unbeatable prices.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Fashion
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Home & Garden
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Sports
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 ShopExpress. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">We accept:</span>
            <div className="flex items-center gap-3">
              <SiVisa className="h-6 w-auto text-muted-foreground" />
              <SiMastercard className="h-6 w-auto text-muted-foreground" />
              <SiPaypal className="h-6 w-auto text-muted-foreground" />
              <SiAmericanexpress className="h-6 w-auto text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
