import {z} from 'zod/v4';

const step = z.number().int().min(1, 'Step must be at least 1').max(4, 'Step must be at most 4').default(1);

export const formProgressSchema = z.object({
    step: step,
    completed: z.boolean().default(false),
});

export const stepObject = z.object({
    step: step,
});

export const formProgressWithoutCompletedSchema = formProgressSchema.omit({ completed: true });

export type FormProgressSchema = z.infer<typeof formProgressSchema>;
export type FormProgressWithoutCompletedSchema = z.infer<typeof formProgressWithoutCompletedSchema>;