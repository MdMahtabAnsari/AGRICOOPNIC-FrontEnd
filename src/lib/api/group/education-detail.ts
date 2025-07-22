import { createEducation } from "../education";
import type { EducationDetailsSchema } from "@/lib/schemas/pages/educationDetails.schema";

export const createEducationDetails = async (educationDetails: EducationDetailsSchema) => {
    // All API calls run in parallel
    const [_10thResponse, _12thResponse, graduationResponse] = await Promise.all([
        createEducation(educationDetails._10th),
        createEducation(educationDetails._12th),
        createEducation(educationDetails.graduation)
    ]);

    return {
        _10th: _10thResponse,
        _12th: _12thResponse,
        graduation: graduationResponse
    };
};