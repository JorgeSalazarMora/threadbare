import ProductCard from "./ProductCard";

export default function ProductGrid({products}){
    return(
        <>
            {products.map((product)=>(
                <ProductCard key={product.id} name={product.name} price={product.price} image={product.image} category={product.category}/>
            ))}
        </>
    )
}