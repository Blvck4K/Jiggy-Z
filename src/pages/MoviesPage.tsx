import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar, TrendingUp, Zap, Eye, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const MoviesPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/movies' } });
    }
  }, [user, navigate]);

  // If not authenticated, don't render the content
  if (!user) {
    return null;
  }

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
    },
    // Additional movies for the dedicated page
    {
      id: '5',
      title: 'Cosmic Odyssey',
      rating: 8.7,
      year: '2025',
      genre: 'Sci-Fi, Adventure',
      image: 'https://images.pexels.com/photos/1252873/pexels-photo-1252873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '6',
      title: 'Midnight Shadows',
      rating: 7.9,
      year: '2025',
      genre: 'Horror, Thriller',
      image: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '7',
      title: 'Eternal Sunshine',
      rating: 9.3,
      year: '2025',
      genre: 'Drama, Romance',
      image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '8',
      title: 'Urban Legends',
      rating: 8.1,
      year: '2025',
      genre: 'Action, Crime',
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
          <h1 className="text-4xl font-bold text-white mb-2">Latest Movies</h1>
          <p className="text-gray-400 text-lg">Discover the hottest films in cinema</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div 
              key={movie.id}
              className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleSelectContent(movie.id)}
            >
              {/* Badge */}
              {(movie.trending || movie.hot) && (
                <div className="absolute top-3 left-3 z-10">
                  {movie.trending && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs font-semibold">
                      <TrendingUp className="w-3 h-3" />
                      <span>Trending</span>
                    </div>
                  )}
                  {movie.hot && (
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
                  src={movie.image}
                  alt={movie.title}
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
                  {movie.title}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 font-semibold text-sm">{movie.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{movie.year}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm">{movie.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;