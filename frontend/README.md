# Threadbare — Frontend

React 19 + Vite 8 clothing store. Built during the 7-day frontend challenge and now being connected to a Spring Boot backend as part of the 30-day full-stack challenge.

## Requirements

- Node.js 18+

## Running

```bash
npm install
npm run dev
# http://localhost:5173
```

## Current features

- Product grid with category filter (Tops / Bottoms / Outerwear) and text search
- Product detail modal
- Cart sidebar with quantity controls, persisted to `localStorage`
- Checkout form with client-side validation
- Order confirmation page
- 404 page
- Routing via React Router v7 (`/`, `/checkout`, `/confirmation`)

## What's coming (backend integration)

- Products served from the Spring Boot API instead of hardcoded data
- User registration and login (JWT)
- Server-side search and filtering
- Real order placement and order history

## Project structure

```
src/
├── components/     # CartSidebar, CheckoutForm, FilterBar, ProductCard, ProductGrid, ProductModal, SearchBar
├── pages/          # Shop, Confirmation, NotFound
├── App.jsx         # Root component: routing, cart state, header
└── main.jsx        # React entry point
```

## Environment

Once the backend is connected (Day 10), create `.env.development` in this directory:

```
VITE_API_URL=http://localhost:8080
```
