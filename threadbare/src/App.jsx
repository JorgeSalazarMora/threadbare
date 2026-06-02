import ProductGrid from "./components/ProductGrid";
import './grid.css'; 

export default function App (){
    const productsArray = [
        {id:1, name:'pant', price:100, image:'https://picsum.photos/id/1/200/300', category:'tops'},
        {id:2, name:'pant', price:100, image:'https://picsum.photos/id/1/200/300', category:'bottoms'},
        {id:3, name:'pant', price:100, image:'https://picsum.photos/id/1/200/300', category:'outerwear'},
        {id:4, name:'pant', price:100, image:'https://picsum.photos/id/1/200/300', category:'tops'},
        {id:5, name:'pant', price:100, image:'https://picsum.photos/id/1/200/300', category:'bottoms'},
        {id:6, name:'pant', price:100, image:'https://picsum.photos/id/1/200/300', category:'outerwear'}
    ];


    return (
        <div className="card-grid">
            <ProductGrid  products={productsArray}/>
        </div>
    )
}