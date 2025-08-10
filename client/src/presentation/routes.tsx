import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider } from '../../src/application/authContext';

export const AppRoutes: React.FC = () => {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
};