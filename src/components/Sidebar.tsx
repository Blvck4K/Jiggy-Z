import React from 'react';
import { X, Film, Tv, Gamepad2, Star, Newspaper, TrendingUp } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-slate-900/95 backdrop-blur-md border-r border-yellow-500/20 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 bg-clip-text text-transparent">
            Navigation
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-6">
          <div className="space-y-2">
            <SidebarItem
              icon={<Film className="w-5 h-5" />}
              label="Movies"
              description="Latest releases and reviews"
              badge="Hot"
            />
            <SidebarItem
              icon={<Tv className="w-5 h-5" />}
              label="TV Series"
              description="Shows and episode guides"
              badge="New"
            />
            <SidebarItem
              icon={<Gamepad2 className="w-5 h-5" />}
              label="Games"
              description="Gaming news and reviews"
              badge="Trending"
            />
            <SidebarItem
              icon={<Star className="w-5 h-5" />}
              label="Reviews"
              description="Expert opinions and ratings"
            />
            <SidebarItem
              icon={<Newspaper className="w-5 h-5" />}
              label="News"
              description="Latest entertainment news"
            />
          </div>

          {/* Trending Section */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending Now
            </h3>
            <div className="space-y-3">
              <TrendingItem title="Dune: Part Two" category="Movie" />
              <TrendingItem title="The Last of Us S2" category="TV Series" />
              <TrendingItem title="Cyberpunk 2077 DLC" category="Game" />
              <TrendingItem title="Marvel Phase 5" category="News" />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  badge?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, description, badge }) => (
  <a
    href="#"
    className="flex items-center p-4 rounded-lg hover:bg-slate-800/50 transition-all duration-200 group relative"
  >
    <div className="flex-shrink-0 p-2 bg-slate-800 rounded-lg group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-red-500 transition-all duration-200">
      <div className="text-gray-300 group-hover:text-black transition-colors duration-200">
        {icon}
      </div>
    </div>
    <div className="ml-4 flex-1">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-medium group-hover:text-yellow-400 transition-colors duration-200">
          {label}
        </h3>
        {badge && (
          <span className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-yellow-500 to-red-500 text-black rounded-full">
            {badge}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
  </a>
);

interface TrendingItemProps {
  title: string;
  category: string;
}

const TrendingItem: React.FC<TrendingItemProps> = ({ title, category }) => (
  <a
    href="#"
    className="block p-3 rounded-lg hover:bg-slate-800/30 transition-colors duration-200 group"
  >
    <h4 className="text-white text-sm font-medium group-hover:text-yellow-400 transition-colors duration-200">
      {title}
    </h4>
    <p className="text-xs text-gray-500 mt-1">{category}</p>
  </a>
);

export default Sidebar;