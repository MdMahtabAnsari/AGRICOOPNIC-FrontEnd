import api from "@/lib/api/api";
import type { ApiResponseSchema } from "@/lib/schemas/api-response/api-response";
import { AxiosError } from "axios";

export const getUserApplication = async (): Promise<ApiResponseSchema> => {
    try {
        const response = await api.get("/api/applications/me");
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