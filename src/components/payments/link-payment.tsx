import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { createLinkPayment } from "@/lib/api/payment";
import type { CategoryTypeEnum } from "@/lib/schemas/category.schema";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getUserSuccessfulPayment } from "@/lib/api/payment";

import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";

interface LinkPaymentParams {
    email: string;
    phone: string;
    category: CategoryTypeEnum;
    fees: number;
}

interface LinkPaymentFormProps extends React.HTMLAttributes<HTMLDivElement> {
    params: LinkPaymentParams;
}

export function LinkPaymentForm({
    className,
    params,
    ...props
}: LinkPaymentFormProps) {

    const navigate = useNavigate();

    const getPaymentLink = useCallback((category: CategoryTypeEnum) => {
        const paymentLink: Record<CategoryTypeEnum, string> = {
            GENERAL: "https://v.payu.in/PAYUMN/sILs9vERJsFH",
            EWS_OR_OBC: "https://v.payu.in/PAYUMN/rIvsJvqio6f5",
            SC_OR_ST: "https://v.payu.in/PAYUMN/OI1sxvISUwvM",
        };
        return paymentLink[category];
    }, []);

    const handleCreateLinkPayment = useCallback(async () => {
        const response = await createLinkPayment({
            email: params.email,
            contact: params.phone,
            category: params.category,
        });
        if (response.status === "success") {
            window.open(getPaymentLink(params.category), "_blank", "noopener,noreferrer");
        } else {
            toast.error(response.message);
        }
    }, [params, getPaymentLink]);

    const { data, isPending } = useQuery({
        queryKey: ["payment", params.email, params.phone, params.category],
        queryFn: getUserSuccessfulPayment,
        refetchInterval: 1000,
    });

    if (!isPending && data?.status === "success") {
        navigate("/application/auto-submit");
    }

    return (
        <Card className={`w-full h-fit flex justify-center items-center ${className}`} {...props}>
            <CardContent className="flex flex-col gap-4 w-full">
                <h4 className="text-lg font-semibold text-center">Link Payment Instructions</h4>
                <p className="text-sm text-left">
                    You are registering with:
                    <br />
                    <strong>Email:</strong> {params.email} <br />
                    <strong>Phone:</strong> {params.phone}
                </p>
                <p className="text-sm text-left">
                    When you proceed to the PayU payment page, you must use the <strong>same email and mobile number</strong> as shown above. These details must match exactly with the <strong>PayU Customer Email and Customer Phone</strong> entered during payment.
                </p>
                <p className="text-sm text-red-600 font-semibold text-left">
                    Warning: If the email or phone entered on the PayU page does not match these values, your payment will NOT be verified
                </p>
                <Button type="button" onClick={handleCreateLinkPayment} disabled={isPending} className="w-full cursor-pointer">
                    {isPending ? "Checking Payment..." : `Pay ₹${params.fees}`}
                </Button>
                <p className="text-xs text-left">
                    Already paid with matching details? Please wait, we auto-check every second.
                </p>
            </CardContent>
        </Card>
    );
}
