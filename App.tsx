
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BusinessDataProvider } from './contexts/BusinessDataContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HelpButtonPage from './pages/HelpButtonPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div></div>;
  }
  return user ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <BusinessDataProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard/:section" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Navigate to="/dashboard/config" />
              </ProtectedRoute>
            } />
            <Route path="/help-button/:slug" element={<HelpButtonPage />} />
          </Routes>
        </HashRouter>
      </BusinessDataProvider>
    </AuthProvider>
  );
}

export default App;
