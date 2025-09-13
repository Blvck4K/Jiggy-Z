import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar, TrendingUp, Zap, Eye, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const GamesPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/games' } });
    }
  }, [user, navigate]);

  // If not authenticated, don't render the content
  if (!user) {
    return null;
  }

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
    },
    // Additional games for the dedicated page
    {
      id: '5',
      title: 'Cosmic Odyssey',
      rating: 8.7,
      platform: 'PC, PS5',
      genre: 'Space Sim, Adventure',
      image: 'https://images.pexels.com/photos/1252873/pexels-photo-1252873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '6',
      title: 'Midnight Shadows',
      rating: 7.9,
      platform: 'All Platforms',
      genre: 'Horror, Survival',
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '7',
      title: 'Eternal Kingdoms',
      rating: 9.3,
      platform: 'PC, Xbox',
      genre: 'Strategy, RPG',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '8',
      title: 'Urban Warfare',
      rating: 8.1,
      platform: 'Next-Gen Only',
      genre: 'FPS, Action',
      image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    }
  ];

  const handleSelectContent = (id: string) => {
    navigate(`/content/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 mb-8 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Latest Games</h1>
          <p className="text-gray-400 text-lg">The newest releases and gaming news</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <div 
              key={game.id}
              className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleSelectContent(game.id)}
            >
              {/* Badge */}
              {(game.trending || game.hot) && (
                <div className="absolute top-3 left-3 z-10">
                  {game.trending && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs font-semibold">
                      <TrendingUp className="w-3 h-3" />
                      <span>Trending</span>
                    </div>
                  )}
                  {game.hot && (
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
                  src={game.image}
                  alt={game.title}
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
                  {game.title}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 font-semibold text-sm">{game.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{game.platform}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm">{game.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesPage;