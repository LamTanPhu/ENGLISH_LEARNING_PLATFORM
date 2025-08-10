import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../application/authContext';
import { useNavigate } from 'react-router-dom';

interface FormData {
    email: string;
    password: string;
}

export const LoginForm: React.FC = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        try {
        await login(data.email, data.password);
        navigate('/dashboard');
        } catch (error) {
        console.error('Login failed', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email', { required: true })} placeholder="Email" />
        <input {...register('password', { required: true })} type="password" placeholder="Password" />
        <button type="submit">Login</button>
        </form>
    );
};