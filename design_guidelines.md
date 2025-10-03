# E-Commerce Platform Design Guidelines

## Design Approach

**Selected Approach:** Reference-Based, drawing inspiration from AliExpress, Shopify, and Amazon

**Key Design Principles:**
- Product-first visual hierarchy with large, high-quality images
- Trust-building through reviews, ratings, and social proof
- Seamless browsing-to-purchase flow with persistent cart visibility
- Dense information architecture balanced with breathing room
- Mobile-first responsive design for shopping on-the-go

## Color Palette

**Light Mode:**
- Primary Brand: 255 45% 48% (Vibrant red-orange, trust and energy)
- Background: 0 0% 100% (Pure white for product clarity)
- Surface: 0 0% 98% (Off-white cards)
- Text Primary: 220 13% 18%
- Text Secondary: 220 9% 46%
- Border: 220 13% 91%
- Success (In Stock): 142 71% 45%
- Warning (Low Stock): 38 92% 50%

**Dark Mode:**
- Primary Brand: 255 55% 58% (Brighter for contrast)
- Background: 222 47% 11%
- Surface: 217 33% 17%
- Text Primary: 210 40% 98%
- Text Secondary: 215 20% 65%
- Border: 217 33% 24%
- Success: 142 71% 55%
- Warning: 38 92% 60%

## Typography

**Font Families:**
- Primary: 'Inter' (product names, headings, UI)
- Secondary: 'DM Sans' (body text, descriptions)

**Scale:**
- Hero Headline: text-5xl md:text-6xl font-bold
- Product Title: text-xl font-semibold
- Section Headers: text-3xl md:text-4xl font-bold
- Price (Large): text-2xl font-bold
- Price (Regular): text-xl font-semibold
- Body: text-base
- Caption/Meta: text-sm text-secondary

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20 (p-2, m-4, gap-6, py-8, etc.)

**Container Strategy:**
- Max width: max-w-7xl mx-auto
- Horizontal padding: px-4 md:px-6 lg:px-8
- Section spacing: py-12 md:py-16 lg:py-20

**Grid Patterns:**
- Product Grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4
- Category Cards: grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3
- Feature Grid: grid-cols-1 md:grid-cols-3 gap-6

## Component Library

**Navigation:**
- Sticky header with search bar prominence (occupies 50% of header width on desktop)
- Category mega-menu with image previews
- Cart icon with badge count (top-right, always visible)
- Account dropdown with order history quick access

**Product Cards:**
- Aspect ratio 1:1 product images with hover zoom
- Wishlist heart icon (top-right overlay)
- 5-star rating with review count
- Price with strikethrough original price for discounts
- "Free Shipping" badge when applicable
- Quick "Add to Cart" button on hover (desktop)

**Shopping Cart (Slide-out Panel):**
- Right-side drawer, 400px wide on desktop
- Cart items with thumbnail, title, quantity selector, remove button
- Subtotal, shipping estimate, total
- Prominent "Checkout" CTA button
- "Continue Shopping" link

**Product Detail Page:**
- Large image gallery with thumbnails (left 60%, details right 40% on desktop)
- Image zoom on hover/click
- Variant selectors (color swatches, size buttons)
- Quantity input with +/- buttons
- Dual CTAs: "Add to Cart" (primary) + "Buy Now" (outline)
- Tabs: Description, Reviews, Shipping & Returns
- Related products carousel

**Filters & Search:**
- Left sidebar filters (desktop) / bottom sheet (mobile)
- Price range slider
- Category checkboxes with product counts
- Rating filter (4+ stars, etc.)
- Color swatches
- Sort dropdown: Relevance, Price (Low/High), Bestsellers, Newest

**Forms (Checkout):**
- Multi-step progress indicator
- Shipping address with address autocomplete
- Payment method cards (visual radio buttons)
- Order summary sticky on right (desktop)
- Input fields with floating labels

**Trust Elements:**
- Review cards with verified purchase badges
- Star ratings everywhere (aggregate + individual)
- Seller rating and response time
- Security badges in footer
- Money-back guarantee banner

**CTAs & Buttons:**
- Primary: Solid with brand color, rounded-lg, px-8 py-3
- Secondary: Outline variant with blurred background when over images
- Icon buttons: Wishlist, share, compare (ghost style)

## Images

**Hero Section:**
- Full-width banner carousel (1920x600px recommended)
- 3-5 rotating promotional banners showcasing deals, new arrivals, seasonal campaigns
- Text overlay with CTA buttons (use blurred background for outline buttons)

**Category Images:**
- Square thumbnails (300x300px) for category cards
- Lifestyle images showing products in use

**Product Images:**
- High-resolution product photos (800x800px minimum)
- Multiple angles (front, side, detail shots)
- White or neutral backgrounds for consistency
- Lifestyle shots showing scale and context

**Trust & Social Proof:**
- Customer review photos (user-generated content)
- Seller/brand logos for verification
- Payment method icons in footer

**Promotional:**
- Flash sale countdown banners with urgency-inducing imagery
- Free shipping threshold graphics

This design creates a comprehensive, conversion-optimized e-commerce experience balancing visual appeal with functionality. The dense product grids maximize browsing efficiency while maintaining clarity through generous spacing and strong typography hierarchy.