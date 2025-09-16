import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

// Define types for our content
export interface Movie {
  id: string;
  title: string;
  description?: string;
  rating: number;
  year: string;
  genre: string;
  image: string;
  duration?: string;
  director?: string;
  cast?: string[];
  studio?: string;
  release_date?: string;
  trending?: boolean;
  hot?: boolean;
}

export interface TVShow {
  id: string;
  title: string;
  description?: string;
  rating: number;
  season: string;
  genre: string;
  image: string;
  episodes?: number;
  director?: string;
  cast?: string[];
  studio?: string;
  release_date?: string;
  trending?: boolean;
  hot?: boolean;
}

export interface Game {
  id: string;
  title: string;
  description?: string;
  rating: number;
  platform: string;
  genre: string;
  image: string;
  publisher?: string;
  developer?: string;
  release_date?: string;
  trending?: boolean;
  hot?: boolean;
}

export type ContentItem = Movie | TVShow | Game;
export type ContentType = 'movie' | 'tv' | 'game';

// Define the state structure
interface ContentState {
  movies: Movie[];
  tvShows: TVShow[];
  games: Game[];
}

// Define action types
type ContentAction =
  | { type: 'ADD_MOVIE'; payload: Movie }
  | { type: 'ADD_TVSHOW'; payload: TVShow }
  | { type: 'ADD_GAME'; payload: Game }
  | { type: 'DELETE_MOVIE'; payload: string }
  | { type: 'DELETE_TVSHOW'; payload: string }
  | { type: 'DELETE_GAME'; payload: string }
  | { type: 'SET_MOVIES'; payload: Movie[] }
  | { type: 'SET_TVSHOWS'; payload: TVShow[] }
  | { type: 'SET_GAMES'; payload: Game[] }
  | { type: 'LOAD_INITIAL_DATA' }
  | { type: 'SYNC_NEW_CONTENT'; payload: { type: 'movie' | 'tv' | 'game'; content: any } };

