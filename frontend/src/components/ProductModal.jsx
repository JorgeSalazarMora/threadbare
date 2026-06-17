import './modal.css'; 

export default function  ProductModal({product, onClose, addToCart}){
  return(
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className='modal-close' onClick={onClose}  aria-label="Close">x</button>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <h3>{product.price.toFixed(2)}</h3>
            <p>{product.category}</p>
            <button className='btn-primary' onClick={() => {addToCart(product);  onClose();}}>Add to Cart</button>
    </div>
</div>
  )
}