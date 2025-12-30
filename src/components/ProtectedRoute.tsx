import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader } from './Loader';
import type { JSX } from 'react';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return <Loader />;
    }
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    return children;
};  
