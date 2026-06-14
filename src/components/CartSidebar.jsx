import './CartSidebar.css';

export default function CartSidebar({cart, onRemove, onIncrease, onDecrease, onClose, onCheckout}){
   const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  return(
    <div className="cart-sidebar">
        <div className="cart-header">
            <h2>Your Cart ({cart.length})</h2>
            <button onClick={onClose}>×</button>
       </div>
        <div className="cart-items-list">
          {cart.length === 0
          ? <p>Your cart is empty.</p>
          : cart.map((item, i) => (
              <div key={i} className="cart-item">
                <span>{item.product.name}</span>
                <button onClick={() => onDecrease(i)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onIncrease(i)}>+</button>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => onRemove(i)}>Remove</button>
              </div>
            ))
          }
        </div>

        <div className="cart-total">
            Total: ${total.toFixed(2)}
        </div>

        <button
            className="checkout-btn"
            onClick={onCheckout}
            disabled={cart.length === 0}
        >
            Checkout
        </button>
    </div>
  )
}