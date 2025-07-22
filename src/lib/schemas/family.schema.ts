import {z} from 'zod/v4';
import {name} from '@/lib/schemas/common.schema';

export const familySchema = z.object({
    fatherName: name('father name'),
    motherName: name('mother name'),
});

export type FamilySchema = z.infer<typeof familySchema>;