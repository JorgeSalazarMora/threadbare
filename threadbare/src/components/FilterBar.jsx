export default function  FilterBar({activeFilter, onFilterChange}){
    const categories = ['All','Tops','Bottoms','Outerwear'];
  return(
    <div >
       {categories.map((category)=>(
        <button
            className={`filter-btn${activeFilter === category ? ' active' : ''}`}
            key={category}
            onClick={()=>onFilterChange(category)}
        >
            {category}
        </button>
       ))}
    </div>
  )
}