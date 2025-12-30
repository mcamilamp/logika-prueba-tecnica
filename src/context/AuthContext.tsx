import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthContextType, LoginCredentials } from "../types";
import { loginUser } from "../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        // revisa que el token este guardado en el localStorage
        const savedToken = localStorage.getItem('auth_token');
        if(savedToken) setToken(savedToken);
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            setIsLoading(true);
            const response = await loginUser(credentials);
            setToken(response.token);
            localStorage.setItem('auth_token', response.token);
            setError(null);
        } catch (error) {
            setError('Email no se encuentra registrado');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('auth_token');
        setError(null);
    };

    const value: AuthContextType = {
        token, 
        isAuthenticated: !!token,
        isLoading,
        error,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}