import api from "@/lib/api/api";
import type { ApiResponseSchema } from "@/lib/schemas/api-response/api-response";
import { AxiosError } from "axios";
import type { ExaminationPreferenceSchema } from "@/lib/schemas/examinationPreference.schema";

export const createExaminationPreference = async (examinationPreferenceData: ExaminationPreferenceSchema): Promise<ApiResponseSchema> => {
  try {
    const response = await api.post("/api/examination-preferences/create", examinationPreferenceData);
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
