import axios from "axios";
import type { LoginCredentials, LoginResponse } from '../types/auth.types';

// Hardcoded relative path to ensure proxy usage
const AUTH_API_URL = '/auth';

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${AUTH_API_URL}/Login`, credentials);
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
