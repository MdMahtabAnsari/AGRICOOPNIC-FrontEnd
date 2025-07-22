import api from "@/lib/api/api";
import type { ApiResponseSchema } from '@/lib/schemas/api-response/api-response';
import { AxiosError } from 'axios';

export const formSubmit = async (): Promise<ApiResponseSchema> => {
    try {
        const response = await api.post('/api/form-submitted/');
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data as ApiResponseSchema;
        }
        return {
            message: "An unexpected error occurred",
            status: "error",
            isOperational: true,
            data: null,
            statusCode: 500,
        };
    }
}

export const getFormStatus = async (): Promise<ApiResponseSchema> => {
    try {
        const response = await api.get('/api/form-submitted/');
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data as ApiResponseSchema;
        }
        return {
            message: "An unexpected error occurred",
            status: "error",
            isOperational: true,
            data: null,
            statusCode: 500,
        };
    }
}