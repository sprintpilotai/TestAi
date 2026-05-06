# Board Game Sales Web Application - MVP Execution Plan

**Project**: Web application for selling board games  
**Run ID**: e91bb569-4d0f-4dba-a808-f62a1131c876  
**Agent**: Planner  
**Date**: 2025-05-06

---

## 1. Architecture Decision

### Tech Stack
- **Frontend**: Next.js 14 (App Router) with TypeScript
  - React 18 for UI components
  - Tailwind CSS for styling
  - Shadcn/ui for pre-built accessible components
  - React Hook Form + Zod for form validation
  
- **Backend**: Next.js API Routes (serverless functions)
  - tRPC for type-safe API layer (optional, can use REST initially)
  - NextAuth.js for authentication
  
- **Database**: PostgreSQL via Supabase or Vercel Postgres
  - Prisma ORM for type-safe database access
  - Database migrations managed via Prisma Migrate
  
- **Payment Processing**: Stripe integration
  - Stripe Checkout for payment flow
  - Webhooks for order confirmation
  
- **Image Storage**: Cloudinary or Vercel Blob Storage
  
- **Deployment**: Vercel (recommended) or Netlify
  - Automatic preview deployments for PRs
  - Edge functions for performance

### Repository Structure
```
board-games-store/
├── .github/
│   └── workflows/
│       └── ci.yml                 # CI/CD pipeline
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Database migrations
├── public/
│   ├── images/                    # Static images
│   └── icons/                     # Favicon, etc.
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/               # Auth routes (login, signup)
│   │   ├── (shop)/               # Main shop routes
│   │   │   ├── page.tsx          # Homepage/catalog
│   │   │   ├── products/         # Product pages
│   │   │   ├── cart/             # Shopping cart
│   │   │   └── checkout/         # Checkout flow
│   │   ├── admin/                # Admin dashboard
│   │   ├── api/                  # API routes
│   │   │   ├── auth/             # NextAuth endpoints
│   │   │   ├── products/         # Product CRUD
│   │   │   ├── orders/           # Order management
│   │   │   └── webhooks/         # Payment webhooks
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── ui/                   # Reusable UI components
│   │   ├── products/             # Product-specific components
│   │   ├── cart/                 # Cart components
│   │   └── layout/               # Header, Footer, Nav
│   ├── lib/
│   │   ├── prisma.ts             # Prisma client
│   │   ├── stripe.ts             # Stripe client
│   │   ├── auth.ts               # Auth utilities
│   │   └── utils.ts              # Helper functions
│   ├── types/                    # TypeScript types
│   └── hooks/                    # Custom React hooks
├── tests/
│   ├── unit/                     # Unit tests
│   └── e2e/                      # E2E tests (Playwright)
├── .env.example                  # Environment variables template
├── .eslintrc.json               # ESLint config
├── .prettierrc                  # Prettier config
├── next.config.js               # Next.js config
├── package.json
├── tsconfig.json
└── README.md
```

### Key Dependencies
```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@prisma/client": "^5.12.0",
    "next-auth": "^4.24.0",
    "stripe": "^15.0.0",
    "@tanstack/react-query": "^5.29.0",
    "zod": "^3.23.0",
    "react-hook-form": "^7.51.0",
    "@hookform/resolvers": "^3.3.0",
    "tailwindcss": "^3.4.0",
    "lucide-react": "^0.368.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "prisma": "^5.12.0",
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "eslint": "^8.57.0",
    "prettier": "^3.2.0",
    "@playwright/test": "^1.43.0"
  }
}
```

---

## 2. Backlog: Ordered Features & Tasks

### Phase 1: Foundation (PRs 1-3)
**Priority**: Critical - Required for any functionality

#### Task 1.1: Project Setup & Infrastructure
**Acceptance Criteria**:
- [ ] Next.js 14 project initialized with TypeScript
- [ ] Tailwind CSS configured with custom design tokens
- [ ] ESLint + Prettier configured with consistent rules
- [ ] Git repository initialized with .gitignore
- [ ] Environment variables template (.env.example) created
- [ ] README.md with setup instructions
- [ ] CI/CD pipeline (GitHub Actions) for linting and type-checking
- [ ] Vercel project linked (deployment preview ready)

