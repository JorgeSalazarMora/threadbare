import CartSidebar from "./components/CartSidebar";
import CheckoutForm from "./components/CheckoutForm";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";
import './grid.css';
import './App.css';
import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from 'react-router-dom';
import Shop from "./pages/Shop";

export default function App (){
   

    const navigate = useNavigate();

    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


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

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (

        <div>

            <header className="site-header">
                <span className="site-header__title">Threadbare</span>
                <button className="cart-btn" onClick={() => setCartOpen(true)}>
                    🛒 Cart
                    {totalItems > 0 && (
                        <span className="site-header__badge">{totalItems}</span>
                    )}
                </button>
            </header>

            {cartOpen && (
            <CartSidebar
                cart={cart}
                onRemove={removeFromCart}
                onIncrease={increaseQty}
                onDecrease={decreaseQty}
                onClose={() => setCartOpen(false)}
                onCheckout={() => { setCartOpen(false); navigate('/checkout'); }}
            />
            )}

            <Routes>
                <Route path='/' element={
                     <Shop addToCart={addToCart}/>
                } />

                <Route path='/checkout' element= {
                    <CheckoutForm onSuccess={() => {
                        setCart([])
                        navigate('/confirmation');
                    }}/>
                }/>

                <Route path='/confirmation' element={<Confirmation />}/>
                <Route path='*'             element={<NotFound />}/>

            </Routes>
        </div>
    )
}