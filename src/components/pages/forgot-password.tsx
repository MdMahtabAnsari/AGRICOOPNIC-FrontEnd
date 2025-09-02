"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Card, CardFooter, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { emailPasswordSchema } from "@/lib/schemas/auth.shema"
import type { EmailPasswordSchema } from "@/lib/schemas/auth.shema"
import { emailOtpSchema } from "@/lib/schemas/otp.schema"
import type { EmailOtpSchema, Otp } from "@/lib/schemas/otp.schema"
import { Loader, SendHorizontal } from "lucide-react"
import { sendOtp, verifyOtp, resetPassword } from "@/lib/api/auth"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator
} from "@/components/ui/input-otp"
import { useState, useEffect, useRef } from "react"

export function ForgotPasswordPage() {
    const [mounted, setMounted] = useState(false);


    useEffect(() => { setMounted(true); }, []);



    const form = useForm<EmailPasswordSchema>({
        resolver: zodResolver(emailPasswordSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    })


    const [otp, setOtp] = useState<Otp>("");
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
    const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(0);
    const [isOtpSending, setIsOtpSending] = useState<boolean>(false);
    const [isOtpVerifying, setIsOtpVerifying] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const navigate = useNavigate();


    const onSubmit = async (data: EmailPasswordSchema) => {
        const result = await resetPassword({ password: data.password });
        if (result.status === "success") {
            toast.success("Password reset successfully! You can now log in.");
            navigate("/signin");
        }
        else {
            toast.error("Failed to reset password. Please try again.");
        }
    }

    const onOtpVerify = async () => {
        const data: EmailOtpSchema = {
            email: form.getValues("email"),
            otp: otp,
        };
        if (!emailOtpSchema.safeParse(data).success) {
            toast.error("Invalid OTP format. Please enter a valid 6-digit OTP.");
            return;
        }
        setIsOtpVerifying(true);
        const result = await verifyOtp(data);
        if (result.status === "success") {
            toast.success("OTP verified successfully! You can now reset your password.");
            setIsOtpVerified(true);
            setIsOtpSent(false);
            setTimer(0); // Reset timer after successful verification
        } else {
            toast.error("Invalid OTP. Please try again.");
        }
        setIsOtpVerifying(false);
    }

    const onOtpSend = async () => {
        if (timer > 0) return;
        setIsOtpSending(true);
        const result = await sendOtp(form.getValues("email"));
        if (result.status === "success") {
            toast.success("OTP sent to your email. Please check your inbox.");
            setIsOtpSent(true);
            setTimer(60);
        } else {
            toast.error("Failed to send OTP. Please try again.");
            setIsOtpSent(false);
        }
        setIsOtpSending(false);
    }

    useEffect(() => {
        if (timer > 0) {
            timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
        } else if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [timer]);

    if (!mounted) return null;
    return (
        <Card className="w-full h-full border-none">
            <CardContent className="flex items-center justify-center h-full">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Forgot Password</CardTitle>
                        <CardDescription>Enter your email to receive an OTP for password reset</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* ...existing code... */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {!isOtpVerified && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onOtpSend}
                                        className="cursor-pointer w-full"
                                        disabled={timer > 0}
                                    >
                                        {isOtpSending ? <Loader className="animate-spin mr-2" /> : timer > 0 ? `Resend OTP in ${timer}s` : "Send OTP"}
                                        <SendHorizontal className="mr-2" />
                                    </Button>
                                )}
                                {isOtpSent && (
                                    <div className="space-y-4">
                                        <p className="text-sm">An OTP has been sent to your email. Please enter it below:</p>
                                        <div className="flex items-center flex-col space-y-4">
                                            <InputOTP
                                                maxLength={6}
                                                value={otp}
                                                onChange={(value) => setOtp(value)}
                                            >
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                            <Button type="button" variant="outline" onClick={onOtpVerify} className="w-full cursor-pointer" >
                                                {isOtpVerifying ? <Loader className="animate-spin mr-2" /> : "Verify OTP"}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                {isOtpVerified && (
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Enter new password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                {isOtpVerified && (
                                    <Button type="submit" className="w-full cursor-pointer" disabled={form.formState.isSubmitting || !form.formState.isValid}>
                                        {
                                            form.formState.isSubmitting ? (
                                                <Loader className="animate-spin mr-2" />
                                            ) : (
                                                "Reset Password"
                                            )}
                                    </Button>
                                )}
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center justify-center">

                        <Link to="/signin">
                            <Button variant="link" className="cursor-pointer">
                                Sign in with Password
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </CardContent>
        </Card>
    );
}