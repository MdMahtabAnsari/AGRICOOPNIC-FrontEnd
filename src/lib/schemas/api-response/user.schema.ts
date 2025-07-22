import { apiResponseSchema } from "@/lib/schemas/api-response/api-response";
import { userSchema } from "@/lib/schemas/user.schema";
import { id } from "@/lib/schemas/common.schema";
import { createdAt,updatedAt } from "@/lib/schemas/api-response/common.schema";
import {z} from "zod/v4";

export const userResponseSchema = userSchema.extend({
    id,
    createdAt,
    updatedAt,
});

export const userApiResponseSchema = apiResponseSchema.extend({
    data: userResponseSchema
});

export type UserResponseSchema = z.infer<typeof userResponseSchema>;
export type UserApiResponseSchema = z.infer<typeof userApiResponseSchema>;
