import { educationSchema } from "@/lib/schemas/education.schema";
import {z} from "zod";

export const educationDetailsSchema = z.object({
   _10th: educationSchema,
   _12th: educationSchema,
    graduation: educationSchema,
});


export type EducationDetailsSchema = z.infer<typeof educationDetailsSchema>;