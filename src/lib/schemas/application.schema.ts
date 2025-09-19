import { z } from "zod/v4";
import { genderEnum,addressTypeEnum,qualificationEnum,marksTypeEnum,documentTypeEnum,examCenterNameEnum,preferenceTypeEnum,postNameEnum,paymentStatusEnum } from "./common.schema";
import { categoryTypeEnum } from "./category.schema";
const personalDetailSchema = z.object({
    id: z.uuid(),
    userId: z.string(),
    gender: genderEnum,
    nationality: z.string(),
    dateOfBirth: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const addressSchema = z.object({
    id: z.uuid(),
    userId: z.string(),
    addressType: addressTypeEnum,
    addressLine: z.string(),
    city: z.string(),
    state: z.string(),
    pinCode: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const educationSchema = z.object({
    id: z.uuid(),
    userId: z.string(),
    qualification: qualificationEnum,
    institution: z.string(),
    boardOrUniversity: z.string(),
    subjectOrSpecialization: z.string().nullable(),
    yearOfPassing: z.string(),
    marksType: marksTypeEnum,
    marks: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const documentSchema = z.object({
    id: z.uuid(),
    userId: z.string(),
    documentType: documentTypeEnum,
    url: z.url(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const examinationPreferenceSchema = z.object({
    id: z.uuid(),
    userId: z.string(),
    preferenceType: preferenceTypeEnum,
    examCenterName: examCenterNameEnum,
    createdAt: z.date(),
    updatedAt: z.date(),
});

const formSubmittedSchema = z.object({
    id: z.uuid(),
    userId: z.string(),
    submissionDate: z.date(),
    status: z.boolean(),
});

const categorySchema = z.object({
    id: z.uuid(),
    userId: z.string(),
    categoryType: categoryTypeEnum,
    createdAt: z.date(),
    updatedAt: z.date(),
});

const jobPostSchema = z.object({
    id: z.uuid(),
    name: postNameEnum,
    applicationNo: z.string(),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const familySchema = z.object({
    id: z.uuid(),
    fatherName: z.string(),
    motherName: z.string(),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const paymentSchema = z.object({
    id: z.uuid(),
    userId: z.string(),
    amount: z.number(),
    paymentId: z.string(),
    orderId: z.string(),
    category: categoryTypeEnum,
    paymentStatus: paymentStatusEnum,
    createdAt: z.date(),
    updatedAt: z.date(),
    dateTime: z.date().optional().nullable(),
});

export const applicationSchema = z.object({
    id: z.uuid(),
    userId: z.string(),
    name: z.string(),
    email: z.email(),
    phone: z.string(),
    aadhaar: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    personalDetail: personalDetailSchema,
    address: z.array(addressSchema),
    education: z.array(educationSchema),
    documents: z.array(documentSchema),
    examinationPreferences: z.array(examinationPreferenceSchema),
    formSubmitted: formSubmittedSchema,
    category: categorySchema,
    jobPost: jobPostSchema,
    family: familySchema,
    payment: paymentSchema,
});

export type ApplicationSchema = z.infer<typeof applicationSchema>;