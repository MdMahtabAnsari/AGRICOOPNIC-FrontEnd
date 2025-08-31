import {z} from 'zod/v4';
import { email } from './common.schema';
import { userIdSchema } from './common.schema';

export const password= z.string().min(8, "Password must be at least 8 characters long").max(100, "Password must not exceed 100 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
export type Password = z.infer<typeof password>;
export const signUpSchema = z.object({
    userId: userIdSchema,
    email: email,
    password: password,
});

export const signInSchema = z.object({
    identifier: z.union([userIdSchema, email]),
    password: password
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export type SignInSchema = z.infer<typeof signInSchema>;

export const userIdEmailObjectWithOptional = z.object({
    userId: userIdSchema.optional(),
    email: email.optional()
}).refine((data) => data.userId || data.email, {
    message: "Either userId or email must be provided"
});

export type UserIdEmailObjectWithOptional = z.infer<typeof userIdEmailObjectWithOptional>;