import { categorySchema } from "@/lib/schemas/category.schema";
import { apiResponseSchema } from "@/lib/schemas/api-response/api-response";
import { id } from "@/lib/schemas/common.schema";
import { createdAt, updatedAt } from "@/lib/schemas/api-response/common.schema";
import {z} from "zod/v4";

export const categoryResponseSchema = categorySchema.extend({
    id,
    userId: id,
    createdAt,
    updatedAt,
});

export const categoryApiResponseSchema = apiResponseSchema.extend({
    data: categoryResponseSchema
});

export type CategoryResponseSchema = z.infer<typeof categoryResponseSchema>;
export type CategoryApiResponseSchema = z.infer<typeof categoryApiResponseSchema>;
