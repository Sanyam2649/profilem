import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search profiles...",
  className = "" 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="join w-full">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered text-black join-item flex-1 bg-white border-slate-300 focus:border-blue-500"
        />
        <button type="submit" className="btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 join-item">
          <Search className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;