**Estimated Effort**: 2-3 hours

---

#### Task 1.2: Database Schema & ORM Setup
**Acceptance Criteria**:
- [ ] PostgreSQL database provisioned (Supabase/Vercel Postgres)
- [ ] Prisma ORM installed and configured
- [ ] Database schema defined for:
  - Users (id, email, name, role, createdAt)
  - Products (id, name, description, price, stock, images[], category, publisher, playerCount, playTime, age, createdAt, updatedAt)
  - Categories (id, name, slug)
  - Orders (id, userId, status, total, shippingAddress, createdAt)
  - OrderItems (id, orderId, productId, quantity, price)
- [ ] Initial migration created and applied
- [ ] Seed script with sample board games (10-15 products)
- [ ] Prisma Client generated and tested

**Estimated Effort**: 3-4 hours

---

#### Task 1.3: Authentication System
**Acceptance Criteria**:
- [ ] NextAuth.js configured with email/password provider
- [ ] User registration flow (email, password, name)
- [ ] Login/logout functionality
- [ ] Session management with JWT
- [ ] Protected routes (middleware for auth)
- [ ] Admin role detection (admin vs. customer)
- [ ] Password hashing with bcrypt
- [ ] Basic profile page (view email, name)
- [ ] Auth UI components (LoginForm, SignupForm)

**Estimated Effort**: 4-5 hours

---

### Phase 2: Core Shopping Experience (PRs 4-7)
**Priority**: High - Essential MVP features

#### Task 2.1: Product Catalog & Listing
**Acceptance Criteria**:
- [ ] Homepage displays product grid (paginated, 12 per page)
- [ ] Product card component shows: image, name, price, "Add to Cart" button
- [ ] Category filter dropdown (all categories from DB)
- [ ] Search bar filters by product name
- [ ] Price range filter (slider or min/max inputs)
- [ ] Player count filter (1, 2, 3, 4+ players)
- [ ] Sort options (price low-high, high-low, newest, name A-Z)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Loading states and empty states

**Estimated Effort**: 5-6 hours

---

#### Task 2.2: Product Detail Page
**Acceptance Criteria**:
- [ ] Dynamic route `/products/[id]` displays full product info
- [ ] Image gallery (multiple images, thumbnail navigation)
- [ ] Product details: name, price, description, publisher, player count, play time, age rating
- [ ] Stock availability indicator (In Stock / Out of Stock)
- [ ] Quantity selector (increment/decrement, max = stock)
- [ ] "Add to Cart" button (disabled if out of stock)
- [ ] Related products section (same category, 4 items)
- [ ] Breadcrumb navigation (Home > Category > Product)
- [ ] SEO metadata (title, description, Open Graph)

**Estimated Effort**: 4-5 hours

---

#### Task 2.3: Shopping Cart
**Acceptance Criteria**:
- [ ] Client-side cart state management (Zustand or React Context)
- [ ] Cart persisted in localStorage
- [ ] Cart icon in header with item count badge
- [ ] Cart drawer/modal with list of items
- [ ] Each cart item shows: image, name, price, quantity selector, remove button
- [ ] Subtotal calculation (quantity × price for each item)
- [ ] Total price displayed
- [ ] "Continue Shopping" and "Proceed to Checkout" buttons
- [ ] Empty cart state with CTA to browse products
- [ ] Real-time updates when cart changes

**Estimated Effort**: 4-5 hours

---

#### Task 2.4: Checkout Flow
**Acceptance Criteria**:
- [ ] Protected checkout route (requires authentication)
- [ ] Multi-step checkout form:
  1. Shipping address (name, street, city, postal code, country)
  2. Review order (editable cart, shipping address summary)
  3. Payment (Stripe Checkout integration)
- [ ] Form validation with Zod schema
- [ ] Order summary sidebar (items, subtotal, shipping, total)
- [ ] "Place Order" button creates order in DB with status "pending"
- [ ] Redirect to Stripe Checkout session
- [ ] Success page after payment with order confirmation
- [ ] Email confirmation (optional for MVP, can log to console)

**Estimated Effort**: 6-7 hours

---

