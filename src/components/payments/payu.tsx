import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";
import { createPayuPayment } from "@/lib/api/payment";
import type { CategoryTypeEnum } from "@/lib/schemas/category.schema";
import { toast } from "sonner";

interface PayUParams {
    name: string;
    email: string;
    phone: string;
    category: CategoryTypeEnum;
    fees: number;
}

interface PayUFormProps extends React.HTMLAttributes<HTMLDivElement> {
    params: PayUParams;
}


export function PayuForm({
    className,
    params,
    ...props
}: PayUFormProps) {
    const [paymentData, setPaymentData] = useState<{
        txnid: string;
        amount: number;
        hash: string;
    } | null>(null);

    const [loading, setLoading] = useState(false);

    const fetchPaymentData = useCallback(async () => {
        setLoading(true);
        const response = await createPayuPayment({
            name: params.name,
            email: params.email,
            contact: params.phone,
            category: params.category,
        });
        if (response.status === "success") {
            setPaymentData({
                txnid: response.data.order.orderId,
                hash: response.data.order.hash,
                amount: response.data.payment.amount,
            });
        }
        else{
            setPaymentData(null);
            toast.error(response.message);
        }
        setLoading(false);
    }, [params]);

    useEffect(() => {
        if (paymentData) {
            console.log("Payment Data:", paymentData);
        }
    }, [paymentData]);

    useEffect(() => {
        fetchPaymentData();
    }, [fetchPaymentData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!paymentData) {
        return null;
    }
    return (
        <div className={className} {...props}>
            <form action="https://test.payu.in/_payment" method="post">
                <input type="hidden" name="key" value={import.meta.env.VITE_PAYU_MERCHANT_KEY} />
                <input type="hidden" name="txnid" value={paymentData.txnid} />
                <input type="hidden" name="productinfo" value={params.category} />
                <input type="hidden" name="amount" value={ Number(paymentData.amount).toFixed(2)} />
                <input type="hidden" name="email" value={params.email} />
                <input type="hidden" name="firstname" value={params.name} />
                <input type="hidden" name="surl" value={`${import.meta.env.VITE_API_URL}/api/payments/verify-payu?orderId=${paymentData.txnid}`} />
                <input type="hidden" name="furl" value={`${import.meta.env.VITE_API_URL}`} />
                <input type="hidden" name="phone" value={params.phone} />
                <input type="hidden" name="hash" value={paymentData.hash} />
                <Button type="submit" className="w-full cursor-pointer">Pay ₹{params.fees}</Button>
            </form>
        </div>
    );
}
