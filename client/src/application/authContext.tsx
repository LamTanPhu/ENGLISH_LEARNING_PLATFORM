import React, { createContext, useContext, useState } from 'react';
import type { User } from '../domain/models';
import { AuthUseCase } from './authUseCase';
import { apiClient } from '../../src/infrastructure/api';
import { storage } from '../../src/infrastructure/storage';

const authUseCaseInstance = new AuthUseCase(apiClient, storage);

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, username: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(authUseCaseInstance.getCurrentUser());

    const login = async (email: string, password: string) => {
        const newUser = await authUseCaseInstance.login(email, password);
        setUser(newUser);
    };

    const register = async (email: string, password: string, username: string) => {
        const newUser = await authUseCaseInstance.register(email, password, username);
        setUser(newUser);
    };

    const logout = () => {
        authUseCaseInstance.logout();
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
    };

    export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};