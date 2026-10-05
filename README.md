# ROGUE — Haute Atelier & Luxury Editorial Web Application

> **Rogue** is an architectural luxury fashion atelier web platform built with **React**, **Vite**, and **Tailwind CSS**. It embodies an editorial design philosophy (*Vogue*, *Harper's Bazaar*, *Kinfolk*, *Aesop*) featuring high-contrast serif typography, cinematic grayscale-to-color image reveals, interactive multi-perspective photography viewers, light/dark modes, and a complete executive operations dashboard.

---

## 🏛️ Design System & Aesthetic DNA

- **Typography**: High-contrast serif headlines (**Playfair Display**) paired with clean humanist sans-serif body text (**Inter**).
- **Monochrome & Gold Palette**: Warm Alabaster (`#F9F8F6`), Rich Charcoal (`#1A1A1A`), Pale Taupe (`#EBE5DE`), Warm Grey (`#6C6863`), and Metallic Gold accents (`#D4AF37`).
- **Architectural Radii**: Strictly `0px` rectangular precision throughout every element.
- **Cinematic Motion**: 1800ms ultra-slow grayscale-to-color hover reveals, gold sliding button animations (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`).
- **Architectural Guidelines**: 4 fixed vertical editorial gridlines and subtle paper grain noise overlay.
- **Custom Tooltips**: Instant luxury uppercase tooltips across all interactive touchpoints.

---

## 📦 Pages & Features

### 1. Landing Page
- **Hero Section**: Extreme typography scale (`text-9xl`), mixed italic serif headlines ("*Curated Excellence*"), vertical Japanese/Parisian editorial labels (`writing-mode: vertical-rl`), drop caps, and gold action triggers.
- **Curated Silhouettes Collection**: Interactive product gallery with tabs (`Complete Collection`, `Outerwear`, `Shirts`, `320GSM Tees`, `Trousers`).
  - **Multi-Perspective Photography**: Every product card displays interactive thumbnail selectors to preview all angles (front, back, sides, quarter profiles, and detail shots).
  - **Product Quick-View Pop-up**: Detailed inspection modal with zoom lens, angle switcher, size selector (`XS`, `S`, `M`, `L`, `XL`, `XXL`), quantity controller, and craftsmanship accordions.
- **Editorial Lookbook Spreads**: Visual chronicle carousel (Vol. 04, Vol. 03, Vol. 02) highlighting garment styling.
- **Atelier Services & Care**: Bespoke tailoring, private styling salon, and climate-neutral courier.
- **Press & Critic Acclaim**: Testimonials with star rating animations and avatar hover transitions.
- **FAQ Accordion**: 4 interactive questions with gold rotating icons.
- **Atelier Gazette**: VIP newsletter sign-up with underline-only input.

### 2. Login Page
- **Split-Screen Editorial Layout**: High-fashion quote & imagery on the left; clean minimalist authentication form on the right.
- **Dual Tab Mode**: Toggle between **Sign In** and **Private Atelier Membership**.
- **Input Validation & Password Toggle**: Live email/password validation and eye visibility toggle.
- **Simulated Authentication**: Seamlessly authenticates and redirects to the **Dashboard**.

### 3. Management Dashboard
- **Sidebar Navigation**: Overview & Analytics, Orders & Manifests, Archival Catalog Inventory, VIP Concierge Desk.
- **Executive Metrics**: Gross Atelier Revenue (`$128,450`), Active Acquisitions (`214`), Average Order Value (`$600`), and Global Client base.
- **Interactive Revenue Chart**: Interactive SVG quarterly and monthly revenue bars with hover tooltips.
- **Real-Time Orders Table**: Live search, status filters (`Delivered`, `In Transit`, `Atelier Processing`), and order audit inspector modal.
- **Inventory & Batch Allotment Manager**: View all 11 products with real photos, live stock increment/decrement controls, and photo inspection triggers.

### 4. Global Interactive Features
- **Shopping Bag Slideover Drawer**: Live quantity increment/decrement, free shipping progress bar, promo code engine (`ROGUEVIP` for 15% discount), and celebration confetti checkout simulation.
- **Global Instant Search Modal (`⌘K`)**: Instant search across all products, silhouettes, fabrics, and SKUs.
- **Dark & Light Mode Switcher**: Instant theme persistence with smooth transitions.

---

## 🚀 Quick Start & Development

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Production Build
```bash
npm run build
```
Generates an optimized production bundle inside the `dist/` directory.

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for Rogue Atelier"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com), click **Add New Project**, and import your GitHub repository.
3. Framework Preset: **Vite**
4. Click **Deploy**.

### Deploy to Netlify
1. Log in to [netlify.com](https://netlify.com) and select **Add new site** > **Import an existing project**.
2. Connect your GitHub repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy Rogue**.
