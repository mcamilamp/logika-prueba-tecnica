import axios from "axios";
import type { Action, PaginatedResponse } from "../types/dashboard.types";

const API_URL = import.meta.env.VITE_API_URL_DASHBOARD;

export const getActions = async (
    token: string, 
    pageNumber: number = 1, 
    pageSize: number = 10
) => {
    try {
        const response = await axios.get<PaginatedResponse<Action>>(`${API_URL}/actions/admin-list`, {
            params: {
                pageNumber,
                pageSize
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener las acciones:', error);
        throw error;
    }
}