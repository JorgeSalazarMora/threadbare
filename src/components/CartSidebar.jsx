import './CartSidebar.css';

export default function CartSidebar({cart, onRemove, onClose}){
   const total = cart.reduce((sum, item) => sum + item.price, 0)
  return(
    <div className="cart-sidebar">
        <div className="cart-header">
            <h2>Your Cart ({cart.length})</h2>
            <button onClick={onClose}>×</button>
       </div>
        {cart.length === 0
        ? <p>Your cart is empty.</p>
        : cart.map((item, i) => (
            <div key={i} className="cart-item">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
              <button onClick={() => onRemove(i)}>Remove</button>
            </div>
          ))
        }

        <div className="cart-total">
            Total: ${total.toFixed(2)}
        </div>
    </div>
  )
}