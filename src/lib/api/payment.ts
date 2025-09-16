import api from "@/lib/api/api";
import { AxiosError } from "axios";
import type { ApiResponseSchema } from "@/lib/schemas/api-response/api-response";
import type { PaymentSchema, VerifyPaymentSchema } from "@/lib/schemas/payment.schema";


export async function createPhonePePayment(paymentData: PaymentSchema): Promise<ApiResponseSchema> {
    try {
        const response = await api.post("/api/payments/create-phonepe", paymentData);
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

export async function createRazorpayPayment(paymentData:PaymentSchema):Promise<ApiResponseSchema>{
    try {
        const response = await api.post("/api/payments/create-razorpay", paymentData);
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

export async function verifyRazorpayPayment(verifyData: VerifyPaymentSchema): Promise<ApiResponseSchema> {
    try {
        const response = await api.post("/api/payments/verify-razorpay", verifyData);
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

export const createPayuPayment = async (paymentData: PaymentSchema): Promise<ApiResponseSchema> => {
    try {
        const response = await api.post("/api/payments/create-payu", paymentData);
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