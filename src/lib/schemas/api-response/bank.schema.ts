import {z} from "zod/v4";

export const bankSchema = z.object({
    id: z.uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    bankName: z.string(),
    accountNo: z.string(),
    ifscCode: z.string(),
});

export type BankSchema = z.infer<typeof bankSchema>;