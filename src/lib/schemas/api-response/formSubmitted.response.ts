import {z} from "zod/v4";
import { createdAt} from "@/lib/schemas/api-response/common.schema";
import { id } from "@/lib/schemas/common.schema";
import { apiResponseSchema } from "@/lib/schemas/api-response/api-response";

const formSubmittedSchema = z.object({
    id: id,
    userId: id,
    submissionDate: createdAt,
    status: z.boolean(),
});

export type formSubmittedSchema = z.infer<typeof formSubmittedSchema>;

export const formSubmittedResponseSchema = apiResponseSchema.extend({
    data: formSubmittedSchema,
});






