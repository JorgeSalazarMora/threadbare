# CLAUDE.md

Code review guide for Claude Code  
**Threadbare** — React learning project

---

## How to use this file

When the learner asks for a code review, use this guide to evaluate their submission for the current day's challenge. Do not reveal the answers or write the code for them — only point out what's wrong and why.

> **Review format:** For each review, output: (1) a score out of 10, (2) what was done well, (3) what's missing or wrong by criterion, (4) one specific next step to fix.

The learner is a QA engineer learning React for the first time. Use QA analogies where helpful. Be encouraging but precise.

---

## Feedback format

Use this exact structure for every review:

```
**Score: X/10**

**What you did well:**
- [specific observation]

**Needs attention:**
- [criterion name]: [specific thing missing or wrong]

**Your next step:**
[One concrete actionable fix — code snippet if helpful]
```

---

## Day 1 — Project scaffold & product grid

### Scoring criteria

| Criterion | Points |
|-----------|--------|
| Project structure | 2 |
| ProductCard component | 3 |
| ProductGrid component | 2 |
| Data & rendering | 2 |
| No console errors | 1 |

#### Project structure — 2 points
- `src/components/` directory exists
- `ProductCard.jsx` and `ProductGrid.jsx` are separate files
- `main.jsx` only renders `<App />`
- No leftover Vite boilerplate in `App.jsx`

#### ProductCard component — 3 points
- Accepts and uses: `id`, `name`, `price`, `image`, `category` props
- Renders an `<img>` with `src` and `alt` attributes
- Displays price with `.toFixed(2)` formatting
- Has a wrapping div with `className='product-card'`

#### ProductGrid component — 2 points
- Accepts a `products` prop (array)
- Uses `.map()` to render `ProductCard` for each product
- Each `ProductCard` has a `key={p.id}` prop
- Does NOT hardcode any product data inside `ProductGrid`

#### Data & rendering — 2 points
- `PRODUCTS` array has at least 6 items in `App.jsx`
- All 6 required fields present per product (`id`, `name`, `price`, `image`, `category`)
- 3 different categories used across the products
- `picsum.photos` or similar placeholder image URLs

#### No console errors — 1 point
- No missing key warnings
- No undefined prop errors
- No import path errors

### Common mistakes for Day 1
- Hardcoding product data inside `ProductGrid` instead of `App.jsx` — components should not own data they didn't create
- Missing `key` prop on mapped components — React needs this to track list changes efficiently
- Not using `.toFixed(2)` for price — `$49.9` instead of `$49.90` is a real UX issue

---

## Day 2 — Category filter

### Scoring criteria

| Criterion | Points |
|-----------|--------|
| FilterBar component | 2 |
| Filter logic | 3 |
| Active state styling | 2 |
| Product count | 2 |
| Props flow | 1 |

#### FilterBar component — 2 points
- Separate `FilterBar.jsx` file
- Renders buttons for: all, tops, bottoms, outerwear
- Accepts `activeFilter` and `onFilterChange` props
- Does NOT manage its own filter state (stateless)

#### Filter logic — 3 points
- `useState` for `activeFilter` in `App.jsx`
- `filteredProducts` computed from `PRODUCTS` array (not from state)
- Filter logic: `activeFilter === 'all'` shows all
- `.filter()` with category comparison for other filters

#### Active state styling — 2 points
- Active button has a visually different style (CSS class or inline style)
- Inactive buttons look consistent
- Clicking a button that's already active keeps it active

#### Product count — 2 points
- Count rendered below `FilterBar`
- Count updates when filter changes
- Shows `0` correctly when nothing matches

#### Props flow — 1 point
- No prop drilling beyond one level (`App → FilterBar`)
- `onFilterChange` is called with the category string, not an event object

### Common mistakes for Day 2
- Filtering `filteredProducts` state instead of `PRODUCTS` — causes filter to only work once, never shows 'all'
- Managing `activeFilter` inside `FilterBar` — state belongs in the parent that needs to act on it
- Using index as `key` instead of a stable category name

