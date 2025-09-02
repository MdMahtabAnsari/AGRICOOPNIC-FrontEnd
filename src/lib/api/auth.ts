import api from "@/lib/api/api";
import type { ApiResponseSchema } from "../schemas/api-response/api-response";
import type { SignUpSchema,SignInSchema,UserIdEmailObjectWithOptional,PasswordObject } from "../schemas/auth.shema";
import type { EmailOtpSchema } from "@/lib/schemas/otp.schema";
import { AxiosError } from "axios";


export const signup = async (data: SignUpSchema): Promise<ApiResponseSchema> => {
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


export const signIn = async (data: SignInSchema): Promise<ApiResponseSchema> => {
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

export const checkUserAvailability = async (data: UserIdEmailObjectWithOptional): Promise<ApiResponseSchema> => {
    try {
        const response = await api.get(`/api/auth/is-available`,{
            params: {
                userId: data.userId,
                email: data.email
            }
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

export const sendOtp = async (email: string): Promise<ApiResponseSchema> => {
    try {
        const response = await api.post("/api/auth/otp/create", { email });
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

export const verifyOtp = async (data: EmailOtpSchema): Promise<ApiResponseSchema> => {
    try {
        const response = await api.post("/api/auth/otp/verify", data);
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

export const resetPassword = async (data: PasswordObject): Promise<ApiResponseSchema> => {
    try {
        const response = await api.put("/api/auth/reset-password", data);
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


export const logout = async (): Promise<ApiResponseSchema> => {
    try {
        const response = await api.delete("/api/auth/logout");
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
