import axios from "axios";
import type { Action, PaginatedResponse } from "../types/dashboard.types";

// Hardcoded relative path to ensure proxy usage
const API_URL = '/api';

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

        return (response.data as any).data || response.data;
    } catch (error) {
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

        const response = await axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error: any) {
        throw error;
    }
};
