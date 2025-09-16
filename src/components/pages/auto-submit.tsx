import { Loader } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useBasicInformationStore } from "@/store/basic-information-store";
import { useFamilyAndAddressStore } from "@/store/family-address-store";
import { useEducationDetailsStore10Th, useEducationDetailsStore12Th, useEducationDetailsStoreGraduation } from "@/store/education-details-store";
import { useDocumentAndCenterStore } from "@/store/document-and-center-store";
import { useNavigate } from "react-router-dom";
import { createBasicInformation } from "@/lib/api/group/basic-information";
import { createFamilyAndAddress } from "@/lib/api/group/family-and-address";
import { createEducationDetails } from "@/lib/api/group/education-detail";
import { createDocumentAndCenter } from "@/lib/api/group/document-and-prefrence";
import { formSubmit } from "@/lib/api/formSubmit";
import { deleteUser } from "@/lib/api/user";
import { toast } from "sonner";
import { getUserSuccessfulPayment } from "@/lib/api/payment";
import { getFormStatus } from "@/lib/api/formSubmit"



export function AutoSubmitForm() {
    const basicInformation = useBasicInformationStore((state) => state.basicInformation);
    const educationDetails10Th = useEducationDetailsStore10Th((state) => state.educationDetails);
    const educationDetails12Th = useEducationDetailsStore12Th((state) => state.educationDetails);
    const educationDetailsGraduation = useEducationDetailsStoreGraduation((state) => state.educationDetails);
    const documentAndCenter = useDocumentAndCenterStore((state) => state.documentAndCenter);
    const familyAndAddress = useFamilyAndAddressStore((state) => state.familyAndAddress);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchSuccessfulPayment = useCallback(async () => {
        const response = await getUserSuccessfulPayment();
        if (response.status !== "success") {
            toast.error("No successful payment found. Please complete the payment first.");
            navigate("/application");
            return false;
        }
        return true;
    }, [navigate]);

    const fetchSucessfulSubmission = useCallback(async () => {
        const response = await getFormStatus();
        if (response.status === "success") {
            toast.success("Form has already been submitted successfully.");
            navigate("/application/details");
            return true;
        }
        return false;
    }, [navigate])

    const handleSubmit = useCallback(async () => {
        const educationDetails = basicInformation?.jobPost.name === "MTS" ? educationDetails10Th : (basicInformation?.jobPost.name === "SUPERVISOR" || basicInformation?.jobPost.name === "CLERK") ? educationDetails12Th : educationDetailsGraduation;
        if (!basicInformation || !educationDetails || !documentAndCenter || !familyAndAddress) {
            toast.error("Some required information is missing. Please complete all sections before submitting.");
            navigate("/application");
            return;
        }
        setLoading(true);
        const paymentStatus = await fetchSuccessfulPayment();
        if (paymentStatus === false) {
            setLoading(false);
            return;
        }
        const submissionStatus = await fetchSucessfulSubmission();
        if (submissionStatus === true) {
            setLoading(false);
            return;
        }
        await createBasicInformation(basicInformation);
        await Promise.all([
            createEducationDetails(educationDetails),
            createDocumentAndCenter(documentAndCenter),
            createFamilyAndAddress(familyAndAddress)
        ]);
        const formSubmitInfo = await formSubmit();
        if (formSubmitInfo.status !== "success") {
            toast.error(formSubmitInfo.message);
            await deleteUser();
            setLoading(false);
            return;
        }
        setLoading(false);
        navigate("/application/details")
    }, [basicInformation, educationDetails10Th, educationDetails12Th, educationDetailsGraduation, documentAndCenter, familyAndAddress, fetchSuccessfulPayment, fetchSucessfulSubmission, navigate]);
    useEffect(() => {
        handleSubmit();
    }, [handleSubmit]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
                <Loader className="w-10 h-10 animate-spin" />
                <p className="text-lg font-medium">Submitting your application...</p>
            </div>
        );
    }
    return null;
}
