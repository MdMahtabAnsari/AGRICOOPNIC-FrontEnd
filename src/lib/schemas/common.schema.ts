import { z } from 'zod/v4';

export const id = z.uuid({ message: 'Invalid UUID format' });

export const phone = z.string().length(10, 'Phone number must be exactly 10 digits').regex(/^\d{10}$/, 'Phone number must contain only digits');
export const aadhaar = z.string().length(12, 'Aadhaar number must be exactly 12 digits').regex(/^\d{12}$/, 'Aadhaar number must contain only digits');

export const name = (name: string) => {
    return z.string().min(3, `${name} is required`).max(35, `${name} must be less than 35 characters`);
}
export const userIdSchema = z.string().min(3, "User ID must be at least 3 characters long").max(50, "User ID must not exceed 50 characters").regex(/^[a-zA-Z0-9_]+$/, "User ID can only contain alphanumeric characters and underscores");

export const userIdObject = z.object({
    userId: userIdSchema
});
export const email = z.email({ message: 'Invalid email address' });


export const emailObject = z.object({
    email: email,
})

export const genderEnum = z.enum(['MALE', 'FEMALE', 'OTHER'], {message: 'Invalid gender type'})

export const addressTypeEnum = z.enum(['PERMANENT', 'CORRESPONDENCE'], {message: 'Invalid address type'})

export const qualificationEnum = z.enum(['MATRICULATION', 'INTERMEDIATE_OR_DIPLOMA', 'GRADUATION'], {error: 'Invalid education level'})

export const marksTypeEnum = z.enum(['PERCENTAGE', 'CGPA'], {error: 'Invalid marks type'})

export const documentTypeEnum = z.enum(['PHOTO', 'SIGNATURE', 'AADHAAR_FRONT', 'AADHAAR_BACK'], {error: 'Invalid document type'})

export const preferenceTypeEnum = z.enum(['PREFERENCE_1', 'PREFERENCE_2', 'PREFERENCE_3'], {message: 'Invalid preference location'})

export const examCenterNameEnum =z.enum(['DELHI_NCR','LUCKNOW','AHMEDABAD','BHOPAL','MUMBAI','KOLKATA','BHUBANESWAR','RANCHI','PATNA','BANGALORE'], {message: 'Invalid exam center name'})

export const postNameEnum =  z.enum(['MTS','SUPERVISOR','CLERK','ASSISTANT_AGRICULTURE_OFFICER','AGRICULTURE_OFFICER','FIELD_OFFICER'], {message: 'Invalid job post name'})


export const paymentStatusEnum = z.enum(['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED'], {message: 'Invalid payment status'})
