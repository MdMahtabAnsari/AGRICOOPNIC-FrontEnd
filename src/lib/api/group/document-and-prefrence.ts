import { createDocument } from "../document";
import { createExaminationPreference } from "../examination-prefrence";
import type { DocumentAndCenterSchema } from "@/lib/schemas/pages/document-and-prefrence-schema";

export const createDocumentAndCenter = async (documentAndCenter: DocumentAndCenterSchema) => {
  const [
    photoResponse,
    signatureResponse,
    aadhaarFrontResponse,
    aadhaarBackResponse,
    preference1Response,
    preference2Response,
    preference3Response,
  ] = await Promise.all([
    createDocument(documentAndCenter.photo),
    createDocument(documentAndCenter.signature),
    createDocument(documentAndCenter.aadhaarFront),
    createDocument(documentAndCenter.aadhaarBack),
    createExaminationPreference(documentAndCenter.preference1),
    createExaminationPreference(documentAndCenter.preference2),
    createExaminationPreference(documentAndCenter.preference3),
  ]);


  return {
    photo: photoResponse,
    signature: signatureResponse,
    aadhaarFront: aadhaarFrontResponse,
    aadhaarBack: aadhaarBackResponse,
    preference1: preference1Response,
    preference2: preference2Response,
    preference3: preference3Response,
  };
};