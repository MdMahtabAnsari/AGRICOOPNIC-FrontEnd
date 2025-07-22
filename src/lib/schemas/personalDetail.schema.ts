import {z} from 'zod/v4';

export const personalDetailSchema = z.object({
    gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
        message: 'Invalid gender type'
    }),
    nationality: z.string().min(4, 'Nationality is required').max(100, 'Nationality must be less than 100 characters'),
    dateOfBirth: z.date().min(new Date(1900, 0, 1), 'Invalid date of birth').max(new Date(), 'Date of birth must be in the past'),
});

export type PersonalDetailSchema = z.infer<typeof personalDetailSchema>;