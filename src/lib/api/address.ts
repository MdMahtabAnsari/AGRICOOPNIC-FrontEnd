import api from "@/lib/api/api";
import type { ApiResponseSchema } from "@/lib/schemas/api-response/api-response";
import { AxiosError } from "axios";
import type { AddressSchema } from "@/lib/schemas/address.schema";

export const createAddress = async (addressData: AddressSchema): Promise<ApiResponseSchema> => {
  try {
    const response = await api.post("/api/addresses/create", addressData);
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
