import './Search.css';

const Filters = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="filters-container">
      <h5>Filter by Category</h5>
      <select 
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(e.target.value)} 
        className="filters-select"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;