### Phase 3: Order Management (PRs 8-9)
**Priority**: High - Required for completing transactions

#### Task 3.1: Payment Processing & Webhooks
**Acceptance Criteria**:
- [ ] Stripe Checkout session created via API route
- [ ] Webhook endpoint (`/api/webhooks/stripe`) to handle payment events
- [ ] Webhook signature verification (Stripe secret)
- [ ] Order status updated to "paid" on successful payment
- [ ] Order status updated to "failed" on payment failure
- [ ] Stock decremented for purchased products
- [ ] Idempotency handling (prevent duplicate processing)
- [ ] Error logging for failed webhooks

**Estimated Effort**: 4-5 hours

---

#### Task 3.2: User Order History
**Acceptance Criteria**:
- [ ] `/account/orders` page lists all user orders
- [ ] Each order displays: order number, date, status, total, items
- [ ] Expandable order details (shipping address, item list)
- [ ] Order status badges (Pending, Paid, Shipped, Delivered, Cancelled)
- [ ] Pagination for orders (10 per page)
- [ ] Empty state for new users with no orders

**Estimated Effort**: 3-4 hours

---

### Phase 4: Admin Dashboard (PRs 10-12)
**Priority**: Medium - Required for managing store

#### Task 4.1: Admin Product Management
**Acceptance Criteria**:
- [ ] `/admin/products` page (protected, admin-only)
- [ ] Product list table (name, price, stock, status, actions)
- [ ] Create product form (all fields, image upload to Cloudinary/Blob)
- [ ] Edit product form (pre-filled with existing data)
- [ ] Delete product (soft delete or confirmation modal)
- [ ] Bulk actions (publish/unpublish, delete)
- [ ] Search and filter products
- [ ] Pagination (20 per page)

**Estimated Effort**: 6-7 hours

---

#### Task 4.2: Admin Order Management
**Acceptance Criteria**:
- [ ] `/admin/orders` page lists all orders
- [ ] Order table: order number, customer, date, status, total, actions
- [ ] Filter by status (All, Pending, Paid, Shipped, Delivered)
- [ ] Update order status dropdown (mark as shipped, delivered)
- [ ] View order details (customer info, items, shipping address)
- [ ] Search orders by customer name or order number
- [ ] Pagination (20 per page)

**Estimated Effort**: 5-6 hours

---

#### Task 4.3: Admin Analytics Dashboard
**Acceptance Criteria**:
- [ ] `/admin` dashboard with key metrics:
  - Total revenue (sum of paid orders)
  - Total orders (all statuses)
  - Total products (published)
  - Total customers (registered users)
- [ ] Recent orders list (last 10)
- [ ] Top-selling products (by quantity sold, top 5)
- [ ] Date range filter (last 7/30/90 days, all time)
- [ ] Charts (optional, can use Recharts or simple bars)

**Estimated Effort**: 4-5 hours

---

### Phase 5: Polish & Optimization (PRs 13-15)
**Priority**: Low - Nice-to-have improvements

#### Task 5.1: SEO & Performance Optimization
**Acceptance Criteria**:
- [ ] Server-side rendering (SSR) for product pages
- [ ] Static generation (SSG) for homepage and category pages
- [ ] Optimized images (next/image with blur placeholders)
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Open Graph and Twitter Card metadata
- [ ] Google Analytics or Plausible integration (optional)
- [ ] Lighthouse score > 90 for performance

**Estimated Effort**: 3-4 hours

---

#### Task 5.2: Email Notifications
**Acceptance Criteria**:
- [ ] Order confirmation email (via Resend or SendGrid)
- [ ] Order shipped email with tracking link (if available)
- [ ] Password reset email (if implementing password reset)
- [ ] Email templates (HTML + plain text)
- [ ] Email preview in dev environment

**Estimated Effort**: 3-4 hours

---

