import api from "@/lib/api/api";
import type { ApiResponseSchema } from "@/lib/schemas/api-response/api-response";
import type { CategorySchema } from "@/lib/schemas/category.schema";
import { AxiosError } from "axios";

export const createCategory = async (categoryData: CategorySchema): Promise<ApiResponseSchema> => {
  try {
    const response = await api.post("/api/categories/create", categoryData);
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