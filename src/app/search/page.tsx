'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // TODO: Implement actual search functionality
    setTimeout(() => setIsSearching(false), 1000);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for experts, topics, or services..."
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 
                     dark:text-white transition-all duration-200"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 
                     bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 
                     transition-colors duration-200"
            disabled={isSearching}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Search results will go here */}
        <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">
          {searchQuery 
            ? 'No results found for your search.'
            : 'Enter a search term to find experts, topics, or services.'}
        </p>
      </div>
    </div>
  );
}
