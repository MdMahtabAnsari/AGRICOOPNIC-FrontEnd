import api from "@/lib/api/api";
import { AxiosError } from "axios";
import type { ApiResponseSchema } from "@/lib/schemas/api-response/api-response";
import type { PaymentSchema, VerifyPaymentSchema } from "@/lib/schemas/payment.schema";


export async function createPayment(paymentData: PaymentSchema): Promise<ApiResponseSchema> {
    try {
        const response = await api.post("/api/payments/create", paymentData);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw error.response?.data as ApiResponseSchema;
        }
        return {
            status: "error",
            message: "An unexpected error occurred while creating payment.",
            isOperational: false,
            data: null,
            statusCode: 500
        };
    }
}

export async function verifyPayment(verifyData: VerifyPaymentSchema): Promise<ApiResponseSchema> {
    try {
        const response = await api.post("/api/payments/verify", verifyData);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw error.response?.data as ApiResponseSchema;
        }
        return {
            status: "error",
            message: "An unexpected error occurred while verifying payment.",
            isOperational: false,
            data: null,
            statusCode: 500
        };
    }
}

export const getUserSuccessfulPayment = async (): Promise<ApiResponseSchema> => {
    try {
        const response = await api.get("/api/payments/user-successful-payments");
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data as ApiResponseSchema;
        }
        return {
            status: "error",
            message: "An unexpected error occurred while fetching successful payments.",
            isOperational: false,
            data: null,
            statusCode: 500
        };
    }
}