import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar, TrendingUp, Zap, Eye, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const TVShowsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/tvshows' } });
    }
  }, [user, navigate]);

  // If not authenticated, don't render the content
  if (!user) {
    return null;
  }

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
      title: 'Alien Earth',
      rating: 8.9,
      season: 'Season 1',
      genre: 'Drama, Tech',
      image: 'https://bloody-disgusting.com/wp-content/uploads/2025/03/alien-earth-scaled.jpg',
    },
    // Additional TV shows for the dedicated page
    {
      id: '5',
      title: 'Cosmic Chronicles',
      rating: 8.6,
      season: 'Season 3',
      genre: 'Sci-Fi, Mystery',
      image: 'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '6',
      title: 'Urban Legends',
      rating: 7.8,
      season: 'Season 1',
      genre: 'Crime, Drama',
      image: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '7',
      title: 'Midnight Tales',
      rating: 9.0,
      season: 'Season 4',
      genre: 'Horror, Thriller',
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '8',
      title: 'Family Matters',
      rating: 8.3,
      season: 'Season 2',
      genre: 'Comedy, Drama',
      image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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
          <h1 className="text-4xl font-bold text-white mb-2">Latest TV Series</h1>
          <p className="text-gray-400 text-lg">Binge-worthy shows and new episodes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tvShows.map((show) => (
            <div 
              key={show.id}
              className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleSelectContent(show.id)}
            >
              {/* Badge */}
              {(show.trending || show.hot) && (
                <div className="absolute top-3 left-3 z-10">
                  {show.trending && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs font-semibold">
                      <TrendingUp className="w-3 h-3" />
                      <span>Trending</span>
                    </div>
                  )}
                  {show.hot && (
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
                  src={show.image}
                  alt={show.title}
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
                  {show.title}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 font-semibold text-sm">{show.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{show.season}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm">{show.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVShowsPage;