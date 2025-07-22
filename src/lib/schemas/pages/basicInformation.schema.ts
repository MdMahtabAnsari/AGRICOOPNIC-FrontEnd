import { userSchema } from "@/lib/schemas/user.schema";
import { jobPostSchema } from "@/lib/schemas/jobPost.schema";
import { categorySchema } from "@/lib/schemas/category.schema";
import { z } from "zod";

export const basicInformationSchema = z.object({
  user: userSchema,
  jobPost: jobPostSchema,
  category: categorySchema,
});

export type BasicInformationSchema = z.infer<typeof basicInformationSchema>;