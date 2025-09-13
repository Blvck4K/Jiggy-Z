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
          rating: 8.9,
          year: '2024',
          duration: '166 min',
          image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Paul Atreides unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.'
        },
        {
          id: '2',
          title: 'Plankton Movie',
          rating: 8.7,
          year: '2023',
          duration: '180 min',
          image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.'
        },
        {
          id: '3',
          title: 'The Pickup',
          rating: 8.1,
          year: '2022',
          duration: '192 min',
          image: 'https://images.pexels.com/photos/7991668/pexels-photo-7991668.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.'
        },
        {
          id: '4',
          title: 'Back In Action',
          rating: 8.3,
          year: '2022',
          duration: '130 min',
          image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator.'
        },
        {
          id: '5',
          title: 'The Bad Guys 2',
          rating: 7.8,
          year: '2022',
          duration: '176 min',
          image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'When a sadistic serial killer begins murdering key political figures in Gotham.'
        },
      ]
    },
    {
      type: 'games',
      title: 'Top 3 Games This Week',
      contentType: 'game' as const,
      items: [
        {
          id: '1',
          title: 'WWE 2K25',
          rating: 9.2,
          year: '2023',
          duration: '40+ hours',
          image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Return to Night City in this spy thriller expansion featuring new characters and intense action.'
        },
        {
          id: '2',
          title: 'EA Sports FC 26',
          rating: 9.5,
          year: '2023',
          duration: '100+ hours',
          image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal.'
        },
        {
          id: '3',
          title: 'Tomb Raider IV–VI Remastered',
          rating: 9.6,
          year: '2022',
          duration: '80+ hours',
          image: 'https://images.pexels.com/photos/7991668/pexels-photo-7991668.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring.'
        },
        {
          id: '4',
          title: 'Assassin's Creed Shadows',
          rating: 9.4,
          year: '2022',
          duration: '50+ hours',
          image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Kratos and Atreus embark on a mythic journey for answers before Ragnarök arrives.'
        },
        {
          id: '5',
          title: 'Kingdom Come: Deliverance II',
          rating: 8.7,
          year: '2022',
          duration: '60+ hours',
          image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Join Aloy as she braves the Forbidden West to find the source of a mysterious plague.'
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
