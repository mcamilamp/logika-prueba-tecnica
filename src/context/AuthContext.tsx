import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthContextType, LoginCredentials } from "../types";
import { loginUser } from "../services/authService";
import '../styles/Dashboard.scss';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('auth_token');
        if(savedToken) {
            setToken(savedToken);
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            setIsLoading(true);
            const response = await loginUser(credentials);
            
            const finalToken = typeof response === 'string' ? response : (response.token || (response as any).data?.token);
            
            if (finalToken && finalToken.startsWith('eyJ')) {
                setToken(finalToken);
                localStorage.setItem('auth_token', finalToken);
                localStorage.setItem('debug_login_response', JSON.stringify({ token: finalToken, original: response }));
            }
            
            setError(null);
        } catch (error: any) {
            setError(error.message || 'Error al iniciar sesión');
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