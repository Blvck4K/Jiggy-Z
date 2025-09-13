import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSlider from './components/HeroSlider';
import ContentSections from './components/ContentSections';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';
import ContentDetailPage from './pages/ContentDetailPage';
import MoviesPage from './pages/MoviesPage';
import TVShowsPage from './pages/TVShowsPage';
import GamesPage from './pages/GamesPage';
import CreateContentPage from './pages/create/CreateContentPage';
import AuthGuard from './components/AuthGuard';

// Component to handle content selection
const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = (id: string, type: 'movie' | 'tv' | 'game') => {
    // Navigate to content detail page
    window.location.href = `/content/${id}`;
  };

  return (
    <>
      <HeroSlider />
      <ContentSections onSelectContent={navigate} isAuthenticated={!!user} />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/content/:id" element={<ContentDetailPage />} />
            
            {/* Protected Routes */}
            <Route path="/movies" element={
              <AuthGuard>
                <MoviesPage />
              </AuthGuard>
            } />
            <Route path="/tvshows" element={
              <AuthGuard>
                <TVShowsPage />
              </AuthGuard>
            } />
            <Route path="/games" element={
              <AuthGuard>
                <GamesPage />
              </AuthGuard>
            } />
            
            {/* Create Content Routes - Protected */}
            <Route path="/create/:contentType" element={
              <AuthGuard>
                <CreateContentPage />
              </AuthGuard>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;