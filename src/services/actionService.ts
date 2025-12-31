import axios from "axios";
import type { Action, PaginatedResponse } from "../types/dashboard.types";

const API_URL = (typeof window !== 'undefined' && window.location.hostname.includes('netlify.app'))
    ? '/api'
    : import.meta.env.VITE_API_URL_DASHBOARD;

export const getActions = async (
    token: string, 
    pageNumber: number = 1, 
    pageSize: number = 10
) => {
    try {
        const fullUrl = `${API_URL}/actions/admin-list`;
        console.debug('[actionService] getActions ->', { url: fullUrl, pageNumber, pageSize, hasToken: !!token });

        const response = await axios.get<PaginatedResponse<Action>>(fullUrl, {
            params: { pageNumber, pageSize },
            headers: { Authorization: `Bearer ${token}` }
        });

        console.debug('[actionService] getActions response status:', response.status);
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
        console.debug('[actionService] createAction ->', { url, hasToken: !!token, name: data.name });

        // Do not set Content-Type manually for FormData; the browser will add the correct boundary.
        const response = await axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.debug('[actionService] createAction response status:', response.status);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error("Error: ", error.response.data);
        }
        throw error;
    }
};
