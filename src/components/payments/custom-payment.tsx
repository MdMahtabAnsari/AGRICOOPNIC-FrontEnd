import { Button } from "@/components/ui/button";
import { Card, CardContent} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import { createCustomPayment, verifyCustomPayment } from "@/lib/api/payment";
import type { CategoryTypeEnum } from "@/lib/schemas/category.schema";
import { useNavigate } from "react-router-dom";

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
    const [paymentId, setPaymentId] = useState<null | string>(null);

    const navigate = useNavigate();

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

    const handleVerifyPayment = useCallback(async () => {
        if (!paymentId || !paymentData) {
            toast.error("Payment ID is required for verification.");
            return;
        }

        const response = await verifyCustomPayment({
            paymentId,
            orderId: paymentData.orderId
        });

        if (response.status === "success") {
            toast.success("Payment verified successfully.");
            navigate("/application/auto-submit")
        } else {
            toast.error(response.message);
        }
    }, [paymentId, paymentData, navigate]);

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
                    <p>Please scan the QR code to complete your payment.</p>
                    <p>After the payment is completed, enter the transaction ID below:</p>
                    <Input
                        placeholder="Transaction ID"
                        id="paymentId"
                        value={paymentId || ""}
                        onChange={(e) => setPaymentId(e.target.value)}
                    />
                <Button onClick={handleVerifyPayment} className="cursor-pointer w-full">Verify Payment</Button>
            </CardContent>
        </Card>
    );
}