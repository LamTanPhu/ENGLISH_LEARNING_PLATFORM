import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
    return (
        <div className="page-wrapper">
            <div className="auth-container">
                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to continue your English learning journey</p>
                </div>
                <div className="auth-body">
                    <LoginForm />
                    <div className="auth-link">
                        Don't have an account? <Link to="/register">Create one here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;