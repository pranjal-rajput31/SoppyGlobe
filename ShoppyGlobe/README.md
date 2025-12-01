# ShoppyGlobe - E-Commerce Application

An advanced React-based e-commerce platform built with modern web technologies.

**Repository:** [https://github.com/pranjal-rajput31/SoppyGlobe](https://github.com/pranjal-rajput31/SoppyGlobe)

## Features

✨ **Product Browsing**
- Dynamic product listing with real-time filtering
- Detailed product pages with specifications
- Product images with native lazy loading
- Search functionality across multiple fields

🛒 **Shopping Cart**
- Add/remove items from cart
- Adjust product quantities
- Real-time price calculations
- Cart summary with tax calculations

💳 **Checkout Process**
- User details form (name, email, address)
- Order summary display
- Order placement with confirmation
- Automatic cart clearing after purchase

⚡ **Performance Optimizations**
- Code splitting with React.lazy
- Suspense boundaries for smooth loading
- Native image lazy loading (loading="lazy")
- Redux state management for efficient updates

## Tech Stack

- **React 18** - UI library with hooks
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **React Icons** - Icon library
- **CSS** - Custom styling

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
backend/
|--config/---db.js
|--controller--
|--middleware--authMiddleware
|--models---cart.js,product.js,user.js
|--routes---auth.js,cart.js,order.js
src/
├── components/     # React components
├── hooks/         # Custom hooks
├── store/         # Redux store, slices, selectors
├── assets/        # Static assets
├── App.jsx        # Main app component
└── main.jsx       # Entry point
```

## Key Components

- **ProductList** - Displays all products with search filtering
- **ProductItem** - Individual product card with add to cart
- **ProductDetail** - Detailed product information page
- **Cart** - Shopping cart management
- **CartItem** - Individual cart item component
- **Checkout** - Order placement form
- **Header** - Navigation and search bar
- **Error** - Error page for route failures

## Redux Store

- **cartSlice** - Cart state (add, remove, update quantity, clear)
- **searchSlice** - Search query state
- **cartSelectors** - Memoized selectors for cart data

## Features Implemented

✅ Product listing and filtering
✅ Shopping cart with full CRUD operations
✅ Checkout with order placement
✅ Code splitting and lazy loading
✅ Image lazy loading for performance
✅ Redux state management
✅ Error handling with custom error page
✅ Responsive design
✅ Search functionality
✅ Tax calculations and order summary

# 🛒 ShoppyGlobe

ShoppyGlobe is a full‑stack e‑commerce app built with **MongoDB, Express.js, React, and JWT authentication**.  
It lets users browse products, add them to a cart, and checkout securely — with cart state stored in MongoDB (no Redux).

## 🚀 Features
- User login & signup with JWT
- Product listing with images, stock, discounts
- Cart: add, update, remove, clear items
- Checkout with shipping details & order summary
- Backend REST API with Express & MongoDB


---








Built by **Pranjal Rajput** | Open Source E-Commerce Project
