import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const CreateContentPage: React.FC = () => {
  const { contentType } = useParams<{ contentType: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: `/create/${contentType}` } });
    }
  }, [user, navigate, contentType]);

  // If not authenticated, don't render the content
  if (!user) {
    return null;
  }

  const getTitle = () => {
    switch (contentType) {
      case 'movie':
        return 'Create New Movie';
      case 'tvshow':
        return 'Create New TV Show';
      case 'game':
        return 'Create New Game';
      default:
        return 'Create New Content';
    }
  };

  const getDescription = () => {
    switch (contentType) {
      case 'movie':
        return 'Add a new movie to the platform';
      case 'tvshow':
        return 'Add a new TV show to the platform';
      case 'game':
        return 'Add a new game to the platform';
      default:
        return 'Add new content to the platform';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 mb-8 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{getTitle()}</h1>
          <p className="text-gray-400 text-lg">{getDescription()}</p>
        </div>

        {/* Content Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <form className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder={`Enter ${contentType} title`}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder={`Enter ${contentType} description`}
              ></textarea>
            </div>

            {/* Genre */}
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-1">
                Genre
              </label>
              <input
                type="text"
                id="genre"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="e.g. Action, Drama, Sci-Fi"
              />
            </div>

            {/* Release Year */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-1">
                Release Year
              </label>
              <input
                type="number"
                id="year"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="e.g. 2025"
                min="1900"
                max="2100"
              />
            </div>

            {/* Content Type Specific Fields */}
            {contentType === 'movie' && (
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  id="duration"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  placeholder="e.g. 120"
                  min="1"
                />
              </div>
            )}

            {contentType === 'tvshow' && (
              <div>
                <label htmlFor="seasons" className="block text-sm font-medium text-gray-300 mb-1">
                  Number of Seasons
                </label>
                <input
                  type="number"
                  id="seasons"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  placeholder="e.g. 3"
                  min="1"
                />
              </div>
            )}

            {contentType === 'game' && (
              <div>
                <label htmlFor="platform" className="block text-sm font-medium text-gray-300 mb-1">
                  Platforms
                </label>
                <input
                  type="text"
                  id="platform"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  placeholder="e.g. PC, PS5, Xbox"
                />
              </div>
            )}

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                id="image"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-400 hover:to-red-400 text-black font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                Create {contentType?.charAt(0).toUpperCase() + contentType?.slice(1)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateContentPage;