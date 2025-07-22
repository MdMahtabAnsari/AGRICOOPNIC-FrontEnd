import { createDocument } from "../document";
import { createExaminationPreference } from "../examination-prefrence";
import type { DocumentAndCenterSchema } from "@/lib/schemas/pages/document-and-prefrence-schema";

export const createDocumentAndCenter = async (documentAndCenter: DocumentAndCenterSchema) => {
  const photoResponse = await createDocument(documentAndCenter.photo);
  const signatureResponse = await createDocument(documentAndCenter.signature);
  const aadhaarFrontResponse = await createDocument(documentAndCenter.aadhaarFront);
  const aadhaarBackResponse = await createDocument(documentAndCenter.aadhaarBack);
  
  const preference1Response = await createExaminationPreference(documentAndCenter.preference1);
  const preference2Response = await createExaminationPreference(documentAndCenter.preference2);

  return {
    photo: photoResponse,
    signature: signatureResponse,
    aadhaarFront: aadhaarFrontResponse,
    aadhaarBack: aadhaarBackResponse,
    preference1: preference1Response,
    preference2: preference2Response
  };
};