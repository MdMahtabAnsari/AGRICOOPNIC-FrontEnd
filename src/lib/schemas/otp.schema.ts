import {emailObject} from "@/lib/schemas/common.schema";

import {z} from 'zod/v4';

const otp = z.string().length(6, 'OTP must be exactly 6 characters').regex(/^\d{6}$/, 'OTP must contain only digits');

export type Otp = z.infer<typeof otp>;

export const emailOtpSchema = emailObject.extend(
    {
        otp: otp,
    }
)

export type EmailOtpSchema = z.infer<typeof emailOtpSchema>;