// Initial state with default data
const initialState: ContentState = {
  movies: [
    {
      id: '1',
      title: 'Ne Zha 2',
      description: 'The young deity Ne Zha returns in this epic sequel, facing new challenges and discovering the true meaning of heroism. With stunning animation and heartfelt storytelling, this film continues the beloved saga.',
      rating: 8.5,
      year: '2025',
      genre: 'Action, Crime',
      image: 'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2025/08/05084238/293Mo4GWf7Tl0TfAr5NFghqeMy7-scaled.jpg',
      duration: '108 min',
      director: 'Jiaozi',
      cast: ['Lü Yanting', 'Wang Xiao', 'Chen Hao'],
      studio: 'Coloroom Pictures',
      release_date: 'February 12, 2025',
      trending: true
    },
    {
      id: '2',
      title: 'Lilo & Stitch',
      description: 'A live-action adaptation of the beloved Disney animated classic. Follow the heartwarming story of a young Hawaiian girl and her alien companion as they discover the meaning of family.',
      rating: 9.1,
      year: '2025',
      genre: 'Sci-Fi, Drama',
      image: 'https://m.media-amazon.com/images/M/MV5BMzM0NTRkZWUtOTg5OC00YTBmLWI5NDEtZjQ5NjUwZTEyMTIxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      duration: '95 min',
      director: 'Dean Fleischer Camp',
      cast: ['Maia Kealoha', 'Sydney Agudong', 'Billy Magnussen'],
      studio: 'Walt Disney Pictures',
      release_date: 'May 23, 2025',
      hot: true
    },
    {
      id: '3',
      title: 'Super Man',
      description: 'A fresh take on the iconic superhero, exploring Clark Kent\'s journey as he embraces his destiny to become Earth\'s greatest protector. Featuring spectacular action and emotional depth.',
      rating: 7.8,
      year: '2025',
      genre: 'Action, Thriller',
      image: 'https://posterspy.com/wp-content/uploads/2025/07/supes1-1.jpg',
      duration: '142 min',
      director: 'James Gunn',
      cast: ['David Corenswet', 'Rachel Brosnahan', 'Nicholas Hoult'],
      studio: 'DC Studios',
      release_date: 'July 11, 2025',
    },
    {
      id: '4',
      title: 'Bad Guys',
      description: 'The notorious gang of animal outlaws are back for another hilarious heist adventure. Can they pull off their biggest score yet while staying on the right side of the law?',
      rating: 8.3,
      year: '2025',
      genre: 'Adventure',
      image: 'https://www.dreamworks.com/storage/cms-uploads/the-bad-guys-share-image.jpg',
      duration: '100 min',
      director: 'Pierre Perifel',
      cast: ['Sam Rockwell', 'Marc Maron', 'Awkwafina'],
      studio: 'DreamWorks Animation',
      release_date: 'August 1, 2025',
    }
  ],
  tvShows: [
    {
      id: '1',
      title: 'Andor',
      description: 'The story of the Rebel Alliance\'s formation continues in this gripping prequel to Rogue One. Follow Cassian Andor\'s journey from revolutionary to rebel spy in a galaxy under Imperial rule.',
      rating: 9.2,
      season: 'Season 2',
      genre: 'Sci-Fi, Drama',
      image: 'https://posterspy.com/wp-content/uploads/2025/04/andor.jpg',
      episodes: 12,
      director: 'Tony Gilroy',
      cast: ['Diego Luna', 'Stellan Skarsgård', 'Adria Arjona'],
      studio: 'Lucasfilm',
      release_date: 'April 22, 2025',
      trending: true
    },
    {
      id: '2',
      title: 'Severance',
      description: 'The mind-bending workplace thriller returns with more psychological twists. Employees at Lumon Industries continue to navigate the mysterious separation between their work and personal lives.',
      rating: 8.7,
      season: 'Season 2',
      genre: 'Cyberpunk, Thriller',
      image: 'https://cdn.theplaylist.net/wp-content/uploads/2024/07/09153120/severance-season-2.jpg',
      episodes: 10,
      director: 'Ben Stiller',
      cast: ['Adam Scott', 'Britt Lower', 'Zach Cherry'],
      studio: 'Apple Studios',
      release_date: 'January 17, 2025',
      hot: true
    },
    {
      id: '3',
      title: 'The Pitt',
      description: 'A medical drama set in a Pittsburgh hospital emergency room. Follow the dedicated staff as they navigate life-and-death situations while dealing with personal challenges.',
      rating: 8.1,
      season: 'Season 1',
      genre: 'Action, Adventure',
      image: 'https://resizing.flixster.com/K534zxPqMQMw8SluoZi_q2FjUDs=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vODQ2ZTJmZTYtYWQ5Yy00OGE5LWJlOGQtMDg5Y2UyM2QyN2RiLmpwZw==',
      episodes: 15,
      director: 'R.J. Cutler',
      cast: ['Noah Wyle', 'Tracy Ifeachor', 'Patrick Ball'],
      studio: 'Warner Bros. Television',
      release_date: 'January 9, 2025',
    },
    {
      id: '4',
      title: 'Alien Earth ',
      description: 'Set 30 years before the events of Alien, this prequel series explores the origins of the Weyland-Yutani Corporation and humanity\'s first encounter with the deadly Xenomorphs.',
      rating: 8.9,
      season: 'Season 1',
      genre: 'Drama, Tech',
      image: 'https://bloody-disgusting.com/wp-content/uploads/2025/03/alien-earth-scaled.jpg',
      episodes: 8,
      director: 'Noah Hawley',
      cast: ['Sydney Chandler', 'Alex Lawther', 'Timothy Olyphant'],
      studio: '20th Television',
      release_date: 'Summer 2025',
    }
  ],
  games: [
    {
      id: '1',
      title: 'Monster Hunter Wilds',
      description: 'Embark on an epic hunting adventure in vast, living ecosystems. Experience the thrill of tracking and battling massive monsters in this next-generation Monster Hunter experience.',
      rating: 9.5,
      platform: 'PC, PS5, Xbox',
      genre: 'RPG, Open World',
      image: 'https://4kwallpapers.com/images/walls/thumbs_3t/19165.jpg',
      publisher: 'Capcom',
      developer: 'Capcom',
      release_date: 'February 28, 2025',
      trending: true
    },
    {
      id: '2',
      title: 'Split Fiction',
      description: 'A cooperative action-adventure from the creators of It Takes Two. Two writers must work together to escape the fantastical worlds of their own stories.',
      rating: 8.8,
      platform: 'All Platforms',
      genre: 'Strategy, Sci-Fi',
      image: 'https://cdn1.epicgames.com/offer/578f39d17be846e7a6fa335f757012aa/EGS_SplitFiction_HazelightStudiosAB_S2_1200x1600-d626c4ebc51d7b5bacbfd015368b674c',
      publisher: 'Electronic Arts',
      developer: 'Hazelight Studios',
      release_date: 'March 6, 2025',
      hot: true
    },
    {
      id: '3',
      title: 'Hollow Knight: Silksong',
      description: 'The highly anticipated sequel to Hollow Knight. Play as Hornet in this challenging Metroidvania adventure through the haunting kingdom of Pharloom.',
      rating: 8.4,
      platform: 'PC, Mobile',
      genre: 'Puzzle, Strategy',
      image: 'https://assets.nintendo.eu/image/upload/f_auto/q_auto/v1757304516/NAL/Articles/2025/09-September/1920x1080_NintendoSwitch2_Hollow-Knight-Silksong.jpg',
      publisher: 'Team Cherry',
      developer: 'Team Cherry',
      release_date: 'TBA 2025',
    },
    {
      id: '4',
      title: 'Doom: The Dark Ages',
      description: 'A medieval prequel to the modern Doom series. Witness the origins of the Doom Slayer in this brutal, fast-paced shooter set in a dark fantasy world.',
      rating: 9.0,
      platform: 'Next-Gen Only',
      genre: 'Adventure, RPG',
      image: 'https://images5.alphacoders.com/138/1389830.jpg',
      publisher: 'Bethesda Softworks',
      developer: 'id Software',
      release_date: 'May 15, 2025',
    }
  ]
};

