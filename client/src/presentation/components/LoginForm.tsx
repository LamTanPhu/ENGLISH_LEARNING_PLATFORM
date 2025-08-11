import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../application/authContext';

interface FormData {
    email: string;
    password: string;
}

export const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            setError('');
            await login(data.email, data.password);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
            setError('Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {error && (
                <div className="alert alert-error">{error}</div>
            )}
            
            <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input 
                    {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                        }
                    })} 
                    id="email"
                    type="email"
                    placeholder="Enter your email" 
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && (
                    <span className="form-error">{errors.email.message}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                    {...register('password', { 
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                        }
                    })} 
                    id="password"
                    type="password" 
                    placeholder="Enter your password"
                    className={`form-input ${errors.password ? 'input-error' : ''}`}
                />
                {errors.password && (
                    <span className="form-error">{errors.password.message}</span>
                )}
            </div>

            <button 
                type="submit" 
                className="btn btn-primary btn-full"
                disabled={isLoading}
            >
                {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
        </form>
    );
};