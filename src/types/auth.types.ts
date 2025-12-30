
// Los datos que se envian al login
export interface LoginCredentials {
    username: string;
    password: string;
}

// La respuesta que se recibe del login
export interface LoginResponse {
    token: string;
}

// El tipo del contexto de autenticacion
export interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}