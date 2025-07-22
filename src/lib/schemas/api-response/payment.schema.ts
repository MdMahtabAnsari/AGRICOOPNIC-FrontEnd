import { id } from "@/lib/schemas/common.schema";
import { createdAt,updatedAt } from "@/lib/schemas/api-response/common.schema";
import { apiResponseSchema } from "@/lib/schemas/api-response/api-response";
import { paymentSchema } from "@/lib/schemas/payment.schema";
import {z} from "zod/v4";


const paymentStatusEnum = z.enum(['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED'], { message: 'Invalid payment status' });
const payment = paymentSchema.extend({
    id,
    userId: id,
    createdAt,
    updatedAt,
    orderId: z.string(),
    paymentId: z.string().optional(),
    paymentStatus: paymentStatusEnum,

});


const paymentResponseSchema = z.object({
    payment: payment,
    order: z.any(), // Assuming order is an object, adjust as necessary
    isFree: z.boolean()
});


export const paymentApiResponseSchema = apiResponseSchema.extend({
    data: paymentResponseSchema
});

export type Payment = z.infer<typeof payment>;
export type PaymentResponseSchema = z.infer<typeof paymentResponseSchema>;
export type PaymentApiResponseSchema = z.infer<typeof paymentApiResponseSchema>;
export type PaymentSchema = z.infer<typeof paymentSchema>;

export type PaymentStatusEnum = z.infer<typeof paymentStatusEnum>;


const verifyPaymentApiResponseSchema = apiResponseSchema.extend({
    data: payment
});


export type VerifyPaymentApiResponseSchema = z.infer<typeof verifyPaymentApiResponseSchema>;
export type VerifyPaymentSchema = z.infer<typeof paymentSchema>;