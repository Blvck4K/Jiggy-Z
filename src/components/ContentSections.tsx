import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar, TrendingUp, Zap, Eye, ArrowRight, Sparkles, Trash2 } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

interface ContentSectionsProps {
  onSelectContent?: (id: string, type: 'movie' | 'tv' | 'game') => void;
  isAuthenticated?: boolean;
  showDeleteButtons?: boolean;
}

const ContentSections: React.FC<ContentSectionsProps> = ({ 
  onSelectContent = () => {}, 
  isAuthenticated = false,
  showDeleteButtons = false
}) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContent();

  const handleShowMore = (type: 'movie' | 'tv' | 'game') => {
    if (isAuthenticated) {
      // If authenticated, navigate to the section page
      if (type === 'movie') navigate('/movies');
      else if (type === 'tv') navigate('/tvshows');
      else if (type === 'game') navigate('/games');
    } else {
      // If not authenticated, redirect to login with return URL
      if (type === 'movie') navigate('/login', { state: { from: '/movies' } });
      else if (type === 'tv') navigate('/login', { state: { from: '/tvshows' } });
      else if (type === 'game') navigate('/login', { state: { from: '/games' } });
    }
  };

  const handleDelete = (id: string, type: 'movie' | 'tv' | 'game') => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      switch (type) {
        case 'movie':
          dispatch({ type: 'DELETE_MOVIE', payload: id });
          break;
        case 'tv':
          dispatch({ type: 'DELETE_TVSHOW', payload: id });
          break;
        case 'game':
          dispatch({ type: 'DELETE_GAME', payload: id });
          break;
      }
    }
  };

  return (
    <main className="py-16 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Movies Section */}
        <ContentSection
          title="Latest Movies"
          subtitle="Discover the hottest films in cinema"
          items={state.movies}
          type="movie"
          onSelectContent={onSelectContent}
          isAuthenticated={isAuthenticated}
          onShowMore={() => handleShowMore('movie')}
          onDelete={showDeleteButtons ? handleDelete : undefined}
        />

        {/* TV Shows Section */}
        <ContentSection
          title="Latest TV Series"
          subtitle="Binge-worthy shows and new episodes"
          items={state.tvShows}
          type="tv"
          onSelectContent={onSelectContent}
          isAuthenticated={isAuthenticated}
          onShowMore={() => handleShowMore('tv')}
          onDelete={showDeleteButtons ? handleDelete : undefined}
        />

        {/* Games Section */}
        <ContentSection
          title="Latest Games"
          subtitle="The newest releases and gaming news"
          items={state.games}
          type="game"
          onSelectContent={onSelectContent}
          isAuthenticated={isAuthenticated}
          onShowMore={() => handleShowMore('game')}
          onDelete={showDeleteButtons ? handleDelete : undefined}
        />
      </div>
    </main>
  );
};

interface ContentSectionProps {
  title: string;
  subtitle: string;
  items: any[];
  type: 'movie' | 'tv' | 'game';
  onSelectContent: (id: string, type: 'movie' | 'tv' | 'game') => void;
  isAuthenticated: boolean;
  onShowMore: () => void;
  onDelete?: (id: string, type: 'movie' | 'tv' | 'game') => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({ 
  title, 
  subtitle, 
  items, 
  type,
  onSelectContent,
  isAuthenticated,
  onShowMore,
  onDelete
}) => {
  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            {title}
          </h2>
          <p className="text-gray-400 text-lg">{subtitle}</p>
        </div>
        
        {/* Show More Button */}
        <button 
          onClick={onShowMore}
          className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-500/10 to-red-500/10 hover:from-yellow-500/20 hover:to-red-500/20 border border-yellow-500/30 hover:border-yellow-500/50 text-yellow-400 hover:text-yellow-300 rounded-2xl transition-all duration-200 transform hover:scale-105 backdrop-blur-sm"
        >
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">Show More</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <ContentCard 
            key={item.id} 
            item={item} 
            type={type} 
            onSelectContent={onSelectContent}
            isAuthenticated={isAuthenticated}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
};

interface ContentCardProps {
  item: any;
  type: 'movie' | 'tv' | 'game';
  onSelectContent: (id: string, type: 'movie' | 'tv' | 'game') => void;
  isAuthenticated: boolean;
  onDelete?: (id: string, type: 'movie' | 'tv' | 'game') => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  item, 
  type, 
  onSelectContent,
  isAuthenticated,
  onDelete
}) => {
  const handleClick = () => {
    // If authenticated, navigate to content detail
    // If not authenticated, we could show login prompt
    onSelectContent(item.id, type);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(item.id, type);
    }
  };

  return (
    <div 
      className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      {/* Badge */}
      {(item.trending || item.hot) && (
        <div className="absolute top-3 left-3 z-10">
          {item.trending && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>Trending</span>
            </div>
          )}
          {item.hot && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-xs font-semibold">
              <Zap className="w-3 h-3" />
              <span>Hot</span>
            </div>
          )}
        </div>
      )}

      {/* Delete Button - only show if onDelete is provided */}
      {onDelete && (
        <button
          onClick={handleDeleteClick}
          className="absolute top-3 right-3 z-10 p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
          title="Delete item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-4 h-4 inline mr-2" />
            View Details
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">
          {item.title}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-yellow-400 font-semibold text-sm">{item.rating}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{type === 'tv' ? item.season : type === 'game' ? item.platform : item.year}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm">{item.genre}</p>
      </div>
    </div>
  );
};

export default ContentSections;