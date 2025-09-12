import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSlider from './components/HeroSlider';
import ContentSections from './components/ContentSections';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';
import ContentDetailPage from './pages/ContentDetailPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <HeroSlider />
                <ContentSections />
              </>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/content/:id" element={<ContentDetailPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;