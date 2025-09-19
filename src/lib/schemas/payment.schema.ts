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
    day:z.string().regex(/^\d{2}$/, "Day must be two digits").refine((val) => {
        const day = parseInt(val, 10);
        return day >= 1 && day <= 31;
    }, { message: "Day must be between 01 and 31" }),
    month:z.string().regex(/^\d{2}$/, "Month must be two digits").refine((val) => {
        const month = parseInt(val, 10);
        return month >= 1 && month <= 12;
    }, { message: "Month must be between 01 and 12" }),
    year:z.string().regex(/^\d{4}$/, "Year must be four digits").refine((val) => {
        const year = parseInt(val, 10);
        const currentYear = new Date().getFullYear();
        return year >= 1900 && year <= currentYear;
    }, { message: `Year must be between 1900 and ${new Date().getFullYear()}` }),
    hour:z.string().regex(/^\d{2}$/, "Hour must be two digits").refine((val) => {
        const hour = parseInt(val, 10);
        return hour >= 1 && hour <= 12;
    }, { message: "Hour must be between 01 and 12" }),
    minute:z.string().regex(/^\d{2}$/, "Minute must be two digits").refine((val) => {
        const minute = parseInt(val, 10);
        return minute >= 0 && minute <= 59;
    }, { message: "Minute must be between 00 and 59" }),
    second:z.string().regex(/^\d{2}$/, "Second must be two digits").refine((val) => {
        const second = parseInt(val, 10);
        return second >= 0 && second <= 59;
    }, { message: "Second must be between 00 and 59" }),
    ampm:z.enum(['AM', 'PM'], { message: 'Invalid AM/PM value' })
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
    dateTime: z.string().regex(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2} (AM|PM)$/, "Invalid date-time format")
});
export type CustomVerifyPaymentSchema = z.infer<typeof customVerifyPaymentSchema>;

export type CustomVerifyPaymentInputSchema = z.infer<typeof customVerifyPaymentInputSchema>;
