import api from "@/lib/api/api";
import type { ApiResponseSchema } from "@/lib/schemas/api-response/api-response";
import type { JobPostSchema } from "@/lib/schemas/jobPost.schema";
import { AxiosError } from "axios";

export const createJobPost = async (jobPostData: JobPostSchema): Promise<ApiResponseSchema> => {
  try {
    const response = await api.post("/api/job-posts/create", jobPostData);
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


export const getJobPost = async (): Promise<ApiResponseSchema> => {
  try {
    const response = await api.get("/api/job-posts");
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