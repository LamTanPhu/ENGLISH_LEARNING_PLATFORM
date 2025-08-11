import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../../src/application/authContext';
import DashboardPage from './pages/DashboardPage';
import FlashcardSetCreatePage from './pages/FlashcardSetCreatePage';
import FlashcardSetDetailPage from './pages/FlashcardSetDetailPage';
import FlashcardSetsPage from './pages/FlashcardSetsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import VocabularyCreatePage from './pages/VocabularyCreatePage';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/login" replace />;
    return children;
};

export const AppRoutes: React.FC = () => {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/flashcard-sets" element={<ProtectedRoute><FlashcardSetsPage /></ProtectedRoute>} />
            <Route path="/flashcard-sets/create" element={<ProtectedRoute><FlashcardSetCreatePage /></ProtectedRoute>} />
            <Route path="/flashcard-sets/:id" element={<ProtectedRoute><FlashcardSetDetailPage /></ProtectedRoute>} />
            <Route path="/vocabulary/create" element={<ProtectedRoute><VocabularyCreatePage /></ProtectedRoute>} />
            <Route
                path="*"
                element={localStorage.getItem('token') ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
            />
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
};