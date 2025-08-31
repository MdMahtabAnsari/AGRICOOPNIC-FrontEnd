import api from "@/lib/api/api";
import type { ApiResponseSchema } from "@/lib/schemas/api-response/api-response";
import { AxiosError } from "axios";
import type { ContactSchema } from "@/lib/schemas/contact.schema";

export const sendContactMessage = async (contactData: ContactSchema): Promise<ApiResponseSchema> => {
    try {
        const response = await api.post("/api/contact/submit", contactData);
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
