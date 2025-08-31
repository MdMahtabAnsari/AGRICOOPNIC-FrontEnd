import {z} from 'zod/v4';

import { documentTypeEnum } from './common.schema';

export const documentSchema = z.object({
    documentType: documentTypeEnum,
    url: z.url({ error: 'Invalid URL format' }),
});

export type DocumentSchema = z.infer<typeof documentSchema>;

