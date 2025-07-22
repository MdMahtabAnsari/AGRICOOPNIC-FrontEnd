import { createUser } from "../user";
import { createJobPost } from "../job-post";
import { createCategory } from "../category";
import type { BasicInformationSchema } from "@/lib/schemas/pages/basicInformation.schema";

export const createBasicInformation = async (basicInformation: BasicInformationSchema) => {
    // First create user
    const userResponse = await createUser(basicInformation.user);
    
    // Then create jobPost and category in parallel
    const [jobPostResponse, categoryResponse] = await Promise.all([
        createJobPost(basicInformation.jobPost),
        createCategory(basicInformation.category)
    ]);

    return {
        user: userResponse,
        jobPost: jobPostResponse,
        category: categoryResponse
    };
};