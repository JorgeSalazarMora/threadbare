import FilterBar from "./components/FilterBar";
import ProductGrid from "./components/ProductGrid";
import ProductModal from "./components/ProductModal";
import CartSidebar from "./components/CartSidebar";
import './grid.css'; 
import { useState } from "react";
import SearchBar from "./components/SearchBar";

export default function App (){
    const productsArray = [
        {id:1, name:'T-shirt', price:100, image:'https://picsum.photos/id/1/200/300', category:'Tops'},
        {id:2, name:'Jeans', price:100, image:'https://picsum.photos/id/1/200/300', category:'Bottoms'},
        {id:3, name:'Hoddie', price:100, image:'https://picsum.photos/id/1/200/300', category:'Outerwear'},
        {id:4, name:'Hat', price:100, image:'https://picsum.photos/id/1/200/300', category:'Tops'},
        {id:5, name:'Black Jeans', price:100, image:'https://picsum.photos/id/1/200/300', category:'Bottoms'},
        {id:6, name:'Jacket', price:100, image:'https://picsum.photos/id/1/200/300', category:'Outerwear'}
    ];

    const [searchQuery, setSearchQuery] = useState('')

    const [activeFilter, setActiveFilter] = useState('All')

    const filteredProducts = productsArray.filter(p=> activeFilter === 'All' || p.category === activeFilter)
                                            .filter(p=> p.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()))

    const [selectedProduct, setSelectedProduct] = useState(null)

    const [cart, setCart] = useState([])

    const [cartOpen, setCartOpen] = useState(false)

    

    function addToCart(product){
        setCart(prev => {
            const existing = prev.findIndex(item => item.product.id === product.id)

            if (existing >= 0){
                return prev.map((item, i)=>
                    i === existing ? {...item, quantity: item.quantity + 1} : item
                )
            }
            return [...prev, {product, quantity:1}]
        });
    }

    function removeFromCart(index){
        setCart(prev=>prev.filter((_,i) => i !== index))
    }

    function increaseQty(index) {
        setCart(prev => prev.map((item, i) =>
            i === index ? { ...item, quantity: item.quantity + 1 } : item
         ))
    }

    function decreaseQty(index)
    {
        setCart(
            prev => {
                const item = prev[index]
                if(item.quantity === 1) return prev.filter((_,i) => i !== index)
                return prev.map((item, i) => 
                    i === index ? {...item, quantity: item.quantity - 1}:item
                )
            })
    }

    return (

        <div>

            {cartOpen && (
            <CartSidebar
                cart={cart}
                onRemove={removeFromCart}
                onIncrease={increaseQty}
                onDecrease={decreaseQty}
                onClose={() => setCartOpen(false)}
            />
            )}

            <SearchBar
              searchQuery={searchQuery}
              onSearch={setSearchQuery}/>

            <div className="app-header">
                <FilterBar
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />
                <button className="cart-btn" onClick={() => setCartOpen(true)}>
                    🛒 Cart ({cart.length})
                </button>
            </div>

            <p>{filteredProducts.length} products</p>

            {filteredProducts.length === 0
                ? <p className="empty-state">No products match your search.</p>
                :<div className="card-grid">
                    <ProductGrid  products={filteredProducts} onSelect={setSelectedProduct} />
                  </div>
            }

            {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} addToCart={addToCart}/>}
            
        </div>
    )
}