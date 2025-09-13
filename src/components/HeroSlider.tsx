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
      title: 'Top 10 Movies This Week',
      contentType: 'movie' as const,
      items: [
        {
          id: '1',
          title: 'F1',
          rating: 8.9,
          year: '2025',
          duration: '166 min',
          image: 'https://raw.githubusercontent.com/Blvck4K/Jss-png/refs/heads/main/f1-the-movie-8k-7680x4320-22458.jpg',
          description: 'a 2025 American sports drama film about a former Formula 1 driver, Sonny Hayes (Brad Pitt), who comes out of retirement to mentor and race alongside a rookie driver for his old friend's struggling team, facing conflict with the young driver and the team's near collapse'
        },
        {
          id: '2',
          title: 'Plankton: The Movie',
          rating: 8.7,
          year: '2025',
          duration: '180 min',
          image: 'https://m.media-amazon.com/images/M/MV5BOTg2YTMyNTktNTc5Yy00MTQzLWE0YTAtYWZiNTBjNDc0OGVlXkEyXkFqcGc@._V1_.jpg',
          description: 'a CGI-animated spin-off of SpongeBob SquarePants where the villain Plankton's plan for world domination is interrupted by his robotic wife, Karen, who decides to destroy the world without him after he continues to disrespect her'
        },
        {
          id: '3',
          title: 'Madea's Destination Wedding',
          rating: 8.1,
          year: '2025',
          duration: '192 min',
          image: 'https://readysteadycut.com/wp-content/uploads/2025/07/Madeas-Destination-Wedding-Key-Art.jpg',
          description: 'Follows Madea and her family as they travel to the Bahamas for the rushed wedding of Tiffany to her fiancé, Zavier'
        },
        {
          id: '4',
          title: 'Back in Action',
          rating: 8.3,
          year: '2025',
          duration: '130 min',
          image: 'https://ntvb.tmsimg.com/assets/p28700147_v_h10_aa.jpg?w=1280&h=720',
          description: 'a 2025 Netflix action-comedy film starring Jamie Foxx and Cameron Diaz as Matt and Emily, two former CIA spies who retired to raise a family but are forced back into the espionage world when their identities are exposed'
        },
        {
          id: '5',
          title: 'The Pickup',
          rating: 7.8,
          year: '2022',
          duration: '176 min',
          image: 'https://www.metacritic.com/a/img/resize/6f0e337ecd7dc30900437e802566736054e0e681/catalog/provider/2/13/2-6e10932fcd37595a68afc17617d1d4db.jpg?auto=webp&fit=crop&height=675&width=1200',
          description: 'Nadine Gordimer's 2001 novel about a relationship between a white South African woman and an illegal immigrant'
        },
        
      ]
    },
    {
      type: 'games',
      title: 'Top 10 Games This Week',
      contentType: 'game' as const,
      items: [
        {
          id: '1',
          title: 'Cyberpunk 2077: Phantom Liberty',
          rating: 9.2,
          year: '2023',
          duration: '40+ hours',
          image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Return to Night City in this spy thriller expansion featuring new characters and intense action.'
        },
        {
          id: '2',
          title: 'Baldur\'s Gate 3',
          rating: 9.5,
          year: '2023',
          duration: '100+ hours',
          image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal.'
        },
        {
          id: '3',
          title: 'Elden Ring',
          rating: 9.6,
          year: '2022',
          duration: '80+ hours',
          image: 'https://images.pexels.com/photos/7991668/pexels-photo-7991668.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring.'
        },
        {
          id: '4',
          title: 'God of War Ragnarök',
          rating: 9.4,
          year: '2022',
          duration: '50+ hours',
          image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Kratos and Atreus embark on a mythic journey for answers before Ragnarök arrives.'
        },
        {
          id: '5',
          title: 'Horizon Forbidden West',
          rating: 8.7,
          year: '2022',
          duration: '60+ hours',
          image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Join Aloy as she braves the Forbidden West to find the source of a mysterious plague.'
        },
        {
          id: '6',
          title: 'The Legend of Zelda: Tears of the Kingdom',
          rating: 9.8,
          year: '2023',
          duration: '70+ hours',
          image: 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'An epic adventure across the land and skies of Hyrule awaits.'
        },
        {
          id: '7',
          title: 'Starfield',
          rating: 8.2,
          year: '2023',
          duration: '100+ hours',
          image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'In this next generation role-playing game set amongst the stars.'
        },
        {
          id: '8',
          title: 'Spider-Man 2',
          rating: 9.0,
          year: '2023',
          duration: '25+ hours',
          image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Spider-Men Peter Parker and Miles Morales face the ultimate test of strength.'
        },
        {
          id: '9',
          title: 'Alan Wake 2',
          rating: 8.8,
          year: '2023',
          duration: '20+ hours',
          image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'A survival horror experience with an intricate and layered narrative.'
        },
        {
          id: '10',
          title: 'Super Mario Bros. Wonder',
          rating: 9.1,
          year: '2023',
          duration: '15+ hours',
          image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=800',
          description: 'Mario\'s latest adventure introduces Wonder Flowers that transform levels.'
        }
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

      {/* Thumbnail Strip */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-20">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {currentSlideData.items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentSlide(index)}
              className={`flex-shrink-0 w-16 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentSlide
                  ? 'border-yellow-400 scale-110'
                  : 'border-white/30 hover:border-white/50'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
