import axios from "axios";
import type { Action, PaginatedResponse } from "../types/dashboard.types";

const API_URL = import.meta.env.VITE_API_URL_DASHBOARD;

export const getActions = async (
    token: string, 
    pageNumber: number = 1, 
    pageSize: number = 10
) => {
    try {
        const fullUrl = `${API_URL}/actions/admin-list`; 
        
        const response = await axios.get<PaginatedResponse<Action>>(fullUrl, {
            params: {
                pageNumber,
                pageSize
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const result = (response.data as any).data || response.data;
        return result;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API Error Status:', error.response?.status);
        }
        throw error;
    }
}

export const createAction = async (
    token: string,
    data: {
        name: string,
        description: string,
        icon?: File
    }) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);

        if(data.icon) {
            formData.append('icon', data.icon);
        }

        const response = await axios.post(`${API_URL}/actions/admin-add`, formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
    }