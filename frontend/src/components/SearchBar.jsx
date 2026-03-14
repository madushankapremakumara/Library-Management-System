import '../styles/SearchBar.css'
 
function SearchBar({ search, onSearch, categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="lms-search-container">
      <div className="lms-category-filter">
        <select 
          className="lms-category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="lms-search-wrap">
        <input
          className="lms-search-input"
          placeholder="Search by title, description or ISBN..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
        <span className="lms-search-icon">🔍</span>
      </div>
    </div>
  )
}
 
export default SearchBar