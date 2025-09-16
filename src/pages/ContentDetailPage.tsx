import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Clock, Play, Plus, Heart, Share2, MessageCircle, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { supabase } from '../lib/supabase';

const ContentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { state } = useContent();
  const [content, setContent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [similarContent, setSimilarContent] = useState<any[]>([]);
  const [contentType, setContentType] = useState<'movie' | 'tv' | 'game'>('movie');
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalRatings, setTotalRatings] = useState<number>(0);

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        setLoading(true);
        
        // Find the content item from our context state
        let foundContent = null;
        let type: 'movie' | 'tv' | 'game' = 'movie';
        
        // Search in movies
        foundContent = state.movies.find(movie => movie.id === id);
        if (foundContent) {
          type = 'movie';
        } else {
          // Search in TV shows
          foundContent = state.tvShows.find(show => show.id === id);
          if (foundContent) {
            type = 'tv';
          } else {
            // Search in games
            foundContent = state.games.find(game => game.id === id);
            if (foundContent) {
              type = 'game';
            }
          }
        }
        
        if (!foundContent) {
          throw new Error('Content not found');
        }
        
        setContentType(type);
        setContent(foundContent);
        
        // Get similar content from the same category
        let similarItems = [];
        if (type === 'movie') {
          similarItems = state.movies.filter(movie => movie.id !== id && movie.genre.split(',')[0].trim() === foundContent.genre.split(',')[0].trim()).slice(0, 4);
        } else if (type === 'tv') {
          similarItems = state.tvShows.filter(show => show.id !== id && show.genre.split(',')[0].trim() === foundContent.genre.split(',')[0].trim()).slice(0, 4);
        } else {
          similarItems = state.games.filter(game => game.id !== id && game.genre.split(',')[0].trim() === foundContent.genre.split(',')[0].trim()).slice(0, 4);
        }
        
        setSimilarContent(similarItems);
        
        // Load demo comments and ratings
        setComments([
          {
            id: '1',
            user: 'MovieFan2024',
            avatar: 'MF',
            comment: `Absolutely incredible! The visuals are stunning and the story keeps you engaged throughout. ${foundContent.title} is definitely a must-watch.`,
            rating: 9,
            timestamp: '2 days ago',
            likes: 12,
            dislikes: 1
          },
          {
            id: '2',
            user: 'CinemaLover',
            avatar: 'CL',
            comment: `Great ${type === 'game' ? 'gameplay' : 'cinematography'} and excellent ${type === 'game' ? 'mechanics' : 'performances'}. The pacing could have been better in some parts, but overall a solid experience.`,
            rating: 8,
            timestamp: '5 days ago',
            likes: 8,
            dislikes: 0
          },
          {
            id: '3',
            user: 'ReviewMaster',
            avatar: 'RM',
            comment: `Not bad, but I expected more from ${foundContent.title}. The story felt predictable and some characters were underdeveloped.`,
            rating: 6,
            timestamp: '1 week ago',
            likes: 3,
            dislikes: 5
          }
        ]);
        
        // Calculate average rating
        const ratings = [9, 8, 6, foundContent.rating]; // Including the main rating
        const avg = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
        setAverageRating(Number(avg.toFixed(1)));
        setTotalRatings(ratings.length);
      } catch (err: any) {
        console.error('Error fetching content details:', err);
        setError(err.message || 'Failed to load content details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchContentDetails();
  }, [id, state]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRatingSubmit = (rating: number) => {
    if (!user) {
      alert('Please log in to rate this content');
      return;
    }
    setUserRating(rating);
    // In a real app, you would save this to the database
    console.log('User rated:', rating);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to comment');
      return;
    }
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now().toString(),
      user: user.email?.split('@')[0] || 'User',
      avatar: user.email?.charAt(0).toUpperCase() || 'U',
      comment: newComment,
      rating: userRating,
      timestamp: 'Just now',
      likes: 0,
      dislikes: 0
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    // In a real app, you would save this to the database
  };

  const handleCommentLike = (commentId: string, isLike: boolean) => {
    if (!user) {
      alert('Please log in to interact with comments');
      return;
    }
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: isLike ? comment.likes + 1 : comment.likes,
          dislikes: !isLike ? comment.dislikes + 1 : comment.dislikes
        };
      }
      return comment;
    }));
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 -z-10"></div>
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)] -z-10"></div>
        <div className="text-yellow-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 -z-10"></div>
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)] -z-10"></div>
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  const displayContent = content || {};
  const isAuthenticated = !!user;

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 -z-10"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)] -z-10"></div>
      
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <button 
          onClick={handleBack}
          className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>
      
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={displayContent.image}
            alt={displayContent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                {displayContent.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{displayContent.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-5 h-5" />
                  <span>{contentType === 'tv' ? displayContent.season : displayContent.year}</span>
                </div>
                {displayContent.duration && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-5 h-5" />
                    <span>{displayContent.duration}</span>
                  </div>
                )}
                {contentType === 'tv' && displayContent.episodes && (
                  <div className="flex items-center space-x-1">
                    <span>{displayContent.episodes} Episodes</span>
                  </div>
                )}
                {displayContent.platform && (
                  <div className="flex items-center space-x-1">
                    <span>{displayContent.platform}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <span className="px-3 py-1 bg-slate-800/80 rounded-full text-sm">
                    {displayContent.genre}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <button className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-red-500 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-red-400 transition-all duration-200 transform hover:scale-105 flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  {contentType === 'movie' || contentType === 'tv' ? 'Watch Now' : 'Play Now'}
                </button>
                {isAuthenticated && (
                  <>
                    <button className="px-8 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center">
                      <Plus className="w-5 h-5 mr-2" />
                      Add to List
                    </button>
                    <button className="p-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-200">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-200">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Details Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Full Post Content Section - Enhanced */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                  About This {contentType === 'movie' ? 'Movie' : contentType === 'tv' ? 'Show' : 'Game'}
                </span>
              </h2>
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed text-lg space-y-4">
                  <p className="first-letter:text-5xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
                    {displayContent.description || 'No detailed description available for this content.'}
                  </p>
                  {displayContent.description && displayContent.description.length > 200 && (
                    <div className="mt-4 pt-4 border-t border-slate-700/50">
                      <p className="text-sm text-gray-400 italic">
                        This comprehensive overview provides insights into the {contentType}'s key themes, 
                        characters, and overall experience to help you decide if it's right for you.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Cast & Crew */}
            {(contentType === 'movie' || contentType === 'tv') && displayContent.cast && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Cast & Crew</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {displayContent.cast.map((actor: string, index: number) => (
                    <div key={index} className="text-center">
                      <div className="w-20 h-20 mx-auto bg-slate-700 rounded-full mb-2"></div>
                      <p className="text-white font-medium">{actor}</p>
                      <p className="text-gray-400 text-sm">Character Name</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {displayContent.director && (
                      <div>
                        <p className="text-gray-400 text-sm">Director</p>
                        <p className="text-white">{displayContent.director}</p>
                      </div>
                    )}
                    {displayContent.studio && (
                      <div>
                        <p className="text-gray-400 text-sm">Studio</p>
                        <p className="text-white">{displayContent.studio}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Game Details */}
            {contentType === 'game' && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Game Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {displayContent.publisher && (
                    <div>
                      <p className="text-gray-400 text-sm">Publisher</p>
                      <p className="text-white">{displayContent.publisher}</p>
                    </div>
                  )}
                  {displayContent.developer && (
                    <div>
                      <p className="text-gray-400 text-sm">Developer</p>
                      <p className="text-white">{displayContent.developer}</p>
                    </div>
                  )}
                  {displayContent.release_date && (
                    <div>
                      <p className="text-gray-400 text-sm">Release Date</p>
                      <p className="text-white">{displayContent.release_date}</p>
                    </div>
                  )}
                  {displayContent.platform && (
                    <div>
                      <p className="text-gray-400 text-sm">Platforms</p>
                      <p className="text-white">{displayContent.platform}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Enhanced User Interaction Section - Comments and Ratings */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                  Community Reviews
                </span>
                <span className="ml-3 text-sm text-gray-400 font-normal">
                  ({totalRatings} ratings, {comments.length} reviews)
                </span>
              </h2>
              
              {/* Enhanced Rating Overview */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-yellow-400">{averageRating}</div>
                        <div className="flex items-center justify-center mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= Math.round(averageRating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-400'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{totalRatings} ratings</p>
                      </div>
                      <div className="border-l border-slate-600 pl-4">
                        <div className="text-sm text-gray-300">
                          <div className="flex items-center space-x-2">
                            <span className="w-12">5 stars</span>
                            <div className="flex-1 h-2 bg-slate-600 rounded">
                              <div className="h-full bg-yellow-400 rounded" style={{width: '75%'}}></div>
                            </div>
                            <span className="text-xs">75%</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="w-12">4 stars</span>
                            <div className="flex-1 h-2 bg-slate-600 rounded">
                              <div className="h-full bg-yellow-400 rounded" style={{width: '20%'}}></div>
                            </div>
                            <span className="text-xs">20%</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="w-12">3 stars</span>
                            <div className="flex-1 h-2 bg-slate-600 rounded">
                              <div className="h-full bg-yellow-400 rounded" style={{width: '5%'}}></div>
                            </div>
                            <span className="text-xs">5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Rating Section */}
              {isAuthenticated && (
                <>
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Rate This Content</h3>
                    <div className="bg-slate-700/30 p-6 rounded-xl">
                      <div className="flex items-center justify-center space-x-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => handleRatingSubmit(rating)}
                            onMouseEnter={() => setHoverRating(rating)}
                            onMouseLeave={() => setHoverRating(0)}
                            className={`w-12 h-12 rounded-full border-2 transition-all duration-200 flex items-center justify-center font-bold text-lg ${
                              (hoverRating >= rating || userRating >= rating)
                                ? 'bg-gradient-to-r from-yellow-400 to-red-500 border-transparent text-black shadow-lg transform scale-110'
                                : 'border-slate-600 text-slate-300 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-md'
                            }`}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                      {userRating > 0 && (
                        <p className="text-center text-green-400 mt-3 font-medium">
                          ✓ You rated this {userRating}/10
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Comment Form */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Share Your Thoughts</h3>
                    <form onSubmit={handleCommentSubmit} className="space-y-4">
                      <div className="bg-slate-700/30 p-6 rounded-xl">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="What did you think about this content? Share your detailed thoughts..."
                          className="w-full p-4 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 resize-none transition-all duration-200"
                          rows={5}
                        />
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm text-gray-400">
                            {newComment.length}/500 characters
                          </span>
                          <button
                            type="submit"
                            disabled={!newComment.trim()}
                            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-400 hover:to-red-400 text-black font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                          >
                            <Send className="w-4 h-4" />
                            <span>Post Review</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              )}

              {/* Enhanced Comments List */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">
                  Recent Reviews ({comments.length})
                </h3>
                <div className="space-y-4">
                  {comments.map((comment, index) => (
                    <div 
                      key={comment.id} 
                      className={`p-6 bg-slate-700/30 rounded-xl border border-slate-600/50 transition-all duration-200 hover:border-slate-500/50 ${
                        index === 0 ? 'border-yellow-500/30 bg-slate-700/50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex-shrink-0 flex items-center justify-center text-black font-bold">
                            {comment.avatar}
                          </div>
                          {index === 0 && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                              <span className="text-xs text-black font-bold">★</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <h4 className="text-white font-semibold">{comment.user}</h4>
                              {comment.rating && (
                                <div className="flex items-center space-x-1 bg-slate-800/50 px-3 py-1 rounded-full">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-yellow-400 text-sm font-medium">{comment.rating}/10</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-400 text-sm">{comment.timestamp}</span>
                              {index === 0 && (
                                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                                  Most Recent
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4 leading-relaxed">
                            {comment.comment}
                          </p>
                          <div className="flex items-center space-x-6">
                            <button
                              onClick={() => handleCommentLike(comment.id, true)}
                              className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors duration-200"
                            >
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm">{comment.likes}</span>
                            </button>
                            <button
                              onClick={() => handleCommentLike(comment.id, false)}
                              className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                            >
                              <ThumbsDown className="w-4 h-4" />
                              <span className="text-sm">{comment.dislikes}</span>
                            </button>
                            <button className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Enhanced Login Prompt for Non-Authenticated Users */}
            {!isAuthenticated && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8">
                <div className="text-center max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Join Our Community</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Be part of the conversation! Rate content, share your reviews, and connect with 
                    other enthusiasts who share your interests.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => navigate('/login')}
                      className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-400 hover:to-red-400 text-black font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      Sign In to Review
                    </button>
                    <button
                      onClick={() => navigate('/signup')}
                      className="px-8 py-3 border border-yellow-500/50 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-500/10 transition-all duration-200"
                    >
                      Create Account
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    Already have an account? Sign in to start sharing your thoughts today.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Similar Content */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Similar {contentType === 'movie' ? 'Movies' : contentType === 'tv' ? 'TV Shows' : 'Games'}
              </h3>
              
              <div className="space-y-4">
                {similarContent.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-16 h-24 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 
                        className="text-white font-medium cursor-pointer hover:text-yellow-400 transition-colors duration-200"
                        onClick={() => navigate(`/content/${item.id}`)}
                      >
                        {item.title}
                      </h4>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 text-xs ml-1">
                          {item.rating}
                        </span>
                        <span className="text-gray-400 text-xs ml-2">
                          {contentType === 'tv' ? item.season : item.year || item.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Where to Watch */}
            {(contentType === 'movie' || contentType === 'tv') && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Where to Watch</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-white">Netflix</span>
                    <span className="text-green-400">Included</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-white">Amazon Prime</span>
                    <span className="text-yellow-400">Rent $4.99</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-white">Apple TV</span>
                    <span className="text-yellow-400">Buy $14.99</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Where to Buy */}
            {contentType === 'game' && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Where to Buy</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-white">Steam</span>
                    <span className="text-yellow-400">$59.99</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-white">Epic Games</span>
                    <span className="text-green-400">$49.99</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-white">PlayStation Store</span>
                    <span className="text-yellow-400">$59.99</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetailPage;