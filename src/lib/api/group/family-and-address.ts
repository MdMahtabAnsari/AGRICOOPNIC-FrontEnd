import type { FamilyAndAddressSchema } from "@/lib/schemas/pages/familyAndAddress.schema";
import { createAddress } from "../address";
import { createFamily } from "../family";
import { createPersonalDetails } from "../personalDetails";

export const createFamilyAndAddress = async (familyAndAddress: FamilyAndAddressSchema) => {
    // Create family and address in parallel
    const [familyResponse, correspondenceAddressResponse, permanentAddressResponse, personalDetailsResponse] = await Promise.all([
        createFamily(familyAndAddress.family),
        createAddress(familyAndAddress.correspondenceAddress),
        createAddress(familyAndAddress.permanentAddress),
        createPersonalDetails(familyAndAddress.personalDetails)

    ]);

    return {
        family: familyResponse,
        correspondenceAddress: correspondenceAddressResponse,
        permanentAddress: permanentAddressResponse,
        personalDetails: personalDetailsResponse
    };
};