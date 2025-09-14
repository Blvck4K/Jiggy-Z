import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define types for our content
export interface Movie {
  id: string;
  title: string;
  rating: number;
  year: string;
  genre: string;
  image: string;
  trending?: boolean;
  hot?: boolean;
}

export interface TVShow {
  id: string;
  title: string;
  rating: number;
  season: string;
  genre: string;
  image: string;
  trending?: boolean;
  hot?: boolean;
}

export interface Game {
  id: string;
  title: string;
  rating: number;
  platform: string;
  genre: string;
  image: string;
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
  | { type: 'LOAD_INITIAL_DATA' };

// Initial state with default data
const initialState: ContentState = {
  movies: [
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
    }
  ],
  tvShows: [
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
      title: 'Alien Earth ',
      rating: 8.9,
      season: 'Season 1',
      genre: 'Drama, Tech',
      image: 'https://bloody-disgusting.com/wp-content/uploads/2025/03/alien-earth-scaled.jpg',
    }
  ],
  games: [
    {
      id: '1',
      title: 'Monster Hunter Wilds',
      rating: 9.5,
      platform: 'PC, PS5, Xbox',
      genre: 'RPG, Open World',
      image: 'https://4kwallpapers.com/images/walls/thumbs_3t/19165.jpg',
      trending: true
    },
    {
      id: '2',
      title: 'Split Fiction',
      rating: 8.8,
      platform: 'All Platforms',
      genre: 'Strategy, Sci-Fi',
      image: 'https://cdn1.epicgames.com/offer/578f39d17be846e7a6fa335f757012aa/EGS_SplitFiction_HazelightStudiosAB_S2_1200x1600-d626c4ebc51d7b5bacbfd015368b674c',
      hot: true
    },
    {
      id: '3',
      title: 'Hollow Knight: Silksong',
      rating: 8.4,
      platform: 'PC, Mobile',
      genre: 'Puzzle, Strategy',
      image: 'https://assets.nintendo.eu/image/upload/f_auto/q_auto/v1757304516/NAL/Articles/2025/09-September/1920x1080_NintendoSwitch2_Hollow-Knight-Silksong.jpg'
    },
    {
      id: '4',
      title: 'Doom: The Dark Ages',
      rating: 9.0,
      platform: 'Next-Gen Only',
      genre: 'Adventure, RPG',
      image: 'https://images5.alphacoders.com/138/1389830.jpg'
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