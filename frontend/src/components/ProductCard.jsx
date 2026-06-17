import './ProductCard.css';

export default function  ProductCard({product, onSelect}){
  return(
    <div onClick={() => onSelect(product)} className='product-card'>
        <h2>{product.name}</h2>
        <h3>{product.category}</h3>
        <p>{product.price.toFixed(2)}</p>
        <img src={product.image} alt={product.name} />
    </div>
  )
}