import FilterBar from "../components/FilterBar";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";
import SearchBar from "../components/SearchBar";
import { useState } from "react";


export default function Shop({ addToCart }){
     const productsArray = [
        {id:1, name:'T-shirt', price:100, image:'https://picsum.photos/id/1/200/300', category:'Tops'},
        {id:2, name:'Jeans', price:100, image:'https://picsum.photos/id/1/200/300', category:'Bottoms'},
        {id:3, name:'Hoddie', price:100, image:'https://picsum.photos/id/1/200/300', category:'Outerwear'},
        {id:4, name:'Hat', price:100, image:'https://picsum.photos/id/1/200/300', category:'Tops'},
        {id:5, name:'Black Jeans', price:100, image:'https://picsum.photos/id/1/200/300', category:'Bottoms'},
        {id:6, name:'Jacket', price:100, image:'https://picsum.photos/id/1/200/300', category:'Outerwear'}
    ];

    const [searchQuery, setSearchQuery] = useState('')
    
    const [activeFilter, setActiveFilter] = useState('All')
    
    const [selectedProduct, setSelectedProduct] = useState(null)

    const filteredProducts = productsArray.filter(p=> activeFilter === 'All' || p.category === activeFilter)
                                                .filter(p=> p.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()))
    
    return (
        <div>
             <SearchBar
              searchQuery={searchQuery}
              onSearch={setSearchQuery}/>

              <div className="app-header">
                <FilterBar
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />
              </div>
            
            <p>{filteredProducts.length} products</p>
            
            {filteredProducts.length === 0
                ? <p className="empty-state">No products match your search.</p>
                :<div className="card-grid">
                    <ProductGrid  products={filteredProducts} onSelect={setSelectedProduct} />
                </div>
            }
            
            {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} addToCart={addToCart}/>}
            
            

        </div>
        
    )

}