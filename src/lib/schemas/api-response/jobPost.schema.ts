import { jobPostSchema } from "@/lib/schemas/jobPost.schema";
import { apiResponseSchema } from "@/lib/schemas/api-response/api-response";
import { id } from "@/lib/schemas/common.schema";
import { createdAt, updatedAt } from "@/lib/schemas/api-response/common.schema";
import {z} from "zod/v4";


export const jobPostResponseSchema = jobPostSchema.extend({
    id,
    userId: id,
    applicationNo: z.string(),
    createdAt,
    updatedAt,
});

export const jobPostApiResponseSchema = apiResponseSchema.extend({
    data: jobPostResponseSchema
});

export type JobPostResponseSchema = z.infer<typeof jobPostResponseSchema>;
export type JobPostApiResponseSchema = z.infer<typeof jobPostApiResponseSchema>;