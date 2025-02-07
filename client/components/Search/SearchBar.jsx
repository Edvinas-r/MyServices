import { FaSearch } from 'react-icons/fa';
import './Search.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-bar-wrapper">
      <input
        type="text"
        className="search-bar-input"
        placeholder="Search services..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <FaSearch className="search-bar-icon" />
    </div>
  );
};

export default SearchBar;