import { educationSchema } from "@/lib/schemas/education.schema";
import { z } from "zod/v4";


export const educationDetailsSchema10Th = z.object({
    _10th: educationSchema,
})

export const educationDetailsSchema12Th = z.object({
    _10th: educationSchema,
    _12th: educationSchema,
})

export const educationDetailsSchemaGraduation = z.object({
    _10th: educationSchema,
    _12th: educationSchema,
    graduation: educationSchema,
})

export type EducationDetailSchema10Th = z.infer<typeof educationDetailsSchema10Th>;
export type EducationDetailSchema12Th = z.infer<typeof educationDetailsSchema12Th>;
export type EducationDetailSchemaGraduation = z.infer<typeof educationDetailsSchemaGraduation>;
