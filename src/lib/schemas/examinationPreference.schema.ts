import { z } from 'zod/v4';
import { preferenceTypeEnum,examCenterNameEnum } from './common.schema';

export const examinationPreferenceSchema = z.object({
    preferenceType: preferenceTypeEnum,
    examCenterName: examCenterNameEnum
});

export type ExaminationPreferenceSchema = z.infer<typeof examinationPreferenceSchema>;