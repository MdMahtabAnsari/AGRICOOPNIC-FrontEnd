import {z} from 'zod';
import { documentSchema } from '@/lib/schemas/document.schema';
import { examinationPreferenceSchema } from '@/lib/schemas/examinationPreference.schema';

export const documentAndCenterSchema = z.object({
    photo: documentSchema,
    signature: documentSchema,
    aadhaarFront: documentSchema,
    aadhaarBack: documentSchema,
    preference1: examinationPreferenceSchema,
    preference2: examinationPreferenceSchema,
}).refine(
    data =>
        data.preference1.examCenterName !== data.preference2.examCenterName,
    {
        message: 'Exam center preferences must be different',
        path: ['preference2', 'examCenterName']
    }
);

export type DocumentAndCenterSchema = z.infer<typeof documentAndCenterSchema>;