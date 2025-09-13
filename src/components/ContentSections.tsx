import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar, TrendingUp, Zap, Eye, ArrowRight, Sparkles } from 'lucide-react';

interface ContentSectionsProps {
  onSelectContent?: (id: string, type: 'movie' | 'tv' | 'game') => void;
  isAuthenticated?: boolean;
}

const ContentSections: React.FC<ContentSectionsProps> = ({ 
  onSelectContent = () => {}, 
  isAuthenticated = false 
}) => {
  const navigate = useNavigate();

  const movies = [
    {
      id: '1',
      title: 'Ne Zha 2',
      rating: 8.5,
      year: '2025',
      genre: 'Action, Crime',
      image: 'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2025/08/05084238/293Mo4GWf7Tl0TfAr5NFghqeMy7-scaled.jpg',
      trending: true
    },
    {
      id: '2',
      title: 'Lilo & Stitch',
      rating: 9.1,
      year: '2025',
      genre: 'Sci-Fi, Drama',
      image: 'https://m.media-amazon.com/images/M/MV5BMzM0NTRkZWUtOTg5OC00YTBmLWI5NDEtZjQ5NjUwZTEyMTIxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      hot: true
    },
    {
      id: '3',
      title: 'Super Man',
      rating: 7.8,
      year: '2025',
      genre: 'Action, Thriller',
      image: 'https://posterspy.com/wp-content/uploads/2025/07/supes1-1.jpg',
    },
    {
      id: '4',
      title: 'Bad Guys',
      rating: 8.3,
      year: '2025',
      genre: 'Adventure',
      image: 'https://www.dreamworks.com/storage/cms-uploads/the-bad-guys-share-image.jpg',
    }
  ];

  const tvShows = [
    {
      id: '1',
      title: 'Andor',
      rating: 9.2,
      season: 'Season 2',
      genre: 'Sci-Fi, Drama',
      image: 'https://posterspy.com/wp-content/uploads/2025/04/andor.jpg',
      trending: true
    },
    {
      id: '2',
      title: 'Severance',
      rating: 8.7,
      season: 'Season 2',
      genre: 'Cyberpunk, Thriller',
      image: 'https://cdn.theplaylist.net/wp-content/uploads/2024/07/09153120/severance-season-2.jpg',
      hot: true
    },
    {
      id: '3',
      title: 'The Pitt',
      rating: 8.1,
      season: 'Season 1',
      genre: 'Action, Adventure',
      image: 'https://resizing.flixster.com/K534zxPqMQMw8SluoZi_q2FjUDs=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vODQ2ZTJmZTYtYWQ5Yy00OGE5LWJlOGQtMDg5Y2UyM2QyN2RiLmpwZw==',
    },
    {
      id: '4',
      title: 'Alien Earth ',
      rating: 8.9,
      season: 'Season 1',
      genre: 'Drama, Tech',
      image: 'https://bloody-disgusting.com/wp-content/uploads/2025/03/alien-earth-scaled.jpg',
    }
  ];

  const games = [
    {
      id: '1',
      title: 'Monster Hunter Wilds',
      rating: 9.5,
      platform: 'PC, PS5, Xbox',
      genre: 'RPG, Open World',
      image: 'https://4kwallpapers.com/images/walls/thumbs_3t/19165.jpg',
      trending: true
    },
    {
      id: '2',
      title: 'Split Fiction',
      rating: 8.8,
      platform: 'All Platforms',
      genre: 'Strategy, Sci-Fi',
      image: 'https://cdn1.epicgames.com/offer/578f39d17be846e7a6fa335f757012aa/EGS_SplitFiction_HazelightStudiosAB_S2_1200x1600-d626c4ebc51d7b5bacbfd015368b674c',
      hot: true
    },
    {
      id: '3',
      title: 'Hollow Knight: Silksong',
      rating: 8.4,
      platform: 'PC, Mobile',
      genre: 'Puzzle, Strategy',
      image: 'https://assets.nintendo.eu/image/upload/f_auto/q_auto/v1757304516/NAL/Articles/2025/09-September/1920x1080_NintendoSwitch2_Hollow-Knight-Silksong.jpg'
    },
    {
      id: '4',
      title: 'Doom: The Dark Ages',
      rating: 9.0,
      platform: 'Next-Gen Only',
      genre: 'Adventure, RPG',
      image: 'https://images5.alphacoders.com/138/1389830.jpg'
    }
  ];

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

  return (
    <main className="py-16 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Movies Section */}
        <ContentSection
          title="Latest Movies"
          subtitle="Discover the hottest films in cinema"
          items={movies}
          type="movie"
          onSelectContent={onSelectContent}
          isAuthenticated={isAuthenticated}
          onShowMore={() => handleShowMore('movie')}
        />

        {/* TV Shows Section */}
        <ContentSection
          title="Latest TV Series"
          subtitle="Binge-worthy shows and new episodes"
          items={tvShows}
          type="tv"
          onSelectContent={onSelectContent}
          isAuthenticated={isAuthenticated}
          onShowMore={() => handleShowMore('tv')}
        />

        {/* Games Section */}
        <ContentSection
          title="Latest Games"
          subtitle="The newest releases and gaming news"
          items={games}
          type="game"
          onSelectContent={onSelectContent}
          isAuthenticated={isAuthenticated}
          onShowMore={() => handleShowMore('game')}
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
}

const ContentSection: React.FC<ContentSectionProps> = ({ 
  title, 
  subtitle, 
  items, 
  type,
  onSelectContent,
  isAuthenticated,
  onShowMore
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
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  item, 
  type, 
  onSelectContent,
  isAuthenticated
}) => {
  const handleClick = () => {
    // If authenticated, navigate to content detail
    // If not authenticated, we could show login prompt
    onSelectContent(item.id, type);
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