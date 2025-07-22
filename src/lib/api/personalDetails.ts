import api from "@/lib/api/api";
import type { ApiResponseSchema } from "@/lib/schemas/api-response/api-response";
import type { PersonalDetailSchema } from "@/lib/schemas/personalDetail.schema";
import { AxiosError } from "axios";

export const createPersonalDetails = async (personalDetailData: PersonalDetailSchema): Promise<ApiResponseSchema> => {
  try {
    const response = await api.post("/api/personal-details/create", personalDetailData);
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