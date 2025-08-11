import React from 'react';
import { RegisterForm } from '../components/RegisterForm';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    return (
        <div className="page-wrapper">
            <div className="auth-container">
                <div className="auth-header">
                    <h1>Join Our Community</h1>
                    <p>Start your English learning adventure today</p>
                </div>
                <div className="auth-body">
                    <RegisterForm />
                    <div className="auth-link">
                        Already have an account? <Link to="/login">Sign in here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;