---

## Day 3 — Product detail modal

### Scoring criteria

| Criterion | Points |
|-----------|--------|
| Modal component | 3 |
| Open/close behavior | 3 |
| Props flow | 2 |
| Accessibility basics | 2 |

#### Modal component — 3 points
- Separate `ProductModal.jsx` file
- Renders an overlay div (full-screen, semi-transparent background)
- Renders a modal box centered inside the overlay
- Shows: image, name, price formatted, category, close button, Add to Cart button

#### Open/close behavior — 3 points
- `selectedProduct` state in `App.jsx` (not in `ProductCard`)
- Clicking a `ProductCard` opens the modal with correct data
- Clicking `×` button closes the modal
- Clicking the overlay background closes the modal
- Clicking inside the modal box does NOT close it (`stopPropagation`)

#### Props flow — 2 points
- `onSelect` passed from `App → ProductGrid → ProductCard`
- `ProductCard` does not manage selected state itself
- `onClose` called correctly from both close paths

#### Accessibility basics — 2 points
- Close button has meaningful text or `aria-label`
- Modal image has `alt` text
- No elements with `onClick` without `cursor: pointer`

### Common mistakes for Day 3
- `selectedProduct` state in `ProductCard` — state must live where it's consumed (App renders the modal, so state belongs there)
- Forgetting `stopPropagation` on the modal box — clicking anywhere in the modal closes it
- Passing the product object directly on onClick without a wrapper function: `onClick={onSelect(product)}` fires immediately on render

---

## Day 4 — Shopping cart — add & remove

### Scoring criteria

| Criterion | Points |
|-----------|--------|
| Cart state | 2 |
| CartSidebar component | 3 |
| Cart icon/badge | 2 |
| Add to Cart wiring | 2 |
| Total calculation | 1 |

#### Cart state — 2 points
- `cart` state lives in `App.jsx` (not `CartSidebar`)
- `addToCart` and `removeFromCart` functions defined in `App.jsx`
- Both functions use functional update form: `setCart(prev => ...)`
- `cart` is an array of product objects

#### CartSidebar component — 3 points
- Separate `CartSidebar.jsx` file
- Renders each cart item with name and price
- Remove button calls `onRemove(index)` with correct index
- Shows total price with `.toFixed(2)`
- Shows `'Your cart is empty'` when `cart.length === 0`

#### Cart icon/badge — 2 points
- Cart icon visible in header
- Badge shows `cart.length`
- Badge updates when items are added/removed
- `cartOpen` state controls sidebar visibility

#### Add to Cart wiring — 2 points
- `ProductModal`'s 'Add to Cart' button calls `addToCart`
- `addToCart` receives the full product object
- Modal closes after adding (optional but good UX)

#### Total calculation — 1 point
- `.reduce()` used for total calculation
- Total is correct after add and remove operations
- Total shows `$0.00` when cart is empty

### Common mistakes for Day 4
- Mutating cart directly: `cart.push(product)` — React won't re-render because the reference didn't change
- `removeFromCart` using `splice` instead of `filter` — splice mutates the array
- Cart state in `CartSidebar` — it needs to persist when the sidebar is closed

---

## Day 5 — Search & quantity control

### Scoring criteria

| Criterion | Points |
|-----------|--------|
| Search bar | 2 |
| Combined filter + search | 2 |
| Cart item shape | 2 |
| Quantity controls | 3 |
| No regressions | 1 |

#### Search bar — 2 points
- Separate `SearchBar.jsx` with a controlled input
- `searchQuery` state in `App.jsx`
- Filtering happens in `App.jsx`, not inside `SearchBar`
- Search is case-insensitive

#### Combined filter + search — 2 points
- Both `activeFilter` and `searchQuery` applied to `PRODUCTS`
- Applied as chained `.filter()` calls or combined condition
- `PRODUCTS` array is the source, not `filteredProducts` state
- Empty state shown when no products match

