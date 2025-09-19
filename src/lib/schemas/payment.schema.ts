import { z } from 'zod/v4';
import { categoryTypeEnum } from './category.schema';
import { name, email, phone } from './common.schema';




export const paymentStatusEnum = z.enum(['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED'], { message: 'Invalid payment status' });


export const paymentSchema = z.object({
    category: categoryTypeEnum,
    name: name,
    email: email,
    contact: phone,
});


export const customPaymentSchema = paymentSchema.omit({
    name: true,
    email: true,
    contact: true
})

export type CustomPaymentSchema = z.infer<typeof customPaymentSchema>;



export type PaymentSchema = z.infer<typeof paymentSchema>;


export const verifyPaymentSchema = z.object({
    orderId: z.string(),
    paymentId: z.string(),
    signature: z.string()
});

export type VerifyPaymentSchema = z.infer<typeof verifyPaymentSchema>;


export const customVerifyPaymentInputSchema = verifyPaymentSchema.omit({
    signature: true
}).extend({
    paymentId: z
        .string()
        .min(12, "transactionId must be at least 12 characters")
        .max(22, "transactionId cannot be longer than 22 characters")
        .regex(/^[A-Za-z0-9]+$/, "transactionId must be alphanumeric only"),
    url: z.url({ error: "Invalid URL" }),
    date: z.date(),
    time: z.string().regex(/^\d{1,2}:\d{2}:\d{2}$/i, "Time must be in hh:mm:ss format"),
});

export const customVerifyPaymentSchema = verifyPaymentSchema.omit({
    signature: true
}).extend({
    paymentId: z
        .string()
        .min(12, "transactionId must be at least 12 characters")
        .max(22, "transactionId cannot be longer than 22 characters")
        .regex(/^[A-Za-z0-9]+$/, "transactionId must be alphanumeric only"),
    url: z.url({ error: "Invalid URL" }),
    // date time DD-MM-YYYY HH:MM:SS AM/PM
    dateTime: z.date(),
});
export type CustomVerifyPaymentSchema = z.infer<typeof customVerifyPaymentSchema>;

export type CustomVerifyPaymentInputSchema = z.infer<typeof customVerifyPaymentInputSchema>;
