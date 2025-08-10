import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
    return (
        <div>
        <h1>Login</h1>
        <LoginForm />
        <p className="text-center mt-4">
            Don’t have an account? <Link to="/register">Register here</Link>
        </p>
        </div>
    );
};

export default LoginPage;