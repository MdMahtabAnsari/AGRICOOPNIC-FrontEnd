import {z} from 'zod/v4';
import { name,email } from '@/lib/schemas/common.schema';

export const userSchema = z.object({
    name: name('name'),
    email,
    phone: z.string().length(10, 'Phone number must be exactly 10 digits').regex(/^\d{10}$/, 'Phone number must contain only digits'),
    aadhaar: z.string().length(12, 'Aadhaar number must be exactly 12 digits').regex(/^\d{12}$/, 'Aadhaar number must contain only digits'),
});

export type UserSchema = z.infer<typeof userSchema>;