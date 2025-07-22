import { Card, CardHeader, CardDescription, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Suspense, useEffect, useCallback, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { BasicInformationPage } from "@/components/pages/basic-information";
import { FamilyAndAddressPage } from "@/components/pages/family-address-form";
import { EducationDetailsPage } from "@/components/pages/education-detail-form";
import { DocumentAndCenterPage } from "@/components/pages/document-and-center-form";
import { useBasicInformationStore } from "@/store/basic-information-store";
import { useEducationDetailsStore } from "@/store/education-details-store";
import { useFamilyAndAddressStore } from "@/store/family-address-store";
import { useDocumentAndCenterStore } from "@/store/document-and-center-store";
import { useFormStepStore } from "@/store/form-step-store";
import { DownloadPDFButton,DownloadPDFButtonSkeleton } from "@/components/pdf/download-button";
import { createBasicInformation } from "@/lib/api/group/basic-information";
import { createFamilyAndAddress } from "@/lib/api/group/family-and-address";
import { createEducationDetails } from "@/lib/api/group/education-detail";
import { createDocumentAndCenter } from "@/lib/api/group/document-and-prefrence";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { formSubmit } from "@/lib/api/formSubmit";
import { createPayment, verifyPayment, getUserSuccessfulPayment } from "@/lib/api/payment";
import type { PaymentResponseSchema } from "@/lib/schemas/api-response/payment.schema";
import { toast } from "sonner";
import { deleteUser } from "@/lib/api/user";
import { Skeleton } from "@/components/ui/skeleton";

export function ReviewPage() {
    const basicInformation = useBasicInformationStore((state) => state.basicInformation);
    const educationDetails = useEducationDetailsStore((state) => state.educationDetails);
    const documentAndCenter = useDocumentAndCenterStore((state) => state.documentAndCenter);
    const familyAndAddress = useFamilyAndAddressStore((state) => state.familyAndAddress);
    const [loading, setLoading] = useState<boolean>(false);
    const setPrevDisabled = useFormStepStore((state) => state.setPrevDisabled);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState<boolean>(false);
    const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
    const [successfulSubmission, setSuccessfulSubmission] = useState<boolean>(false);
    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState<boolean>(false);

    // Dynamically load Razorpay script
    useEffect(() => {
        const scriptId = "razorpay-script";
        if ((window as any).Razorpay) {
            setIsRazorpayLoaded(true);
            return;
        }
        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => setIsRazorpayLoaded(true);
            script.onerror = () => setIsRazorpayLoaded(false);
            document.body.appendChild(script);
        } else {
            const checkRazorpay = () => {
                if ((window as any).Razorpay) {
                    setIsRazorpayLoaded(true);
                } else {
                    setTimeout(checkRazorpay, 100);
                }
            };
            checkRazorpay();
        }
    }, []);

    const fetchSuccessfulPayment = useCallback(async () => {
        setPaymentLoading(true);
        const response = await getUserSuccessfulPayment();
        if (response.status === "success") {
            setIsPaymentSuccessful(true);
        } else {
            toast.error(response.message || "Failed to fetch successful payments");
        }
        setPaymentLoading(false);
    }, []);

    useEffect(() => {
        fetchSuccessfulPayment();
    }, [fetchSuccessfulPayment]);

    const handleSubmit = useCallback(async () => {
        if (!basicInformation || !educationDetails || !documentAndCenter || !familyAndAddress) {
            return;
        }
        setSuccessfulSubmission(false);
        setPrevDisabled(true);
        setLoading(true);
        const basicInfoResult = await createBasicInformation(basicInformation);
        const [educationResult, documentResult, familyResult] = await Promise.all([
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
        setSuccessfulSubmission(true);
        setLoading(false);
        setPrevDisabled(false);
        return {
            basicInfoResult,
            educationResult,
            documentResult,
            familyResult,
            formSubmitInfo
        }
    }, [basicInformation, educationDetails, documentAndCenter, familyAndAddress, createBasicInformation, createEducationDetails, createFamilyAndAddress, setPrevDisabled]);

    const handlePayment = useCallback(async () => {
        setIsPaymentSuccessful(false);
        if (!basicInformation) {
            return;
        }
        setLoading(true);
        const paymentInfo = await createPayment({
            category: basicInformation.category.categoryType,
            name: basicInformation.user.name,
            email: basicInformation.user.email,
            contact: basicInformation.user.phone,
        });
        if (paymentInfo.status !== "success") {
            toast.error(paymentInfo.message);
            setLoading(false);
            return;
        }
        // Wait for Razorpay script to load
        if (!(window as any).Razorpay) {
            toast.error("Payment gateway not available. Please refresh and try again.");
            setLoading(false);
            return;
        }
        const data = paymentInfo.data as PaymentResponseSchema;
        const order = data.order;
        const paymentObject = new (window as any).Razorpay({
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            order_id: order.id,
            ...data,
            handler: async (response: any) => {
                const verifyData = {
                    orderId: response.razorpay_order_id,
                    paymentId: response.razorpay_payment_id,
                    signature: response.razorpay_signature
                };
                const verifyResponse = await verifyPayment(verifyData);
                if (verifyResponse.status === "success") {
                    toast.success("Payment successful!");
                    setIsPaymentSuccessful(true);
                } else {
                    toast.error(verifyResponse.message);
                }
            }
        });
        paymentObject.open();
        setLoading(false);
    }, [basicInformation]);

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
                {isPaymentSuccessful && successfulSubmission && (
                    <Suspense fallback={<DownloadPDFButtonSkeleton />}>
                        <DownloadPDFButton />
                    </Suspense>
                )}
                {isPaymentSuccessful && !successfulSubmission && !paymentLoading && (
                    <Button onClick={handleSubmit} disabled={loading} className="w-full cursor-pointer">
                        {loading ? <Loader className="animate-spin" /> : "Submit"}
                    </Button>
                )}
                {!isPaymentSuccessful && (
                    <Button
                        onClick={handlePayment}
                        disabled={loading || !isRazorpayLoaded}
                        className="w-full cursor-pointer"
                    >
                        {loading ? <Loader className="animate-spin" /> : !isRazorpayLoaded ? "Loading Payment..." : "Pay Now"}
                    </Button>
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