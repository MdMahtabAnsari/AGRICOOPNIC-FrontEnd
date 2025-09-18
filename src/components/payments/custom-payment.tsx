import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import { createCustomPayment, verifyCustomPayment } from "@/lib/api/payment";
import type { CategoryTypeEnum } from "@/lib/schemas/category.schema";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { customVerifyPaymentSchema } from "@/lib/schemas/payment.schema";
import type { CustomVerifyPaymentSchema } from "@/lib/schemas/payment.schema";
import { CloudinaryUploadWidget } from "@/components/custom/cloudinary-widget";
import { Loader } from "lucide-react";

interface CustomPaymentProps {
    fees: number;
    category: CategoryTypeEnum;
}

interface CustomPaymentFormProps extends React.HTMLAttributes<HTMLDivElement> {
    params: CustomPaymentProps;
}

export function CustomPaymentForm({
    className,
    params,
    ...props
}: CustomPaymentFormProps) {
    const [paymentData, setPaymentData] = useState<{
        orderId: string;
        qrCodeDataUrl: string;
    } | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const form = useForm<CustomVerifyPaymentSchema>({
        resolver: zodResolver(customVerifyPaymentSchema),
        defaultValues: {
            paymentId: "",
            url: ""
        }
        ,
        mode: "onChange"
    });

    const fetchPaymentData = useCallback(async () => {
        setLoading(true);
        const response = await createCustomPayment({
            category: params.category
        });

        if (response.status === "success") {
            setPaymentData({
                orderId: response.data.order.orderId,
                qrCodeDataUrl: response.data.qrCodeDataUrl
            });
        }
        else {
            setPaymentData(null);
            toast.error(response.message);
        }

        setLoading(false);
    }, [params]);

    const handleVerifyPayment = useCallback(async (paymentData: CustomVerifyPaymentSchema) => {
        const response = await verifyCustomPayment({
            paymentId: paymentData.paymentId,
            orderId: paymentData.orderId,
            url: paymentData.url
        });

        if (response.status === "success") {
            toast.success("Payment verified successfully.");
            navigate("/application/auto-submit")
        } else {
            toast.error(response.message);
        }
    }, [navigate]);


    useEffect(() => {
        if (paymentData?.orderId) {
            form.setValue("orderId", paymentData.orderId);
        }
    }, [paymentData, form]);

    useEffect(() => {
        fetchPaymentData();
    }, [fetchPaymentData]);

    const url =  form.watch("url");

    if (loading) {
        return <div className={className} {...props}>Loading...</div>;
    }

    if (!paymentData) {
        return null;
    }

    return (
        <Card className={`w-full h-fit flex justify-center items-center ${className}`} {...props}>
            <CardContent className="flex flex-col gap-4 items-center">
                {/* show qr code and accept paymentId input and also write instuction that after payment finishes user should click verify payment with transaction id */}
                <img src={paymentData.qrCodeDataUrl} alt="QR Code" />

                <p>
                    Please scan the QR code to complete your payment of{" "}
                    <strong>₹{params.fees}</strong>.
                </p>

                <p>
                    After completing your UPI payment, please enter your{" "}
                    <strong>
                        UPI Transaction/Reference ID / UTR (Unique Transaction Reference) number
                    </strong>{" "}
                    (available in your payment app’s history or receipt) below.
                </p>

                <p>
                    You must also <strong>upload a screenshot of the transaction receipt</strong>{" "}
                    as proof of payment. Make sure the screenshot clearly shows:
                </p>
                <ul className="list-disc pl-6 text-left">
                    <li>Transaction/Reference ID / UTR (Unique Transaction Reference) number</li>
                    <li>Amount paid (₹{params.fees})</li>
                    <li>Date &amp; time of the transaction</li>
                    <li>
                        Payment status as <strong>Success</strong> or <strong>Completed</strong>
                    </li>
                </ul>

                <p className="text-sm italic">
                    Once you’ve entered the details and uploaded the screenshot, click{" "}
                    <strong>Verify Payment</strong> to proceed. Your form will be submitted only
                    after successful verification.
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleVerifyPayment)} className="w-full space-y-4">
                        <FormField
                            control={form.control}
                            name="paymentId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Transaction ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Transaction ID" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payment Screenshot</FormLabel>
                                    <FormControl>
                                        <CloudinaryUploadWidget
                                            onUpload={(info) => {
                                                field.onChange(info.secure_url);
                                            }}
                                            buttonText="Upload Payment Screenshot"
                                            disabled={false}
                                            className="mt-2 cursor-pointer"
                                            maxFileSize={2 * 1024 * 1024}
                                            allowedFormats={["png", "jpg", "jpeg"]}
                                            folder="payment_screenshots"
                                            multiple={false}
                                            showAdvancedOptions={false}
                                            cropping={false}
                                            sources={["local"]}
                                            publicId={`payment_screenshot_${Date.now()}`}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {url && (
                            <div className="flex flex-col items-center">
                                <img src={url} alt="Payment Screenshot" width={500} height={300} />
                            </div>
                        )}
                        <Button className="cursor-pointer w-full" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? <Loader className="animate-spin" /> : "Verify Payment"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}