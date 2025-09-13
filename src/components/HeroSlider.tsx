import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Calendar, Clock } from 'lucide-react';

interface HeroSliderProps {
  onSelectContent?: (id: string, type: 'movie' | 'tv' | 'game') => void;
  isAuthenticated?: boolean;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ 
  onSelectContent = () => {}, 
  isAuthenticated = false 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      type: 'movies',
      title: 'Top 5 Movies This Week',
      contentType: 'movie' as const,
      items: [
        {
          id: '1',
          title: 'F1 Movie',
          rating: 7.7,
          year: '2025',
          duration: '166 min',
          image: 'https://cdn.mos.cms.futurecdn.net/VrEtpocsNy5TxqNxonMJZA.jpg',
          description: 'A washed-up F1 driver returns to mentor a rookie and save his team.'
        },
        {
          id: '2',
          title: 'Plankton Movie',
          rating: 5.8,
          year: '2025',
          duration: '180 min',
          image: 'https://m.media-amazon.com/images/M/MV5BOTg2YTMyNTktNTc5Yy00MTQzLWE0YTAtYWZiNTBjNDc0OGVlXkEyXkFqcGc@._V1_.jpg',
          description: 'Plankton and SpongeBob must stop Karen from taking over the world.'
        },
        {
          id: '3',
          title: 'The Pickup',
          rating: 4.9,
          year: '2025',
          duration: '192 min',
          image: 'https://www.metacritic.com/a/img/resize/6f0e337ecd7dc30900437e802566736054e0e681/catalog/provider/2/13/2-6e10932fcd37595a68afc17617d1d4db.jpg?auto=webp&fit=crop&height=675&width=1200',
          description: 'Two armored truck drivers get caught in a high-stakes heist.'
        },
        {
          id: '4',
          title: 'Back In Action',
          rating: 6.2,
          year: '2025',
          duration: '130 min',
          image: 'https://www.whats-on-netflix.com/wp-content/uploads/2024/05/back-in-action-netflix-movie-everything-we-know.jpg',
          description: 'Two suburban ex-spies are forced back into action.'
        },
        {
          id: '5',
          title: 'The Bad Guys 2',
          rating: 7.4,
          year: '2025',
          duration: '176 min',
          image: 'https://www.animationmagazine.net/wordpress/wp-content/uploads/Bad-Guys-2-digital-kv.jpg',
          description: 'The reformed Bad Guys are framed and must clear their names.'
        },
      ]
    },
    {
      type: 'games',
      title: 'Top 5 Games This Week',
      contentType: 'game' as const,
      items: [
        {
          id: '1',
          title: 'WWE 2K25',
          rating: 6.1,
          year: '2025',
          duration: '40+ hours',
          image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: ' A wrestling game with a new story mode, intergender matches, and a new online open world.'
        },
        {
          id: '2',
          title: 'Call of Duty Season 8',
          rating: 8.9,
          year: '2025',
          duration: '100+ hours',
          image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'A soccer game featuring new gameplay styles and a redesigned Ultimate Team.'
        },
        {
          id: '3',
          title: 'Tomb Raider IV–VI Remastered',
          rating: 8.1,
          year: '2025',
          duration: '80+ hours',
          image: 'https://images.pexels.com/photos/7991668/pexels-photo-7991668.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'A remastered collection of three classic Tomb Raider games.'
        },
        {
          id: '4',
          title: 'Farlight 84',
          rating: 7.0,
          year: '2025',
          duration: '50+ hours',
          image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'A stealth-action game set in feudal Japan with two playable characters.'
        },
        {
          id: '5',
          title: 'Kingdom Come Deliverance II',
          rating: 9.1,
          year: '2025',
          duration: '60+ hours',
          image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'A first-person RPG continuing the revenge story of Henry in 15th-century Bohemia.'
        },
        
      ]
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides[0].items.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides[0].items.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides[0].items.length) % slides[0].items.length);
  };

  const [currentCategory, setCurrentCategory] = useState(0);
  const currentSlideData = slides[currentCategory];
  const currentItem = currentSlideData.items[currentSlide];

  const handleViewDetails = () => {
    onSelectContent(currentItem.id, currentSlideData.contentType);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentItem.image}
          alt={currentItem.title}
          className="w-full h-full object-cover transition-all duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Category Selector */}
            <div className="mb-6 flex space-x-4">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentCategory(index);
                    setCurrentSlide(0);
                  }}
                  className={`px-4 py-2 rounded-full text-sm uppercase tracking-wide font-semibold transition-all duration-200 ${
                    index === currentCategory
                      ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-black'
                      : 'bg-black/50 text-white hover:bg-black/70'
                  }`}
                >
                  {slide.title}
                </button>
              ))}
            </div>

            {/* Current Item Counter */}
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-500 text-black font-semibold rounded-full text-sm uppercase tracking-wide">
                {currentSlide + 1} of {currentSlideData.items.length}
              </span>
            </div>

            {/* Featured Item */}
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {currentItem.title}
              </h2>

              <div className="flex items-center space-x-6 text-gray-300">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{currentItem.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-5 h-5" />
                  <span>{currentItem.year}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-5 h-5" />
                  <span>{currentItem.duration}</span>
                </div>
              </div>

              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                {currentItem.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleViewDetails}
                  className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-red-500 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-red-400 transition-all duration-200 transform hover:scale-105"
                >
                  {currentSlideData.type === 'movies' ? 'Watch Now' : 'Play Now'}
                </button>
                <button 
                  onClick={handleViewDetails}
                  className="px-8 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {currentSlideData.items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-yellow-400' : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Auto-play Control */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 px-4 py-2 bg-black/50 hover:bg-black/70 text-white text-sm rounded transition-all duration-200 z-20"
      >
        {isAutoPlaying ? 'Pause' : 'Play'}
      </button>
    </section>
  );
};

export default HeroSlider;
