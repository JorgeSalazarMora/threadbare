import FilterBar from "./components/FilterBar";
import ProductGrid from "./components/ProductGrid";
import ProductModal from "./components/ProductModal";
import CartSidebar from "./components/CartSidebar";
import './grid.css'; 
import { useState } from "react";

export default function App (){
    const productsArray = [
        {id:1, name:'T-shirt', price:100, image:'https://picsum.photos/id/1/200/300', category:'Tops'},
        {id:2, name:'Jeans', price:100, image:'https://picsum.photos/id/1/200/300', category:'Bottoms'},
        {id:3, name:'Hoddie', price:100, image:'https://picsum.photos/id/1/200/300', category:'Outerwear'},
        {id:4, name:'Hat', price:100, image:'https://picsum.photos/id/1/200/300', category:'Tops'},
        {id:5, name:'Black Jeans', price:100, image:'https://picsum.photos/id/1/200/300', category:'Bottoms'},
        {id:6, name:'Jacket', price:100, image:'https://picsum.photos/id/1/200/300', category:'Outerwear'}
    ];

    const [activeFilter, setActiveFilter] = useState('All')

    const filteredProducts = activeFilter === 'All' ? productsArray : productsArray.filter(p=> p.category === activeFilter)

    const [selectedProduct, setSelectedProduct] = useState(null)

    const [cart, setCart] = useState([])

    const [cartOpen, setCartOpen] = useState(false)

    function addToCart(product){
        setCart(prev => [...prev, product]);
    }

    function removeFromCart(index){
        setCart(prev=>prev.filter((_,i) => i !== index))
    }


    return (

        <div>

            {cartOpen && (
            <CartSidebar
                cart={cart}
                onRemove={removeFromCart}
                onClose={() => setCartOpen(false)}
            />
            )}

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

            <div className="card-grid">
            
                <ProductGrid  products={filteredProducts} onSelect={setSelectedProduct} />
                
            </div>
            {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} addToCart={addToCart}/>}
            

        </div>
    )
}