// Reducer function
function contentReducer(state: ContentState, action: ContentAction): ContentState {
  switch (action.type) {
    case 'ADD_MOVIE':
      return { ...state, movies: [...state.movies, action.payload] };
    case 'ADD_TVSHOW':
      return { ...state, tvShows: [...state.tvShows, action.payload] };
    case 'ADD_GAME':
      return { ...state, games: [...state.games, action.payload] };
    case 'DELETE_MOVIE':
      return { ...state, movies: state.movies.filter(movie => movie.id !== action.payload) };
    case 'DELETE_TVSHOW':
      return { ...state, tvShows: state.tvShows.filter(show => show.id !== action.payload) };
    case 'DELETE_GAME':
      return { ...state, games: state.games.filter(game => game.id !== action.payload) };
    case 'SET_MOVIES':
      return { ...state, movies: action.payload };
    case 'SET_TVSHOWS':
      return { ...state, tvShows: action.payload };
    case 'SET_GAMES':
      return { ...state, games: action.payload };
    case 'LOAD_INITIAL_DATA':
      return initialState;
    case 'SYNC_NEW_CONTENT':
      switch (action.payload.type) {
        case 'movie':
          return { ...state, movies: [...state.movies, action.payload.content] };
        case 'tv':
          return { ...state, tvShows: [...state.tvShows, action.payload.content] };
        case 'game':
          return { ...state, games: [...state.games, action.payload.content] };
        default:
          return state;
      }
    default:
      return state;
  }
}

// Create context
const ContentContext = createContext<{
  state: ContentState;
  dispatch: React.Dispatch<ContentAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Provider component
export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(contentReducer, initialState);

  // Set up real-time subscriptions for new content
  React.useEffect(() => {
    // Subscribe to movies table changes
    const moviesSubscription = supabase
      .channel('movies-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'movies'
        },
        (payload) => {
          console.log('New movie added:', payload.new);
          dispatch({
            type: 'SYNC_NEW_CONTENT',
            payload: { type: 'movie', content: payload.new }
          });
        }
      )
      .subscribe();

    // Subscribe to tv_shows table changes
    const tvShowsSubscription = supabase
      .channel('tv-shows-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'tv_shows'
        },
        (payload) => {
          console.log('New TV show added:', payload.new);
          dispatch({
            type: 'SYNC_NEW_CONTENT',
            payload: { type: 'tv', content: payload.new }
          });
        }
      )
      .subscribe();

    // Subscribe to games table changes
    const gamesSubscription = supabase
      .channel('games-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'games'
        },
        (payload) => {
          console.log('New game added:', payload.new);
          dispatch({
            type: 'SYNC_NEW_CONTENT',
            payload: { type: 'game', content: payload.new }
          });
        }
      )
      .subscribe();

    // Cleanup subscriptions on unmount
    return () => {
      supabase.removeChannel(moviesSubscription);
      supabase.removeChannel(tvShowsSubscription);
      supabase.removeChannel(gamesSubscription);
    };
  }, []);

  return (
    <ContentContext.Provider value={{ state, dispatch }}>
      {children}
    </ContentContext.Provider>
  );
};

// Custom hooks for easier access
export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

// Action creators for convenience
export const contentActions = {
  addMovie: (movie: Movie) => ({ type: 'ADD_MOVIE' as const, payload: movie }),
  addTVShow: (show: TVShow) => ({ type: 'ADD_TVSHOW' as const, payload: show }),
  addGame: (game: Game) => ({ type: 'ADD_GAME' as const, payload: game }),
  deleteMovie: (id: string) => ({ type: 'DELETE_MOVIE' as const, payload: id }),
  deleteTVShow: (id: string) => ({ type: 'DELETE_TVSHOW' as const, payload: id }),
  deleteGame: (id: string) => ({ type: 'DELETE_GAME' as const, payload: id }),
};

// Helper function to generate unique IDs
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};