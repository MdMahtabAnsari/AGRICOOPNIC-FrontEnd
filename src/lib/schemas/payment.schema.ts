import {z} from 'zod/v4';
import {categoryTypeEnum} from './category.schema';
import { name,email,phone } from './common.schema';




export const paymentStatusEnum = z.enum(['PENDING','COMPLETED','FAILED','CANCELLED','REFUNDED'], {message: 'Invalid payment status'});


export const paymentSchema = z.object({
    category: categoryTypeEnum,
    name: name,
    email: email,
    contact: phone,
});

export type PaymentSchema = z.infer<typeof paymentSchema>;


export const verifyPaymentSchema = z.object({
    orderId: z.string(),
    paymentId: z.string(),
    signature: z.string()
});

export type VerifyPaymentSchema = z.infer<typeof verifyPaymentSchema>;
