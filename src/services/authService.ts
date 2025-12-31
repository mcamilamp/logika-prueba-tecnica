import axios from "axios";
import type { LoginCredentials, LoginResponse } from '../types/auth.types';

const AUTH_API_URL = (typeof window !== 'undefined' && window.location.hostname.includes('netlify.app'))
  ? '/auth'
  : import.meta.env.VITE_API_AUTH_URL;

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${AUTH_API_URL}/Login`,
      credentials
    );
    return response.data;
  } catch (error) {
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
