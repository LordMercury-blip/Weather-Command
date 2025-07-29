import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Zap } from 'lucide-react';

interface SearchBarProps {
  onCitySelect: (city: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect, loading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const cities = [
    'London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Dubai', 'Singapore', 
    'Berlin', 'Madrid', 'Rome', 'Amsterdam', 'Barcelona', 'Istanbul', 'Moscow',
    'Los Angeles', 'Chicago', 'Miami', 'Toronto', 'Vancouver', 'Mumbai'
  ];

  useEffect(() => {
    if (query.length > 0) {
      const filtered = cities.filter(city => 
        city.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onCitySelect(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city: string) => {
    setQuery(city);
    onCitySelect(city);
    setShowSuggestions(false);
  };

  return (
    <div className="relative max-w-2xl mx-auto" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative group">
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/50 via-purple-400/50 to-purple-600/50 blur-sm opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-1 shadow-2xl">
          <div className="flex items-center space-x-4 px-6 py-4">
            <div className="relative">
              <Search className="text-purple-400 w-6 h-6 group-hover:text-purple-300 transition-colors" />
              <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for any city worldwide..."
              className="flex-1 bg-transparent text-white text-lg placeholder-gray-400 focus:outline-none"
              disabled={loading}
            />
            
            {loading && (
              <div className="relative">
                <div className="w-6 h-6 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
                <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-sm animate-pulse"></div>
              </div>
            )}
            
            <Zap className="text-purple-400/60 w-5 h-5" />
          </div>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-black/80 backdrop-blur-xl border border-purple-500/30 rounded-xl shadow-2xl z-20 overflow-hidden">
          {suggestions.map((city, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(city)}
              className="w-full px-6 py-4 text-left text-white hover:bg-purple-500/20 transition-all duration-200 flex items-center space-x-3 group border-b border-purple-500/10 last:border-b-0"
            >
              <div className="relative">
                <MapPin className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="group-hover:text-purple-200 transition-colors">{city}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;