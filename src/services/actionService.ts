import axios from "axios";
import type { Action, PaginatedResponse } from "../types/dashboard.types";

// HARDCODED ID: BUILD_2025_12_30_v5
// En Vercel, este path es reescrito a: https://dev.api.bekindnetwork.com/api/v1/...
const API_URL = '/api/v1';

console.log('ActionService loaded. API_URL:', API_URL);

export const getActions = async (
    token: string, 
    pageNumber: number = 1, 
    pageSize: number = 10
) => {
    try {
        const fullUrl = `${API_URL}/actions/admin-list`;
        console.log('Calling getActions with URL:', fullUrl);
        const response = await axios.get<PaginatedResponse<Action>>(fullUrl, {
            params: {
                pageNumber,
                pageSize
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return (response.data as any).data || response.data;
    } catch (error) {
        console.error('getActions error:', error);
        throw error;
    }
}

export const createAction = async (
    token: string,
    data: {
        name: string,
        description: string,
        icon?: File,
        color?: string,
        isActive?: boolean
    }) => {
    try {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);

        if (data.icon) {
            formData.append('icon', data.icon);
        }

        if (data.color) {
            formData.append('color', data.color);
        }

        formData.append('status', data.isActive ? '1' : '0');

        const url = `${API_URL}/actions/admin-add`;
        console.log('Calling createAction with URL:', url);

        const response = await axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error: any) {
        console.error('createAction error:', error);
        throw error;
    }
};
