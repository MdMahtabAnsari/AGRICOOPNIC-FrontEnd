import { createEducation } from "../education";
import type { EducationDetailSchema10Th, EducationDetailSchema12Th, EducationDetailSchemaGraduation } from "@/lib/schemas/pages/educationDetails.schema";

export const createEducationDetails = async (educationDetails: EducationDetailSchema10Th | EducationDetailSchema12Th | EducationDetailSchemaGraduation) => {
    // All API calls run in parallel
    const _10thResponse = createEducation(educationDetails._10th);
    let _12thResponse;
    if ("_12th" in educationDetails) {
        _12thResponse = createEducation(educationDetails._12th);
    }
    let graduationResponse;
    if ("graduation" in educationDetails) {
        graduationResponse = createEducation(educationDetails.graduation);
    }

    return {
        _10th: _10thResponse,
        _12th: _12thResponse,
        graduation: graduationResponse
    };
};