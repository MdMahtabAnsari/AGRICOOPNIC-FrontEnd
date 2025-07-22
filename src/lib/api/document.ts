import api from "@/lib/api/api";
import type { ApiResponseSchema } from "@/lib/schemas/api-response/api-response";
import { AxiosError } from "axios";
import type { DocumentSchema } from "@/lib/schemas/document.schema";

export const createDocument = async (documentData:DocumentSchema): Promise<ApiResponseSchema> => {
  try {
    const response = await api.post("/api/documents/create", documentData);
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
