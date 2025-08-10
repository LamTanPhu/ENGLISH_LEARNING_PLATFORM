import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../application/authContext';

interface FormData {
    email: string;
    password: string;
    username: string;
}

export const RegisterForm: React.FC = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        try {
        await registerUser(data.email, data.password, data.username);
        navigate('/dashboard');
        } catch (error) {
        console.error('Registration failed', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email', { required: true })} placeholder="Email" />
        <input {...register('password', { required: true })} type="password" placeholder="Password" />
        <input {...register('username', { required: true })} placeholder="Username" />
        <button type="submit">Register</button>
        </form>
    );
};