import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import { bankPayment } from "@/lib/api/payment";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { bankPaymentInputSchema } from "@/lib/schemas/payment.schema";
import type { BankPaymentInputSchema } from "@/lib/schemas/payment.schema";
import { CloudinaryUploadWidget } from "@/components/custom/cloudinary-widget";
import type { BankSchema } from "@/lib/schemas/api-response/bank.schema";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { bankDetails } from "@/lib/api/bank";
import type {CustomPaymentFormProps} from "@/components/payments/custom-payment"

import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"




export function BankPaymentForm({
    className,
    params,
    ...props
}: CustomPaymentFormProps) {
    const [loading, setLoading] = useState(false);

    const [bankDetail, setBankDetail] = useState<BankSchema | null>(null);

    const navigate = useNavigate();

    const form = useForm<BankPaymentInputSchema>({
        resolver: zodResolver(bankPaymentInputSchema),
        defaultValues: {
            paymentId: "",
            url: "",
            date: new Date(),
            time: new Date().toTimeString().split(' ')[0],
            category: params.category,
        }
        ,
        mode: "onChange"
    });

    const fetchBankDetails = useCallback(async () => {
        setLoading(true);
        const response = await bankDetails();
        if (response.status === "success") {
            setBankDetail(response.data);
        }
        else {
            setBankDetail(null);
            toast.error(response.message || "Failed to fetch bank details");
        }
        setLoading(false);
    }, []);


    const handleVerifyPayment = useCallback(async (paymentData: BankPaymentInputSchema) => {
        const response = await bankPayment({
            paymentId: paymentData.paymentId,
            category: paymentData.category,
            url: paymentData.url,
            dateTime: new Date(
                new Date(paymentData.date!).setHours(
                    parseInt(paymentData.time.split(':')[0]),
                    parseInt(paymentData.time.split(':')[1]),
                    parseInt(paymentData.time.split(':')[2])
                )
            ),
        });
        if (response.status === "success") {
            toast.success("Payment verified successfully.");
            navigate("/application/auto-submit")
        } else {
            toast.error(response.message);
        } console.log(paymentData);
    }, [navigate]);


    useEffect(() => {
        fetchBankDetails();
    }, [fetchBankDetails]);

    const url = form.watch("url");

    if (loading) {
        return <div className={className} {...props}>Loading...</div>;
    }

    if (!bankDetail) {
        return null;
    }

    return (
        <Card className={`w-full h-fit flex justify-center items-center ${className}`} {...props}>
            <CardContent className="flex flex-col gap-4 items-center">
                <h3 className="text-2xl font-bold text-center">Bank Transfer Payment</h3>
                <div className="w-full p-4 border rounded-md">
                    <h4 className="text-lg font-semibold mb-2">Bank Details</h4>
                    <p className="text-sm">
                        <strong>Account Number:</strong> {bankDetail.accountNo}
                    </p>

                    <p className="text-sm">
                        <strong>Bank Name:</strong> {bankDetail.bankName}
                    </p>
                    <p className="text-sm">
                        <strong>IFSC Code:</strong> {bankDetail.ifscCode}
                    </p>
                </div>

                <h4 className="text-lg font-semibold mb-2">Instructions for Bank Transfer</h4>
                <ol className="list-decimal pl-6 space-y-2 text-sm text-left">
                    <li>
                        <strong>Check Bank Details Carefully:</strong> Ensure you transfer the exact fees of{" "}
                        <strong>₹{params.fees}</strong> to the provided account details (Account Number, Bank Name, IFSC Code).
                    </li>
                    <li>
                        <strong>Make the Bank Transfer:</strong> Use your preferred method like{" "}
                        <strong>NEFT / RTGS / IMPS</strong> from your bank account. Enter the exact
                        amount and complete the transfer.
                    </li>
                    <li>
                        <strong>After Payment – Collect Proof:</strong> Once your transfer is successful,
                        note down the <strong>Transaction Reference Number / UTR</strong> generated by
                        your bank. Also, download or take a screenshot of the bank transfer receipt.
                        The proof must clearly show:
                        <ul className="list-disc pl-6">
                            <li>Transaction Reference Number / UTR</li>
                            <li>Amount Paid (₹{params.fees})</li>
                            <li>Date &amp; Time of Transfer</li>
                            <li>Status as <strong>Success</strong> or <strong>Completed</strong></li>
                        </ul>
                    </li>
                    <li>
                        <strong>Fill the Verification Form:</strong> Enter the Transaction Reference/UTR,
                        upload the receipt screenshot, and provide the exact Date &amp; Time of transfer.
                    </li>
                    <li>
                        <strong>Submit for Verification:</strong> Click <strong>Verify Payment</strong>.
                        Your form will be processed only after successful verification of your bank transfer.
                    </li>
                </ol>
                <p className="text-sm text-red-600 font-bold mt-3">
                    ⚠️ Incorrect or mismatched details will lead to rejection of your form. Without proper
                    verification of your bank transfer, you will not be allowed to appear for the exam.
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
                        {/* accept date time of payment */}
                        <Label className="text-center">Date & Time of Payment</Label>
                        <div className="sm:grid sm:grid-cols-2 gap-2 w-full flex flex-wrap">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Time</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                step="1"
                                                placeholder="hh:mm:ss AM/PM"
                                                {...field}
                                                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {url && (
                            <div className="flex flex-col items-center">
                                <img src={url} alt="Payment Screenshot" width={500} height={300} />
                            </div>
                        )}
                        <Button className="cursor-pointer w-full" type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? <Loader className="animate-spin" /> : "Verify Payment"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}