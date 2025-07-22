import api from "@/lib/api/api";
import type { UserSchema } from "@/lib/schemas/user.schema";
import type { ApiResponseSchema } from "@/lib/schemas/api-response/api-response";
import { AxiosError } from "axios";

export const createUser = async (userData: UserSchema): Promise<ApiResponseSchema> => {
  try {
    const response = await api.post("/api/users/create", userData);
    return response.data;
  } catch (error) {
    if( error instanceof AxiosError) {
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

export const isEmailExists = async (email: string): Promise<ApiResponseSchema> => {
  try {
    const response = await api.get("/api/users/is-email-exists",{

      params: { email }
    });
    return response.data;
  } catch (error) {
    if( error instanceof AxiosError) {
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

export const isAadhaarExists = async (aadhaar: string): Promise<ApiResponseSchema> => {
  try {
    const response = await api.get("/api/users/is-aadhaar-exists", {
      params: { aadhaar }
    });
    return response.data;
  } catch (error) {
    if( error instanceof AxiosError) {
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

export const isPhoneExists = async (phone: string): Promise<ApiResponseSchema> => {
  try {
    const response = await api.get("/api/users/is-phone-exists", {
      params: { phone }
    });
    return response.data;
  } catch (error) {
    if( error instanceof AxiosError) {
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

export const deleteUser = async (): Promise<ApiResponseSchema> => {
  try {
    const response = await api.delete("/api/users/delete");
    return response.data;
  } catch (error) {
    if( error instanceof AxiosError) {
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
