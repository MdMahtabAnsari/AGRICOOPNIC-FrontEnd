import { z } from 'zod';
import { documentSchema } from '@/lib/schemas/document.schema';
import { examinationPreferenceSchema } from '@/lib/schemas/examinationPreference.schema';

export const documentAndCenterSchema = z.object({
    photo: documentSchema,
    signature: documentSchema,
    aadhaarFront: documentSchema,
    aadhaarBack: documentSchema,
    preference1: examinationPreferenceSchema,
    preference2: examinationPreferenceSchema,
    preference3: examinationPreferenceSchema
}).refine(
    data => data.preference1.examCenterName !== data.preference2.examCenterName,
    {
        message: 'Preference 1 and 2 exam centers must be different',
        path: ['preference1', 'examCenterName']
    }
)
    .refine(
        data => data.preference2.examCenterName !== data.preference3.examCenterName,
        {
            message: 'Preference 2 and 3 exam centers must be different',
            path: ['preference2', 'examCenterName']
        }
    ).refine(
        data => data.preference1.examCenterName !== data.preference3.examCenterName,
        {
            message: 'Preference 1 and 3 exam centers must be different',
            path: ['preference1', 'examCenterName']
        }
    )

export type DocumentAndCenterSchema = z.infer<typeof documentAndCenterSchema>;