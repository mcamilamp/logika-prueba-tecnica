import axios from "axios";
import type { LoginCredentials, LoginResponse } from '../types/auth.types';

// HARDCODED ID: BUILD_2025_12_30_v5
// En Vercel, este path es reescrito a: https://dev.apinetbo.bekindnetwork.com/api/Authentication/...
const AUTH_API_URL = '/auth';

console.log('AuthService loaded. AUTH_API_URL:', AUTH_API_URL);

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    console.log('Calling loginUser with URL:', `${AUTH_API_URL}/Login`);
    const response = await axios.post<LoginResponse>(`${AUTH_API_URL}/Login`, credentials);
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
