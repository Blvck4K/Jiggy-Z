import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Home, Search, Film, Tv, Gamepad2, Plus, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Handle navigation and close drawer
  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-slate-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold">
            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent">
              JIGGY-Z
            </span>
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-700 transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-300" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="py-4">
          {/* Navigation Links */}
          <div className="px-4 py-2">
            <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-2">
              Navigation
            </h3>
            <nav className="space-y-1">
              <button 
                onClick={() => handleNavigation('/')}
                className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-slate-700 rounded-lg transition-colors duration-200"
              >
                <Home className="h-5 w-5 mr-3" />
                <span>Home</span>
              </button>
              
              <button 
                onClick={() => handleNavigation('/search')}
                className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-slate-700 rounded-lg transition-colors duration-200"
              >
                <Search className="h-5 w-5 mr-3" />
                <span>Search</span>
              </button>
              
              <button 
                onClick={() => handleNavigation('/movies')}
                className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-slate-700 rounded-lg transition-colors duration-200"
              >
                <Film className="h-5 w-5 mr-3" />
                <span>Movies</span>
              </button>
              
              <button 
                onClick={() => handleNavigation('/tvshows')}
                className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-slate-700 rounded-lg transition-colors duration-200"
              >
                <Tv className="h-5 w-5 mr-3" />
                <span>TV Shows</span>
              </button>
              
              <button 
                onClick={() => handleNavigation('/games')}
                className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-slate-700 rounded-lg transition-colors duration-200"
              >
                <Gamepad2 className="h-5 w-5 mr-3" />
                <span>Games</span>
              </button>
            </nav>
          </div>

          {/* Create Section - Only visible when logged in */}
          {user && (
            <div className="mt-6 px-4 py-2">
              <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-2">
                Create
              </h3>
              <nav className="space-y-1">
                <button 
                  onClick={() => handleNavigation('/create/movie')}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:bg-slate-700 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <Plus className="h-5 w-5 mr-3" />
                    <span>New Movie</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
                
                <button 
                  onClick={() => handleNavigation('/create/tvshow')}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:bg-slate-700 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <Plus className="h-5 w-5 mr-3" />
                    <span>New TV Show</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
                
                <button 
                  onClick={() => handleNavigation('/create/game')}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:bg-slate-700 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <Plus className="h-5 w-5 mr-3" />
                    <span>New Game</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          )}
        </div>

        {/* User Info */}
        {user && (
          <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 flex items-center justify-center text-black font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 truncate">
                <p className="text-sm font-medium text-white truncate">{user.email}</p>
                <p className="text-xs text-gray-400">Member</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Drawer;