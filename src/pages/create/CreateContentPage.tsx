import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useContent, generateId } from '../../contexts/ContentContext';
import { supabase } from '../../lib/supabase';

const CreateContentPage: React.FC = () => {
  const { contentType } = useParams<{ contentType: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { dispatch } = useContent();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    year: new Date().getFullYear().toString(),
    image: '',
    duration: '',
    seasons: '',
    platform: '',
    rating: '8.0',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare the data for database insertion
      const newItemData = {
        title: formData.title,
        description: formData.description,
        rating: parseFloat(formData.rating),
        genre: formData.genre,
        image: formData.image || 'https://via.placeholder.com/400x600/1e293b/94a3b8?text=No+Image',
        year: formData.year,
        ...(contentType === 'movie' && {
          duration: formData.duration,
        }),
        ...(contentType === 'tvshow' && {
          season: formData.seasons ? `Season ${formData.seasons}` : 'Season 1',
          episodes: parseInt(formData.seasons) || 1,
        }),
        ...(contentType === 'game' && {
          platform: formData.platform,
        }),
      };

      let result;
      
      // Insert into the appropriate Supabase table
      switch (contentType) {
        case 'movie':
          result = await supabase
            .from('movies')
            .insert([newItemData])
            .select()
            .single();
          break;
        case 'tvshow':
          result = await supabase
            .from('tv_shows')
            .insert([newItemData])
            .select()
            .single();
          break;
        case 'game':
          result = await supabase
            .from('games')
            .insert([newItemData])
            .select()
            .single();
          break;
      }
      
      if (result?.error) {
        throw result.error;
      }
      
      console.log('Content created successfully:', result.data);
      
      // Also add to local state for immediate UI update
      const localItem = {
        id: result.data.id,
        ...newItemData,
        trending: false,
        hot: false
      };
      
      switch (contentType) {
        case 'movie':
          dispatch({ type: 'ADD_MOVIE', payload: localItem });
          break;
        case 'tvshow':
          dispatch({ type: 'ADD_TVSHOW', payload: localItem });
          break;
        case 'game':
          dispatch({ type: 'ADD_GAME', payload: localItem });
          break;
      }

      setSubmitSuccess(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate(contentType === 'tvshow' ? '/tvshows' : `/${contentType}s`);
      }, 1500);

    } catch (error) {
      console.error('Error creating content:', error);
      alert(`Failed to create content: ${error.message || 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
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

        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
            <div className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              <span>Content created successfully! Redirecting...</span>
            </div>
          </div>
        )}

        {/* Content Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
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
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder={`Enter ${contentType} description`}
              ></textarea>
            </div>

            {/* Genre */}
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-1">
                Genre *
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                required
                value={formData.genre}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="e.g. Action, Drama, Sci-Fi"
              />
            </div>

            {/* Rating */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-1">
                Rating
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="e.g. 8.5"
                min="0"
                max="10"
                step="0.1"
              />
            </div>

            {/* Release Year */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-1">
                {contentType === 'movie' ? 'Release Year' : 'Release Year'}
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
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
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
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
                  name="seasons"
                  value={formData.seasons}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  placeholder="e.g. 3"
                  min="1"
                />
              </div>
            )}

            {contentType === 'game' && (
              <div>
                <label htmlFor="platform" className="block text-sm font-medium text-gray-300 mb-1">
                  Platforms *
                </label>
                <input
                  type="text"
                  id="platform"
                  name="platform"
                  required
                  value={formData.platform}
                  onChange={handleInputChange}
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
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-400 hover:to-red-400 text-black font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Create {contentType?.charAt(0).toUpperCase() + contentType?.slice(1)}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateContentPage;