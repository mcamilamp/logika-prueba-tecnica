import axios from "axios";
import type { LoginCredentials, LoginResponse } from '../types/auth.types';

// HARDCODED ID: BUILD_2025_12_30_v5
// En Netlify, usa redirect: /auth/Login -> https://dev.apinetbo.bekindnetwork.com/api/Authentication/Login
const AUTH_API_URL = '/auth/Login';

console.log('AuthService loaded. AUTH_API_URL:', AUTH_API_URL);

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    console.log('Calling loginUser with URL:', AUTH_API_URL);
    const response = await axios.post<LoginResponse>(AUTH_API_URL, credentials);
    return response.data;
  } catch (error) {
    console.error('loginUser error:', error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error('Credenciales inválidas');
      }
      if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      }
    }
    throw new Error('Error inesperado');
  }
};
