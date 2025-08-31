import {z} from 'zod/v4';
import { postNameEnum } from './common.schema';

export const jobPostSchema = z.object({
    name: postNameEnum
});

export type JobPostSchema = z.infer<typeof jobPostSchema>;