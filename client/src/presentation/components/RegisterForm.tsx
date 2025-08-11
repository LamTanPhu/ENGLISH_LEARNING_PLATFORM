import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../application/authContext';

interface FormData {
    email: string;
    password: string;
    username: string;
    confirmPassword: string;
}

export const RegisterForm: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const watchPassword = watch('password');

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            setError('');
            await registerUser(data.email, data.password, data.username);
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Registration failed', error);
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
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
                <label htmlFor="username" className="form-label">Username</label>
                <input 
                    {...register('username', { 
                        required: 'Username is required',
                        minLength: {
                            value: 3,
                            message: 'Username must be at least 3 characters'
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9_]+$/,
                            message: 'Username can only contain letters, numbers and underscores'
                        }
                    })} 
                    id="username"
                    type="text"
                    placeholder="Choose a username" 
                    className={`form-input ${errors.username ? 'input-error' : ''}`}
                />
                {errors.username && (
                    <span className="form-error">{errors.username.message}</span>
                )}
            </div>
            
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
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                        }
                    })} 
                    id="password"
                    type="password" 
                    placeholder="Create a password"
                    className={`form-input ${errors.password ? 'input-error' : ''}`}
                />
                {errors.password && (
                    <span className="form-error">{errors.password.message}</span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                    {...register('confirmPassword', { 
                        required: 'Please confirm your password',
                        validate: value => 
                            value === watchPassword || 'Passwords do not match'
                    })} 
                    id="confirmPassword"
                    type="password" 
                    placeholder="Confirm your password"
                    className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                />
                {errors.confirmPassword && (
                    <span className="form-error">{errors.confirmPassword.message}</span>
                )}
            </div>

            <button 
                type="submit" 
                className="btn btn-primary btn-full"
                disabled={isLoading}
            >
                {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
        </form>
    );
};