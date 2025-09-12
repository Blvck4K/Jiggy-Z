import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-red-500">JIGGY-Z</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/search" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Search
            </Link>
            <Link to="/movies" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Movies
            </Link>
            <Link to="/tv-shows" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              TV Shows
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-300 text-sm">Welcome, {user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent hover:from-red-400 hover:via-yellow-400 hover:to-red-500 transition-all duration-300">
                JIGGY-Z
              </span>
            </>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Home
              </Link>
              <Link to="/search" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Search
              </Link>
              <Link to="/movies" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Movies
              </Link>
              <Link to="/tv-shows" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                TV Shows
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;