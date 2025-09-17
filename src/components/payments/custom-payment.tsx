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
            orderId: paymentData.orderId
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
                    Please scan the QR code to complete your payment of <strong>₹{ params.fees }</strong>.
                </p>
                <p>
                    After completing your UPI payment, please enter the UPI Transaction/Reference ID
                    (available in your payment app’s history/receipt) below.
                    Your form will be submitted only after successful verification.
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
                        <Button className="cursor-pointer w-full" disabled={!form.formState.isValid}>Verify Payment</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}