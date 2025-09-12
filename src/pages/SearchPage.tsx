import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, X, Filter, Star } from 'lucide-react';
import { SupabaseClient } from '@supabase/supabase-js';

interface SearchPageProps {
  onBack: () => void;
  onSelectContent: (id: string, type: 'movie' | 'tv' | 'game') => void;
  supabase: SupabaseClient;
  isAuthenticated: boolean;
}

interface ContentItem {
  id: string;
  title: string;
  rating: number;
  year: string;
  genre: string;
  image: string;
  type: 'movie' | 'tv' | 'game';
}

const SearchPage: React.FC<SearchPageProps> = ({ 
  onBack, 
  onSelectContent, 
  supabase,
  isAuthenticated 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'movie' | 'tv' | 'game'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Perform search when query changes
  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        // In a real app, we would search across all content tables in Supabase
        // For now, we'll simulate search results
        
        // This would be the actual Supabase query in a real implementation:
        /*
        const movieResults = await supabase
          .from('movies')
          .select('id, title, rating, year, genre, image')
          .ilike('title', `%${searchQuery}%`)
          .order('rating', { ascending: false });
          
        const tvResults = await supabase
          .from('tv_shows')
          .select('id, title, rating, year, genre, image')
          .ilike('title', `%${searchQuery}%`)
          .order('rating', { ascending: false });
          
        const gameResults = await supabase
          .from('games')
          .select('id, title, rating, year, genre, image')
          .ilike('title', `%${searchQuery}%`)
          .order('rating', { ascending: false });
          
        // Combine and format results
        const allResults = [
          ...movieResults.data.map(item => ({ ...item, type: 'movie' })),
          ...tvResults.data.map(item => ({ ...item, type: 'tv' })),
          ...gameResults.data.map(item => ({ ...item, type: 'game' }))
        ];
        */
        
        // For demo, we'll use mock data
        const mockResults: ContentItem[] = [
          {
            id: '1',
            title: 'Dune: Part Two',
            rating: 8.9,
            year: '2024',
            genre: 'Sci-Fi, Adventure',
            image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
            type: 'movie'
          },
          {
            id: '2',
            title: 'Interstellar Legacy',
            rating: 9.1,
            year: '2024',
            genre: 'Sci-Fi, Drama',
            image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
            type: 'movie'
          },
          {
            id: '3',
            title: 'Cosmic Chronicles',
            rating: 9.2,
            year: '2024',
            genre: 'Sci-Fi, Drama',
            image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400',
            type: 'tv'
          },
          {
            id: '4',
            title: 'Neon City',
            rating: 8.7,
            year: '2024',
            genre: 'Cyberpunk, Thriller',
            image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400',
            type: 'tv'
          },
          {
            id: '5',
            title: 'Cyber Revolution 2077',
            rating: 9.5,
            year: '2024',
            genre: 'RPG, Open World',
            image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
            type: 'game'
          },
          {
            id: '6',
            title: 'Galactic Warfare',
            rating: 8.8,
            year: '2024',
            genre: 'Strategy, Sci-Fi',
            image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400',
            type: 'game'
          }
        ];
        
        // Filter results based on search query
        const filteredResults = mockResults.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        // Apply type filter if not 'all'
        const typeFilteredResults = activeFilter === 'all' 
          ? filteredResults 
          : filteredResults.filter(item => item.type === activeFilter);
        
        setSearchResults(typeFilteredResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, activeFilter, supabase]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleFilterChange = (filter: 'all' | 'movie' | 'tv' | 'game') => {
    setActiveFilter(filter);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 -z-10"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)] -z-10"></div>
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-yellow-500/20 px-4 py-4">
        <div className="container mx-auto flex items-center">
          <button 
            onClick={onBack}
            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-200 mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, TV shows, games..."
              className="block w-full pl-10 pr-10 py-2 border border-gray-600 rounded-lg bg-slate-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            {searchQuery && (
              <button 
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 ml-4 rounded-lg transition-colors duration-200 ${
              showFilters ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-yellow-400'
            }`}
          >
            <Filter className="w-6 h-6" />
          </button>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="container mx-auto mt-4 pb-2 flex items-center space-x-2 overflow-x-auto scrollbar-hide">
            <FilterButton 
              label="All" 
              active={activeFilter === 'all'} 
              onClick={() => handleFilterChange('all')} 
            />
            <FilterButton 
              label="Movies" 
              active={activeFilter === 'movie'} 
              onClick={() => handleFilterChange('movie')} 
            />
            <FilterButton 
              label="TV Shows" 
              active={activeFilter === 'tv'} 
              onClick={() => handleFilterChange('tv')} 
            />
            <FilterButton 
              label="Games" 
              active={activeFilter === 'game'} 
              onClick={() => handleFilterChange('game')} 
            />
          </div>
        )}
      </header>
      
      {/* Search Results */}
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-yellow-400 text-xl">Searching...</div>
          </div>
        ) : searchQuery.length > 0 ? (
          <>
            <h2 className="text-xl text-white font-semibold mb-4">
              {searchResults.length > 0 
                ? `Found ${searchResults.length} results for "${searchQuery}"`
                : `No results found for "${searchQuery}"`
              }
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {searchResults.map((item) => (
                <div 
                  key={`${item.type}-${item.id}`}
                  onClick={() => onSelectContent(item.id, item.type)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-semibold rounded">
                          {item.type === 'movie' ? 'Movie' : item.type === 'tv' ? 'TV' : 'Game'}
                        </span>
                        <div className="flex items-center space-x-1 bg-black/60 px-2 py-1 rounded">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-white text-xs">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-white font-medium group-hover:text-yellow-400 transition-colors duration-200 line-clamp-1">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{item.year}</span>
                    <span className="truncate ml-2">{item.genre.split(',')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Search className="w-16 h-16 text-gray-600 mb-4" />
            <h2 className="text-2xl text-white font-semibold mb-2">Search for content</h2>
            <p className="text-gray-400 text-center max-w-md">
              Find your favorite movies, TV shows, and games by typing in the search box above
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      active 
        ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-black' 
        : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
    }`}
  >
    {label}
  </button>
);

export default SearchPage;