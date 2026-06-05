import FilterBar from "./components/FilterBar";
import ProductGrid from "./components/ProductGrid";
import ProductModal from "./components/ProductModal";
import './grid.css'; 
import { useState } from "react";

export default function App (){
    const productsArray = [
        {id:1, name:'pant', price:100, image:'https://picsum.photos/id/1/200/300', category:'Tops'},
        {id:2, name:'pant', price:100, image:'https://picsum.photos/id/1/200/300', category:'Bottoms'},
        {id:3, name:'pant', price:100, image:'https://picsum.photos/id/1/200/300', category:'Outerwear'},
        {id:4, name:'pant', price:100, image:'https://picsum.photos/id/1/200/300', category:'Tops'},
        {id:5, name:'pant', price:100, image:'https://picsum.photos/id/1/200/300', category:'Bottoms'},
        {id:6, name:'pant', price:100, image:'https://picsum.photos/id/1/200/300', category:'Outerwear'}
    ];

    const [activeFilter, setActiveFilter] = useState('All')

    const filteredProducts = activeFilter === 'All' ? productsArray : productsArray.filter(p=> p.category === activeFilter)

    const [selectedProduct, setSelectedProduct] = useState(null)


    return (

        <div>
            <FilterBar className="filter-btn"
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                />

            <p>{filteredProducts.length} products</p>

            <div className="card-grid">
            
                <ProductGrid  products={filteredProducts} onSelect={setSelectedProduct} />
                
            </div>
            {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)}/>}
            

        </div>
    )
}