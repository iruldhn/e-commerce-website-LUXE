# LUXE — Maison de Mode

> *A premium dark-luxury e-commerce website built with pure HTML, CSS & JavaScript.*

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=flat-square&logo=fontawesome&logoColor=white)
![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=flat-square&logo=google&logoColor=white)

---

## ✦ Overview

**LUXE** is a fully hand-crafted, multi-page e-commerce website built without any frameworks. Designed around a dark luxury editorial aesthetic — deep blacks, gold accents, and Cormorant Garamond typography — every page is refined, responsive, and interaction-rich.

---

## ✦ Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, featured products, categories, testimonials |
| Shop | `shop.html` | Product grid with sidebar filter, sort, quick view modal |
| Cart | `cart.html` | Live cart, coupon system, order summary, upsell |
| About | `about.html` | Brand story, animated stats, timeline, team |
| Blog | `blog.html` | Editorial journal, category filter, sidebar |
| Contact | `contact.html` | Validated form, FAQ accordion, concierge team |

---

## ✦ Features

### 🎨 Design
- Dark luxury theme — `#0e0d0c` base, `#c9a96e` gold accent
- Dual typeface system: **Cormorant Garamond** (display) + **Jost** (body)
- Fully responsive across all breakpoints (mobile, tablet, desktop)
- Consistent design language across all 6 pages

### ⚡ Interactions
- Page loader animation on first visit
- Scroll-triggered reveal animations (IntersectionObserver)
- Sticky header that shrinks on scroll
- Mobile navigation drawer with overlay
- Back-to-top button with smooth scroll

### 🛍️ Shop
- Category filter tabs (All / Women / Men / Accessories / New)
- Sidebar with price range slider, brand checkbox, colour swatches, size grid
- Grid ↔ List view toggle (saved to localStorage)
- Sort by: Featured, Price, Rating, Newest
- Quick View modal with size picker, quantity control, and add-to-cart
- Wishlist toggle on all product cards

### 🛒 Cart
- Real-time subtotal & total recalculation
- Animated item remove (slide + collapse)
- Coupon code system (`LUXE20`, `SAVE50`, `VIP15`)
- Free shipping threshold indicator
- Checkout button with loading state
- "You May Also Like" upsell section

### 📖 About
- Animated counter (0 → target) triggered on scroll
- Zigzag timeline with slide-in animations
- Team cards with grayscale → colour hover effect
- App section with phone mockup video frame

### 📰 Blog
- Hero with Ken Burns zoom effect
- Category filter (also synced with sidebar widgets)
- Sidebar search that filters articles in real time
- Tag cloud that triggers search on click
- Featured article with large editorial layout

### 📬 Contact
- Full form validation with individual field error messages
- Character counter on textarea (max 500)
- Custom styled checkbox, select, and inputs
- FAQ accordion (one open at a time)
- Google Maps embed with dark filter
- Clickable concierge advisor cards

---

## ✦ File Structure

```
LUXE/
│
├── index.html          # Home page
├── shop.html           # Shop / Collections
├── cart.html           # Shopping cart
├── about.html          # Brand story
├── blog.html           # Journal / Blog
├── contact.html        # Contact page
│
├── style.css           # Global styles (shared across all pages)
├── script.js           # Global scripts (shared across all pages)
│
├── shop.css            # Shop-specific styles
├── shop.js             # Shop-specific scripts
│
├── cart.css            # Cart-specific styles
├── cart.js             # Cart-specific scripts
│
├── about.css           # About-specific styles
├── about.js            # About-specific scripts
│
├── blog.css            # Blog-specific styles
├── blog.js             # Blog-specific scripts
│
├── contact.css         # Contact-specific styles
├── contact.js          # Contact-specific scripts
│
└── img/
    ├── products/       # Product images (f1–f8, n1–n8)
    ├── banner/         # Banner images
    ├── blog/           # Blog images
    ├── about/          # About page images & video
    ├── people/         # Team / advisor photos
    └── pay/            # Payment & app store badges
```

---

## ✦ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Custom properties, Grid, Flexbox, animations |
| Vanilla JavaScript | DOM manipulation, IntersectionObserver, form validation |
| [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) | Display / heading typeface |
| [Jost](https://fonts.google.com/specimen/Jost) | Body / UI typeface |
| [Font Awesome 6](https://fontawesome.com/) | Icon library |

> **No frameworks. No build tools. No dependencies.** Just clean, handwritten HTML, CSS, and JS.

---

## ✦ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/iruldhn/luxe-ecommerce.git

# 2. Navigate to the project folder
cd luxe-ecommerce

# 3. Open in your browser
# Simply open index.html — no build step required
open index.html
```

Or use a local development server for the best experience:

```bash
# Using VS Code Live Server extension (recommended)
# Right-click index.html → Open with Live Server

# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

---

## ✦ Coupon Codes (Demo)

| Code | Discount |
|------|----------|
| `LUXE20` | 20% off the entire order |
| `SAVE50` | $50 flat discount |
| `VIP15` | 15% off for VIP clients |

---

## ✦ Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** this repository
2. **Create** a new branch from `develop`
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Write** your code and commit with a clear message
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push** to your forked repository
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** against the `develop` branch

> ⚠️ **Rule: Do NOT commit directly to the `main` branch.**

---

## ✦ Roadmap

- [ ] `sproduct.html` — Single product detail page
- [ ] `checkout.html` — Multi-step checkout flow
- [ ] Local storage cart persistence
- [ ] Dark / Light mode toggle
- [ ] Image lazy loading
- [ ] Wishlist page

---

## ✦ Support

If you find this project useful, here's how you can help:

- 🐛 **Report a bug** — Open an issue with a clear description
- 💡 **Suggest a feature** — Ideas are always welcome
- ⭐ **Star this repository** — It helps others discover the project

---

## ✦ Live Demo

🔗 **[View Live →](#)**

---

## ✦ License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Maintained with ♥ by <a href="https://github.com/iruldhn"><strong>@iruldhn</strong></a>

*LUXE — Crafted for the Refined.*

</div>
