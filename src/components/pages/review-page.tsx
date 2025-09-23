import { Card, CardHeader, CardDescription, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { useEffect, useCallback, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { BasicInformationPage } from "@/components/pages/basic-information";
import { FamilyAndAddressPage } from "@/components/pages/family-address-form";
import { EducationDetailsPage } from "@/components/pages/education-detail-form";
import { DocumentAndCenterPage } from "@/components/pages/document-and-center-form";
import { useBasicInformationStore } from "@/store/basic-information-store";
import { useEducationDetailsStore10Th, useEducationDetailsStore12Th, useEducationDetailsStoreGraduation } from "@/store/education-details-store";
import { useFamilyAndAddressStore } from "@/store/family-address-store";
import { useDocumentAndCenterStore } from "@/store/document-and-center-store";
import { useFormStepStore } from "@/store/form-step-store";
import { createBasicInformation } from "@/lib/api/group/basic-information";
import { createFamilyAndAddress } from "@/lib/api/group/family-and-address";
import { createEducationDetails } from "@/lib/api/group/education-detail";
import { createDocumentAndCenter } from "@/lib/api/group/document-and-prefrence";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { formSubmit } from "@/lib/api/formSubmit";
import { getUserSuccessfulPayment } from "@/lib/api/payment";
import { toast } from "sonner";
import { deleteUser } from "@/lib/api/user";
import { Skeleton } from "@/components/ui/skeleton";
import { getFormStatus } from "@/lib/api/formSubmit"
import { getFees } from "@/lib/api/fees";
import { useNavigate } from "react-router-dom";
// import { PayuForm } from "@/components/payments/payu";
// import { CustomPaymentForm } from "@/components/payments/custom-payment";
import { BankPaymentForm } from "../payments/bank-payment";

// import type { RazorpayResponse } from "@/providers/payment-provider";
export function ReviewPage() {
    const basicInformation = useBasicInformationStore((state) => state.basicInformation);
    const educationDetails10Th = useEducationDetailsStore10Th((state) => state.educationDetails);
    const educationDetails12Th = useEducationDetailsStore12Th((state) => state.educationDetails);
    const educationDetailsGraduation = useEducationDetailsStoreGraduation((state) => state.educationDetails);
    const documentAndCenter = useDocumentAndCenterStore((state) => state.documentAndCenter);
    const familyAndAddress = useFamilyAndAddressStore((state) => state.familyAndAddress);
    const [loading, setLoading] = useState<boolean>(false);
    const setPrevDisabled = useFormStepStore((state) => state.setPrevDisabled);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState<boolean>(false);
    const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
    const [successfulSubmission, setSuccessfulSubmission] = useState<boolean>(false);
    const [fees, setFees] = useState<number | null>(null);

    const navigate = useNavigate();

    const fetchSuccessfulPayment = useCallback(async () => {
        setPaymentLoading(true);
        const response = await getUserSuccessfulPayment();
        if (response.status === "success") {
            setIsPaymentSuccessful(true);
        }
        setPaymentLoading(false);
    }, []);

    const fetchFees = useCallback(async () => {
        if (!basicInformation) return;
        const response = await getFees(basicInformation.category.categoryType);
        if (response.status === "success") {
            setFees(response.data.amount);
        }
    }, [basicInformation]);

    const fetchSucessfulSubmission = useCallback(async () => {
        const response = await getFormStatus();
        if (response.status === "success") {
            setSuccessfulSubmission(true);
        } else {
            setSuccessfulSubmission(false);
        }
    }, [])

    useEffect(() => {
        fetchFees();
    }, [fetchFees]);

    useEffect(() => {
        fetchSucessfulSubmission();
    }, [fetchSucessfulSubmission]);

    useEffect(() => {
        fetchSuccessfulPayment();
    }, [fetchSuccessfulPayment]);

    const handleSubmit = useCallback(async () => {
        const educationDetails = basicInformation?.jobPost.name === "MTS" ? educationDetails10Th : (basicInformation?.jobPost.name === "SUPERVISOR" || basicInformation?.jobPost.name === "CLERK") ? educationDetails12Th : educationDetailsGraduation;
        if (!basicInformation || !educationDetails || !documentAndCenter || !familyAndAddress) {
            return;
        }
        setSuccessfulSubmission(false);
        setPrevDisabled(true);
        setLoading(true);
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
            setPrevDisabled(false);
            return;
        }
        setSuccessfulSubmission(true);
        setLoading(false);
        setPrevDisabled(false);
        navigate("/application/details")
    }, [basicInformation, educationDetails10Th, educationDetails12Th, educationDetailsGraduation, documentAndCenter, familyAndAddress, setPrevDisabled, navigate]);

    // const handlePayment = useCallback(async () => {
    //     setIsPaymentSuccessful(false);
    //     if (!basicInformation) {
    //         return;
    //     }
    //     setLoading(true);
    //     const paymentInfo = await createRazorpayPayment({
    //         category: basicInformation.category.categoryType,
    //         name: basicInformation.user.name,
    //         email: basicInformation.user.email,
    //         contact: basicInformation.user.phone,
    //     });
    //     if (paymentInfo.status !== "success") {
    //         toast.error(paymentInfo.message);
    //         setLoading(false);
    //         return;
    //     }
    //     if (!window.Razorpay) {
    //         toast.error("Razorpay not loaded");
    //         setLoading(false);
    //         return;
    //     }

    //     if (!window.Razorpay) {
    //         toast.error("Payment service not loaded. Please refresh the page.");
    //         setLoading(false);
    //         return;
    //     }
    //     const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
    //     const paymentObj = new window.Razorpay({
    //         key: key,
    //         order_id: paymentInfo.data.order.id,
    //         ...paymentInfo.data,
    //         handler: async (response: RazorpayResponse) => {
    //             console.log("Razorpay Payment response:", response);
    //             const verifyResponse = await verifyRazorpayPayment({
    //                 orderId: response.razorpay_order_id,
    //                 paymentId: response.razorpay_payment_id,
    //                 signature: response.razorpay_signature
    //             });
    //             if (verifyResponse.status === 'success') {
    //                 toast.success("Payment successful");
    //                 setIsPaymentSuccessful(true);
    //             } else {
    //                 toast.error(verifyResponse.message || "Failed to verify payment");
    //             }
    //         }
    //     });
    //     paymentObj.open();

    //     setLoading(false);
    // }, [basicInformation]);

    return (
        <Card className="border-none">
            <CardHeader>
                <CardTitle>Review Your Information</CardTitle>
                <CardDescription>
                    Please review the information you have provided before submitting.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <BasicInformationPage />
                <Separator />
                <FamilyAndAddressPage />
                <Separator />
                <EducationDetailsPage />
                <Separator />
                <DocumentAndCenterPage />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                {isPaymentSuccessful && !successfulSubmission && !paymentLoading && (
                    <Button onClick={handleSubmit} disabled={loading} className="w-full cursor-pointer">
                        {loading ? <Loader className="animate-spin" /> : "Submit"}
                    </Button>
                )}
                {!isPaymentSuccessful && basicInformation && fees && (
                    <BankPaymentForm className="w-full h-fit"
                        params={{
                            category: basicInformation.category.categoryType,
                            fees: fees
                        }}
                    />
                )}
            </CardFooter>
        </Card>
    );
}

export function ReviewPageSkeleton() {
    return (
        <Card className="border-none">
            <CardHeader>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-96" />
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Basic Information Section */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-48" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-28" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-36" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                </div>
                <Separator />
                {/* Family & Address Section */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-52" />
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-36" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                        </div>
                    </div>
                </div>
                <Separator />
                {/* Education Details Section */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-44" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-36" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-28" />
                        </div>
                    </div>
                </div>
                <Separator />
                {/* Document & Center Section */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-56" />
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-16 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-16 w-full" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    );
}