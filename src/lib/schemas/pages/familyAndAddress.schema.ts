import { familySchema } from "@/lib/schemas/family.schema.ts";
import { personalDetailSchema } from "@/lib/schemas/personalDetail.schema.ts";
import { addressSchema } from "@/lib/schemas/address.schema.ts";

import { z } from "zod";

export const familyAndAddressSchema = z.object({
    family: familySchema,
    personalDetails: personalDetailSchema,
    permanentAddress: addressSchema,
    correspondenceAddress: addressSchema,
});

export type FamilyAndAddressSchema = z.infer<typeof familyAndAddressSchema>;