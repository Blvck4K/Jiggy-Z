import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar, TrendingUp, Zap, Eye, ArrowLeft, Trash2, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';

const GamesPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state, dispatch } = useContent();

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

  const handleSelectContent = (id: string) => {
    navigate(`/content/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      dispatch({ type: 'DELETE_GAME', payload: id });
    }
  };

  const handleCreateGame = () => {
    navigate('/create/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 mb-4 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">Latest Games</h1>
            <p className="text-gray-400 text-lg">The newest releases and gaming news</p>
          </div>
          
          <button
            onClick={handleCreateGame}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-400 hover:to-red-400 text-black font-semibold rounded-lg transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Add Game</span>
          </button>
        </div>

        {state.games.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">No games found.</p>
            <button
              onClick={handleCreateGame}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-colors duration-200"
            >
              Add Your First Game
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {state.games.map((game) => (
              <div 
                key={game.id}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
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

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(game.id);
                  }}
                  className="absolute top-3 right-3 z-10 p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                  title="Delete game"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Image */}
                <div 
                  className="relative aspect-[3/4] overflow-hidden"
                  onClick={() => handleSelectContent(game.id)}
                >
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
        )}
      </div>
    </div>
  );
};

export default GamesPage;