#### Task 5.3: Error Handling & Logging
**Acceptance Criteria**:
- [ ] Global error boundary for React errors
- [ ] API error responses standardized (JSON with error codes)
- [ ] 404 page (custom design)
- [ ] 500 error page (custom design)
- [ ] Logging service (Sentry or LogRocket) integrated
- [ ] Client-side error tracking
- [ ] API rate limiting (optional, can use Vercel's built-in)

**Estimated Effort**: 3-4 hours

---

## 3. Risk Register

### Risk 1: Payment Gateway Integration Complexity
**Impact**: High | **Likelihood**: Medium

**Description**: Stripe Checkout and webhook handling can be complex, especially ensuring idempotency and handling edge cases (network failures, duplicate webhooks).

**Mitigation**:
- Use Stripe's official Node.js SDK and follow best practices
- Implement webhook signature verification immediately
- Add comprehensive logging for all payment events
- Test webhooks locally using Stripe CLI (`stripe listen`)
- Store Stripe event IDs to prevent duplicate processing
- Create a manual "mark as paid" admin action as fallback

**Fallback Plan**: If Stripe integration is blocked, implement a "cash on delivery" option to unblock order flow, then add Stripe later.

---

### Risk 2: Database Schema Changes Mid-Development
**Impact**: Medium | **Likelihood**: Medium

**Description**: As we build, we may discover missing fields or relationships in the database schema, requiring migrations that could break existing data.

**Mitigation**:
- Design schema upfront with buffer for future fields (e.g., `metadata` JSONB column)
- Use Prisma Migrate in dev mode for iterative schema changes
- Never delete columns in production—use soft deletes or add new columns
- Create comprehensive seed data to test schema changes
- Review schema with stakeholder before Phase 2 begins

**Fallback Plan**: If schema issues arise, pause feature work and refactor schema in isolated PR before continuing.

---

### Risk 3: Image Upload & Storage Costs
**Impact**: Medium | **Likelihood**: Low

**Description**: Storing high-resolution board game images could exceed free tier limits on Cloudinary or Vercel Blob, incurring unexpected costs.

**Mitigation**:
- Use image optimization (compress before upload, max 2MB per image)
- Store images at reasonable dimensions (max 1200px wide)
- Use Vercel Blob's free tier (100GB egress) or Cloudinary (25 credits/month)
- Implement admin upload limit (max 5 images per product)
- Monitor storage usage via provider dashboard
- Add image size validation in API routes

**Fallback Plan**: If storage costs are a concern, serve images from public/images folder (commit to repo) for MVP, then migrate to CDN later.

---

### Risk 4: Authentication Edge Cases (Password Reset, Email Verification)
**Impact**: Low | **Likelihood**: High

**Description**: Full authentication systems require password reset and email verification flows, which add scope and dependency on email provider.

**Mitigation**:
- Defer password reset to Phase 5 (not critical for MVP)
- Skip email verification for MVP (mark all accounts as verified)
- Document these limitations in README for post-MVP roadmap
- Use NextAuth.js's built-in session management to reduce custom code

**Fallback Plan**: If authentication becomes a blocker, simplify to admin-only login (hardcoded credentials) and skip customer registration for initial demo.

---

### Risk 5: Cross-Browser Compatibility & Mobile Responsiveness
**Impact**: Medium | **Likelihood**: Low

**Description**: UI may look broken on certain browsers (Safari, older Chrome) or mobile devices without thorough testing.

**Mitigation**:
- Use Tailwind CSS utility classes (battle-tested for responsiveness)
- Test on Chrome, Firefox, Safari during development
- Use BrowserStack or real devices for final QA
- Implement mobile-first design (build small screen first, then scale up)
- Add Playwright E2E tests for critical flows (checkout, add to cart)

**Fallback Plan**: If cross-browser issues are found late, create a "best viewed on Chrome" notice and document browser support in README.

---

## 4. PR Sequence (Recommended Implementation Order)

### Sprint 1: Foundation (Week 1)
**Goal**: Get infrastructure and data layer running

1. **PR #1: Project Setup & Tooling**
   - Scaffold Next.js app, configure Tailwind, ESLint, Prettier
   - Add CI/CD pipeline (GitHub Actions)
   - Files: `package.json`, `next.config.js`, `tsconfig.json`, `.github/workflows/ci.yml`

2. **PR #2: Database Schema & Prisma Setup**
   - Define Prisma schema (Users, Products, Orders, Categories)
   - Create initial migration
   - Add seed script with 10 sample board games
   - Files: `prisma/schema.prisma`, `prisma/seed.ts`, `src/lib/prisma.ts`

3. **PR #3: Authentication System**
   - Integrate NextAuth.js with email/password provider
   - Create login, signup, logout flows
   - Add middleware for protected routes
   - Files: `src/app/api/auth/[...nextauth]/route.ts`, `src/lib/auth.ts`, `src/app/(auth)/login/page.tsx`

---

### Sprint 2: Core Shopping (Week 2)
**Goal**: Build customer-facing product discovery and cart

4. **PR #4: Product Catalog & Homepage**
   - Create product listing page with filters, search, pagination
   - Build ProductCard component
   - Add category filter and sort options
   - Files: `src/app/(shop)/page.tsx`, `src/components/products/ProductCard.tsx`, `src/app/api/products/route.ts`

5. **PR #5: Product Detail Page**
   - Dynamic route for individual products
   - Image gallery, product info, quantity selector
   - Related products section
   - Files: `src/app/(shop)/products/[id]/page.tsx`, `src/components/products/ImageGallery.tsx`

6. **PR #6: Shopping Cart**
   - Client-side cart state (localStorage persistence)
   - Cart drawer with item list, quantity controls, remove items
   - Cart badge in header
   - Files: `src/lib/cart.ts`, `src/components/cart/CartDrawer.tsx`, `src/components/layout/Header.tsx`

7. **PR #7: Checkout Flow (Part 1: Forms)**
   - Multi-step checkout form (shipping address, review)
   - Form validation with React Hook Form + Zod
   - Order summary sidebar
   - Files: `src/app/(shop)/checkout/page.tsx`, `src/components/checkout/ShippingForm.tsx`

---

### Sprint 3: Payments & Orders (Week 3)
**Goal**: Complete transaction flow and order management

8. **PR #8: Stripe Integration & Webhooks**
   - Create Stripe Checkout session
   - Webhook endpoint for payment confirmation
   - Update order status and decrement stock
   - Files: `src/lib/stripe.ts`, `src/app/api/checkout/route.ts`, `src/app/api/webhooks/stripe/route.ts`

9. **PR #9: User Order History**
   - Order history page with list of user's orders
   - Expandable order details (items, shipping)
   - Status badges
   - Files: `src/app/(shop)/account/orders/page.tsx`, `src/components/orders/OrderCard.tsx`

---

### Sprint 4: Admin Dashboard (Week 4)
**Goal**: Enable store management for admin users

10. **PR #10: Admin Product Management**
    - Admin products list with CRUD operations
    - Create/edit product forms with image upload
    - Bulk actions
    - Files: `src/app/admin/products/page.tsx`, `src/app/api/admin/products/route.ts`

11. **PR #11: Admin Order Management**
    - Admin orders list with status filters
    - Update order status (mark as shipped, delivered)
    - View order details
    - Files: `src/app/admin/orders/page.tsx`, `src/app/api/admin/orders/[id]/route.ts`

12. **PR #12: Admin Analytics Dashboard**
    - Dashboard with revenue, orders, products, customers metrics
    - Top-selling products
    - Recent orders list
    - Files: `src/app/admin/page.tsx`, `src/app/api/admin/analytics/route.ts`

---

### Sprint 5: Polish (Week 5, Optional)
**Goal**: Improve SEO, performance, and user experience

13. **PR #13: SEO & Performance Optimization**
    - Server-side rendering for product pages
    - Image optimization, sitemap, Open Graph metadata
    - Files: `src/app/sitemap.ts`, `src/app/robots.ts`, `next.config.js` (image config)

14. **PR #14: Email Notifications**
    - Order confirmation and shipping emails
    - Integrate Resend or SendGrid
    - Files: `src/lib/email.ts`, `src/emails/order-confirmation.tsx` (React Email)

15. **PR #15: Error Handling & Logging**
    - Custom 404 and 500 pages
    - Integrate Sentry for error tracking
    - Standardize API error responses
    - Files: `src/app/not-found.tsx`, `src/app/error.tsx`, `src/lib/logger.ts`

---

## 5. Blocking Unknowns (To Resolve Before Builder Starts)

### ✅ Resolved
- **Tech Stack**: Next.js 14 + TypeScript confirmed
- **Database**: PostgreSQL (Supabase or Vercel Postgres)
- **Deployment**: Vercel recommended

### ⚠️ To Confirm with Stakeholder

1. **Payment Gateway Account**
   - **Question**: Do we have a Stripe account set up? Need publishable key and secret key.
   - **Impact**: Blocks PR #8 (Stripe Integration)
   - **Action**: If not, create Stripe account before Sprint 3, or use test mode keys for MVP.

2. **Image Storage Provider**
   - **Question**: Prefer Cloudinary (free tier: 25 credits/month) or Vercel Blob (100GB egress)?
   - **Impact**: Affects PR #10 (Admin Product Management)
   - **Action**: Choose provider before Sprint 4, or default to Vercel Blob for simplicity.

3. **Email Provider for Notifications**
   - **Question**: Use Resend (100 emails/day free) or SendGrid (100 emails/day free)?
   - **Impact**: Optional for MVP (PR #14), can defer to post-MVP.
   - **Action**: If email is critical, set up Resend before Sprint 5; otherwise skip for MVP.

4. **Domain Name & Branding**
   - **Question**: What domain will this be deployed to? Any specific branding (logo, color scheme)?
   - **Impact**: Minimal—can use Vercel subdomain (`board-games.vercel.app`) for MVP.
   - **Action**: Provide domain and logo before PR #1, or use placeholder branding.

5. **Admin User Credentials**
   - **Question**: How should the first admin user be created? Seed script with hardcoded credentials, or manual DB insert?
   - **Impact**: Blocks admin access in PRs #10-12.
   - **Action**: Add admin user to seed script (`email: admin@example.com`, `password: admin123`, `role: ADMIN`). Document in README.

6. **Shipping Cost Calculation**
   - **Question**: Fixed shipping cost, free shipping, or calculated by weight/region?
   - **Impact**: Affects checkout total calculation (PR #7).
   - **Action**: Default to free shipping for MVP; add shipping cost field to orders table for future.

---

## 6. Success Criteria for MVP

The MVP is considered complete when:

1. **Customer Journey**:
   - User can browse products, filter by category, search by name
   - User can view product details and add items to cart
   - User can register, login, and checkout with Stripe payment
   - User receives order confirmation and can view order history

2. **Admin Capabilities**:
   - Admin can log in and access admin dashboard
   - Admin can create, edit, delete products
   - Admin can view and update order statuses

3. **Technical Quality**:
   - All PRs pass CI/CD checks (lint, type-check)
   - Core flows have basic tests (at minimum, API routes tested with mock data)
   - Application deploys successfully to Vercel
   - No critical security issues (API routes protected, payments secure)

4. **Documentation**:
   - README with setup instructions, environment variables, and deployment guide
   - Code is commented where logic is non-obvious
   - PLAN.md (this document) archived for reference

---

## 7. Post-MVP Roadmap (Out of Scope for Initial Build)

- **Wishlists**: Allow users to save favorite products
- **Reviews & Ratings**: Let customers review purchased products
- **Inventory Alerts**: Notify admins when stock is low
- **Advanced Search**: Filters for game mechanics, themes, designers
- **Multi-language Support**: i18n for Spanish, English, etc.
- **Discount Codes**: Coupon system for promotions
- **Order Tracking**: Integration with shipping carriers (USPS, UPS, etc.)
- **Customer Support Chat**: Live chat or ticketing system
- **Mobile App**: React Native version for iOS/Android

---

## 8. Notes for Builder Agent

- **Code Style**: Use TypeScript strict mode, prefer functional components with hooks
- **Naming Conventions**: Use camelCase for variables/functions, PascalCase for components, kebab-case for files
- **Component Library**: Use Shadcn/ui components when possible (Button, Input, Card, etc.) to speed up UI development
- **Testing Priority**: Focus on API route tests first, then add E2E tests for checkout flow
- **Performance**: Use React.lazy() and dynamic imports for admin dashboard (not critical path for customers)
- **Security**: Never commit .env files, always validate user input, sanitize SQL queries via Prisma

---

**Next Step**: Hand off to Builder Agent to implement PR #1 (Project Setup & Tooling).
