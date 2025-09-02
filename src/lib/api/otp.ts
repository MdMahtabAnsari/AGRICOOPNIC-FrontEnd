import api from "@/lib/api/api";
import type { ApiResponseSchema } from "@/lib/schemas/api-response/api-response";
import type { EmailOtpSchema } from "@/lib/schemas/otp.schema";
import { AxiosError } from "axios";

export const requestOtp = async (email: string): Promise<ApiResponseSchema> => {
  try {
    const response = await api.post("/api/otp/create", { email });
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
    const response = await api.post("/api/otp/verify", data);
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

