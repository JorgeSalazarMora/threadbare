import './SearchBar.css';

export default function  SearchBar({searchQuery, onSearch}){
  return(
    <div  className='search-bar' >
      <input
        type="text"
        value = {searchQuery}
        onChange={e => onSearch(e.target.value)}
        placeholder="Search products...">
       </input>
    </div>
  )
}