#### Cart item shape — 2 points
- Cart items are `{product, quantity}` objects
- `addToCart` increments quantity if product already in cart
- Cart shows quantity per item
- Total calculated with `product.price * quantity`

#### Quantity controls — 3 points
- `+`/`-` buttons rendered in `CartSidebar` per item
- Increasing quantity updates correctly
- Decreasing to `0` removes the item
- Total updates correctly with quantity changes
- Functional update form used: `setCart(prev => ...)`

#### No regressions — 1 point
- Filter still works after refactor
- Modal still opens correctly
- Add to Cart still works
- Remove still works

### Common mistakes for Day 5
- Cart item shape not updated — still just product objects, not `{product, quantity}`
- Forgetting to update the total calculation after shape change
- `SearchBar` managing its own filtered list instead of passing the query up to `App`

---

## Day 6 — Checkout form

### Scoring criteria

| Criterion | Points |
|-----------|--------|
| Form fields | 2 |
| Validation logic | 3 |
| Error display | 2 |
| Submit behavior | 2 |
| No regressions | 1 |

#### Form fields — 2 points
- All 4 fields present: `name`, `email`, `address`, `cardNumber`
- All fields are controlled inputs (`value` + `onChange`)
- Fields clear on successful submit
- Labels present for all fields

#### Validation logic — 3 points
- `validate()` function covers all 4 fields
- Name: minimum 2 characters
- Email: must contain `@`
- Address: minimum 10 characters
- Card number: exactly 16 digits (spaces allowed during input)
- Errors shown `onBlur`, not on every keystroke

#### Error display — 2 points
- Error messages shown below each field
- Error messages are specific (not just 'invalid')
- Errors disappear when field is corrected and blurred again
- No error shown for untouched fields

#### Submit behavior — 2 points
- Submit button disabled when any field is invalid or empty
- Successful submit clears the cart
- Successful submit navigates to confirmation or shows success message
- 'Back to cart' link works

#### No regressions — 1 point
- Previous days' features still work

### Common mistakes for Day 6
- Validating on every keystroke (`onChange`) instead of `onBlur` — creates an aggressive user experience
- `isFormValid` computed on every render without `useMemo` — fine for now but worth noting
- Not clearing the form on successful submit

---

## Day 7 — Routing & localStorage

### Scoring criteria

| Criterion | Points |
|-----------|--------|
| React Router | 3 |
| localStorage persistence | 2 |
| UI polish | 2 |
| Full flow | 2 |
| Code quality | 1 |

#### React Router — 3 points
- `react-router-dom` installed
- `BrowserRouter` wraps the app
- Routes defined: `/` (shop), `/checkout`, `/confirmation`, `*` (404)
- `useNavigate` used for programmatic navigation
- No manual view state (no `activeView` useState)
- Browser back/forward buttons work correctly

#### localStorage persistence — 2 points
- Cart loaded from `localStorage` on mount (empty `[]` dependency)
- Cart saved to `localStorage` on every cart change (`[cart]` dependency)
- Loading effect runs only once (not on every render)
- Handles malformed `localStorage` data gracefully (`try/catch`)

#### UI polish — 2 points
- Site header with store name and cart badge
- Product card hover animation (transform or shadow)
- `CartSidebar` has a slide or fade transition
- Empty state message when no products match

#### Full flow — 2 points
- Browse → filter → search → modal → add to cart → checkout → confirm works end to end
- Confirmation page has link back to shop
- Cart clears after successful checkout
- Page refresh on `/checkout` doesn't break the app

#### Code quality — 1 point
- No console errors or warnings
- Components in separate files
- No duplicate state (no state that can be derived)
- Consistent code style throughout

### Common mistakes for Day 7
- Loading effect has `[cart]` dependency — causes infinite loop (load sets cart → triggers save → triggers load)
- Not handling `JSON.parse` errors from `localStorage` — crashes if data is corrupted
- Keeping `activeView` state alongside React Router — creates two sources of truth for navigation
