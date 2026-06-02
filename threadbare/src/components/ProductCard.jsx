export default function  ProductCard({name, price, image, category}){
  return(
    <div className='product-card'>
        <h2>{name}</h2>
        <h3>{category}</h3>
        <p>{price.toFixed(2)}</p>
        <img src={image} alt={name} />
    </div>
  )
}