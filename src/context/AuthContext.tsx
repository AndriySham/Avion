import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';
import { login as apiLogin } from '../services/api';

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Перевіряємо наявність сесії користувача при завантаженні сайту
    useEffect(() => {
        const savedUser = localStorage.getItem('avion_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Failed to parse saved user', error);
                localStorage.removeItem('avion_user');
            }
        }
        setIsLoading(false);
    }, []);

    // Функція авторизації
    const login = async (username: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        const result = await apiLogin(username, password);

        if (result) {
            setUser(result);
            localStorage.setItem('avion_user', JSON.stringify(result));
            setIsLoading(false);
            return true;
        }

        setIsLoading(false);
        return false;
    };

    // Функція виходу
    const logout = () => {
        setUser(null);
        localStorage.removeItem('avion_user');
    };

    return (
        <AuthContext value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}