import ProductCard from "./ProductCard";


export default function ProductGrid({products, onSelect}){
    return(
        <>
            {products.map((product)=>(
                <ProductCard product={product} onSelect={onSelect}/>
            ))}
        </>
    )
}