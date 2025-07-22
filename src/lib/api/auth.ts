import api from "@/lib/api/api";
import type { ApiResponseSchema } from "../schemas/api-response/api-response";
import type { AuthSchema } from "../schemas/auth.shema";
import { AxiosError } from "axios";


export const signup = async (data: AuthSchema): Promise<ApiResponseSchema> => {
    try {
        const response = await api.post("/api/auth/signup", data);
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
};


export const signIn = async (data: AuthSchema): Promise<ApiResponseSchema> => {
    try {
        const response = await api.post("/api/auth/signin", data);
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

export const checkUserIdAvailability = async (userId: string): Promise<ApiResponseSchema> => {
    try {
        const response = await api.get(`/api/auth/is-user-exists`,{
            params: { userId }
        });
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


export const isUserLoggedIn = async(): Promise<ApiResponseSchema> => {
    try {
        const response = await api.get("/api/auth/is-logged-in");
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
