import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Clock, Play, Plus, Heart, Share2, MessageCircle, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const ContentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
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
        
        // In a real app, we would determine the content type and fetch from the appropriate table
        // For now, we'll use demo content
        
        // Determine content type based on ID or other logic
        // This is a placeholder - in a real app, you'd have a way to determine the content type
        const type = id?.startsWith('m') ? 'movie' : id?.startsWith('t') ? 'tv' : 'game';
        setContentType(type as 'movie' | 'tv' | 'game');
        
        // Fetch the content item details from Supabase
        // This is a placeholder - in a real app, you'd fetch from your database
        
        // For demo purposes, we'll use hardcoded content
        setContent(demoContent);
        setSimilarContent([1, 2, 3, 4].map(i => ({
          ...demoContent,
          id: `${i}`,
          title: `Similar ${type} ${i}`,
          rating: (8 + Math.random()).toFixed(1)
        })));
        
        // Load demo comments and ratings
        setComments([
          {
            id: '1',
            user: 'MovieFan2024',
            avatar: 'MF',
            comment: 'Absolutely incredible! The visuals are stunning and the story keeps you engaged throughout. This is definitely a must-watch.',
            rating: 9,
            timestamp: '2 days ago',
            likes: 12,
            dislikes: 1
          },
          {
            id: '2',
            user: 'CinemaLover',
            avatar: 'CL',
            comment: 'Great cinematography and excellent performances. The pacing could have been better in some parts, but overall a solid experience.',
            rating: 8,
            timestamp: '5 days ago',
            likes: 8,
            dislikes: 0
          },
          {
            id: '3',
            user: 'ReviewMaster',
            avatar: 'RM',
            comment: 'Not bad, but I expected more from this one. The story felt predictable and some characters were underdeveloped.',
            rating: 6,
            timestamp: '1 week ago',
            likes: 3,
            dislikes: 5
          }
        ]);
        
        // Calculate average rating
        const ratings = [9, 8, 6, 8.9]; // Including the main rating
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
  }, [id]);

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

  // Demo content for preview purposes
  const demoContent = {
    id: id || '1',
    title: contentType === 'movie' ? 'Dune: Part Two' : contentType === 'tv' ? 'Cosmic Chronicles' : 'Cyber Revolution 2077',
    description: 'Paul Atreides unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.',
    rating: 8.9,
    year: '2025',
    duration: contentType === 'movie' ? '166 min' : contentType === 'game' ? '40+ hours' : undefined,
    season: contentType === 'tv' ? 'Season 3' : undefined,
    platform: contentType === 'game' ? 'PC, PS5, Xbox' : undefined,
    genre: contentType === 'movie' ? 'Sci-Fi, Adventure' : contentType === 'tv' ? 'Sci-Fi, Drama' : 'RPG, Open World',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    trailer_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Josh Brolin'],
    director: 'Denis Villeneuve',
    studio: 'Legendary Pictures',
    publisher: contentType === 'game' ? 'CD Projekt Red' : undefined,
    release_date: 'March 1, 2025',
    fullDescription: `This epic continuation of the Dune saga takes viewers on an unforgettable journey through the desert planet of Arrakis. Paul Atreides, now fully embracing his destiny as the prophesied leader, must navigate the complex political landscape while leading the Fremen in their fight for freedom.

The film masterfully balances spectacular action sequences with intimate character moments, exploring themes of power, destiny, and the cost of leadership. The cinematography captures the vast, otherworldly beauty of Arrakis, while the sound design immerses audiences in this alien world.

Director Denis Villeneuve has crafted a worthy successor that honors Frank Herbert's vision while bringing fresh perspectives to this beloved science fiction universe. The performances are outstanding across the board, with particular praise for the leads who bring depth and nuance to their complex characters.

This is more than just a sequel - it's a cinematic experience that will leave audiences eagerly anticipating the next chapter in this extraordinary saga.`
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

  const displayContent = content;
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
                  <span>{displayContent.year}</span>
                </div>
                {displayContent.duration && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-5 h-5" />
                    <span>{displayContent.duration}</span>
                  </div>
                )}
                {displayContent.season && (
                  <div className="flex items-center space-x-1">
                    <span>{displayContent.season}</span>
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
            {/* Full Post Content Section */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">About This {contentType === 'movie' ? 'Movie' : contentType === 'tv' ? 'Show' : 'Game'}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {displayContent.fullDescription}
                </p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                {displayContent.description}
              </p>
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
                  {displayContent.studio && (
                    <div>
                      <p className="text-gray-400 text-sm">Developer</p>
                      <p className="text-white">{displayContent.studio}</p>
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
            
            {/* User Interaction Section - Comments and Ratings */}
            {isAuthenticated && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Rate & Review</h2>
                
                {/* Rating Overview */}
                <div className="mb-8 p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-3xl font-bold text-yellow-400">{averageRating}</span>
                        <div className="flex items-center">
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
                      </div>
                      <p className="text-gray-400 text-sm">Based on {totalRatings} ratings</p>
                    </div>
                  </div>
                </div>

                {/* User Rating Section */}
                <div className="mb-8 p-4 bg-slate-700/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Your Rating</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRatingSubmit(rating)}
                        onMouseEnter={() => setHoverRating(rating)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center text-sm font-semibold ${
                          (hoverRating >= rating || userRating >= rating)
                            ? 'bg-yellow-400 border-yellow-400 text-black'
                            : 'border-gray-400 text-gray-400 hover:border-yellow-400 hover:text-yellow-400'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                  {userRating > 0 && (
                    <p className="text-green-400 text-sm">You rated this {userRating}/10</p>
                  )}
                </div>
                
                {/* Comment Form */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-3">Leave a Comment</h3>
                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts about this content..."
                      className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 resize-none"
                      rows={4}
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-400 hover:to-red-400 text-black font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                        <span>Post Comment</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Comments List */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Comments ({comments.length})</h3>
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="p-4 bg-slate-700/50 rounded-lg">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex-shrink-0 flex items-center justify-center text-black font-bold">
                            {comment.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <h4 className="text-white font-medium">{comment.user}</h4>
                                {comment.rating && (
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-yellow-400 text-sm">{comment.rating}/10</span>
                                  </div>
                                )}
                              </div>
                              <span className="text-gray-400 text-xs">{comment.timestamp}</span>
                            </div>
                            <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                              {comment.comment}
                            </p>
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => handleCommentLike(comment.id, true)}
                                className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors duration-200"
                              >
                                <ThumbsUp className="w-4 h-4" />
                                <span className="text-xs">{comment.likes}</span>
                              </button>
                              <button
                                onClick={() => handleCommentLike(comment.id, false)}
                                className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
                              >
                                <ThumbsDown className="w-4 h-4" />
                                <span className="text-xs">{comment.dislikes}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Login Prompt for Non-Authenticated Users */}
            {!isAuthenticated && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Join the Conversation</h3>
                  <p className="text-gray-400 mb-4">
                    Sign in to rate this content and share your thoughts with the community.
                  </p>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-400 hover:to-red-400 text-black font-semibold rounded-lg transition-all duration-200"
                  >
                    Sign In to Comment & Rate
                  </button>
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
                      <h4 className="text-white font-medium">
                        {item.title}
                      </h4>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 text-xs ml-1">
                          {item.rating}
                        </span>
                        <span className="text-gray-400 text-xs ml-2">
                          {item.year}
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