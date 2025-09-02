import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { BasicInformationSchema } from "@/lib/schemas/pages/basicInformation.schema";
import { basicInformationSchema } from "@/lib/schemas/pages/basicInformation.schema";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useBasicInformationStore, useEmailVerifiedStore } from "@/store/basic-information-store";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useCallback, useEffect, useState } from "react";
import { Loader, SendHorizontal } from 'lucide-react';
import { useFormStepStore } from "@/store/form-step-store";
import { Skeleton } from "@/components/ui/skeleton";

import { InputOTP, InputOTPGroup, InputOTPSlot, } from "@/components/ui/input-otp";

import { requestOtp, verifyOtp } from "@/lib/api/otp";

import { toast } from "sonner"

import { useDebounceCallback } from "usehooks-ts";
import { isAadhaarExists, isEmailExists, isPhoneExists } from "@/lib/api/user.ts";

import { aadhaar as aadhaarSchema, email as emailSchema, phone as phoneSchema } from "@/lib/schemas/common.schema.ts";
import { jobPostObj,categoryObj } from "@/lib/helpers/type-object";

export function BasicInformationForm() {
    const isEmailVerified = useEmailVerifiedStore((state) => state.isVerified);
    const setEmailVerified = useEmailVerifiedStore((state) => state.setVerified)
    const setBasicInformation = useBasicInformationStore((state) => state.setBasicInformation);
    const basicInformation = useBasicInformationStore((state) => state.basicInformation);
    const setDisabled = useFormStepStore((state) => state.setDisabled);
    const disabled = useFormStepStore((state) => state.disabled)
    const [loading, setLoading] = useState(true);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [isOtpSending, setIsOtpSending] = useState(false);

    const [otpTimer, setOtpTimer] = useState(0);

    const [isEmailExist, setIsEmailExist] = useState(false);
    const [isPhoneExist, setIsPhoneExists] = useState(false);
    const [isAadhaarExist, setIsAadhaarExist] = useState(false);

    const form = useForm<BasicInformationSchema>({
        resolver: zodResolver(basicInformationSchema),
        defaultValues: {
            user: {
                name: "",
                email: "",
                phone: "",
                aadhaar: "",
            },
            jobPost: {
                name: undefined,
            },
            category: {
                categoryType: undefined,
            },
        },


        mode: 'onChange',
    });


    const watchedValues = form.watch(['user.email', 'user.name', 'user.phone', 'user.aadhaar', 'jobPost.name', 'category.categoryType']);
    const [email, name, phone, aadhaar, jobPostName, categoryType] = watchedValues;

    const [debouncedEmail, setDebouncedEmail] = useState(email);
    const [debouncedPhone, setDebouncedPhone] = useState(phone);
    const [debouncedAadhaar, setDebouncedAadhaar] = useState(aadhaar);

    const debouncedEmailCheck = useDebounceCallback(setDebouncedEmail, 500);
    const debouncedPhoneCheck = useDebounceCallback(setDebouncedPhone, 500);
    const debouncedAadhaarCheck = useDebounceCallback(setDebouncedAadhaar, 500);

    useEffect(() => {
        debouncedEmailCheck(email);
    }, [email, debouncedEmailCheck]);

    useEffect(() => {
        debouncedPhoneCheck(phone);
    }, [phone, debouncedPhoneCheck]);

    useEffect(() => {
        debouncedAadhaarCheck(aadhaar);
    }, [aadhaar, debouncedAadhaarCheck]);

    useEffect(() => {
        if(loading) return;
        if(isEmailExist || isPhoneExist || isAadhaarExist) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [loading, isEmailExist, isPhoneExist, isAadhaarExist, setDisabled]);

    const checkEmailExists = useCallback(async (email: string) => {
        if (!emailSchema.safeParse(email).success) {
            setIsEmailExist(false);
            return;
        }
        const response = await isEmailExists(email);
        if (response.status === "success") {
            setIsEmailExist(response.data);
            if (response.data) {
                form.setError('user.email', {
                    type: 'manual',
                    message: "Email already exists"
                });
                toast.error("Email already exists");
            }
        } else {
            setIsEmailExist(false);
            form.setError('user.email', {
                type: 'manual',
                message: response.message || "Failed to check email existence"
            })
            toast.error(response.message || "Failed to check email existence");
        }
    }, [form]);

    const checkPhoneExists = useCallback(async (phone: string) => {
        if (!phoneSchema.safeParse(phone).success) {
            setIsPhoneExists(false);
            return;
        }
        const response = await isPhoneExists(phone);
        if (response.status === "success") {
            setIsPhoneExists(response.data);
            if (response.data) {
                form.setError('user.phone', {
                    type: 'manual',
                    message: "Phone number already exists"
                });
                toast.error("Phone number already exists");
            }
        } else {
            setIsPhoneExists(false);
            form.setError('user.phone', {
                type: 'manual',
                message: response.message || "Failed to check phone existence"
            })
            toast.error(response.message || "Failed to check phone existence");
        }
    }, [form]);

    const checkAadhaarExists = useCallback(async (aadhaar: string) => {
        if (!aadhaarSchema.safeParse(aadhaar).success) {
            setIsAadhaarExist(false);
            return;
        }
        const response = await isAadhaarExists(aadhaar);
        if (response.status === "success") {
            setIsAadhaarExist(response.data);
            if (response.data) {
                form.setError('user.aadhaar', {
                    type: 'manual',
                    message: "Aadhaar number already exists"
                });
                toast.error("Aadhaar number already exists");
            }
        } else {
            setIsAadhaarExist(false);
            toast.error(response.message || "Failed to check Aadhaar existence");
        }
    }, [form]);


    useEffect(() => {
        if (debouncedEmail) {
            checkEmailExists(debouncedEmail);
        }
    }, [checkEmailExists, debouncedEmail]);

    useEffect(() => {
        if (debouncedPhone) {
            checkPhoneExists(debouncedPhone);
        }
    }, [checkPhoneExists, debouncedPhone]);
    useEffect(() => {
        if (debouncedAadhaar) {
            checkAadhaarExists(debouncedAadhaar);
        }
    }, [checkAadhaarExists, debouncedAadhaar]);

    useEffect(() => {
        if (loading) return;
        else if (!basicInformation || (name !== basicInformation.user.name) ||
            (phone !== basicInformation.user.phone) ||
            (aadhaar !== basicInformation.user.aadhaar) ||
            (jobPostName !== basicInformation.jobPost.name) ||
            (categoryType !== basicInformation.category.categoryType)) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [aadhaar, basicInformation, categoryType, jobPostName, loading, name, phone, setDisabled]);

    const handleCreateOtp = useCallback(async () => {
        if (!email) {
            setIsOtpSending(false);
            toast.error("Email is required to send OTP");
            return;
        }
        if(!emailSchema.safeParse(email).success) {
            setIsOtpSending(false);
            return;
        }
        if(isEmailExist) {
            toast.error("Email already exists");
            setIsOtpSending(false);
            return;
        }
        setIsOtpSending(true);
        const response = await requestOtp(email);
        if (response.status === "success") {
            setIsOtpSent(true);
            setOtpTimer(60); // Set timer for 60 seconds
            toast.success(response.message || "OTP sent successfully");
        } else {
            toast.error(response.message || "OTP sending failed");
        }
        setIsOtpSending(false);
    }, [email, isEmailExist]);


    const handleVerifyOtp = useCallback(async () => {
        const response = await verifyOtp({ email, otp });
        if (response.status === "success") {
            setEmailVerified(true);
            setIsOtpSent(false);
            setOtp("");
            setEmailVerified(true);
            toast.success(response.message || "OTP verified successfully");
        } else {
            toast.error(response.message || "OTP verification failed");
        }
    }, [email, otp, setEmailVerified]);


    useEffect(() => {
        setLoading(true)
        if (basicInformation) {

            form.reset(basicInformation);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isOtpSent && otpTimer > 0) {
            timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
        }
        if (isOtpSent && otpTimer === 0) {
            setIsOtpSent(false);
        }
        return () => clearTimeout(timer);
    }, [isOtpSent, otpTimer]);

    if (loading) {
        return <BasicInformationPageSkeleton />;
    }


    function onSubmit(data: BasicInformationSchema) {
        setBasicInformation(data)
    }

    return (
        <Card className="border-none">
            <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Fill in your basic information</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 py-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>User Information</CardTitle>
                                <CardDescription>Enter your personal details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="user.name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="user.email"
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
                                {!isEmailVerified && (
                                    <Button onClick={handleCreateOtp} variant="outline"
                                        className="cursor-pointer w-full" type="button"
                                        disabled={isOtpSent || isEmailVerified || form.formState.errors.user?.email !== undefined || isOtpSending || isEmailExist}>
                                        {isOtpSending ? <Loader className="animate-spin" /> : "Send OTP"}
                                    </Button>
                                )}
                                {isOtpSent && otpTimer > 0 && (
                                    <span style={{ marginLeft: 8, color: "#888" }}>
                                        Resend in {otpTimer}s
                                    </span>
                                )}
                                {
                                    isOtpSent && (
                                        <div className="flex items-center gap-2">
                                            <InputOTP
                                                maxLength={6}
                                                value={otp} // <-- Make it controlled
                                                onChange={(value) => setOtp(value)}
                                            >
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                            <Button onClick={handleVerifyOtp} variant="outline" className="cursor-pointer"
                                                type="button">
                                                <SendHorizontal />
                                            </Button>
                                        </div>
                                    )
                                }
                                <FormField
                                    control={form.control}
                                    name="user.phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your phone number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="user.aadhaar"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Aadhaar Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your Aadhaar number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Job Post Information</CardTitle>
                                <CardDescription>Enter the job post details</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="jobPost.name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Job Post Name</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select job post"  className="text-muted-foreground" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="MTS">{jobPostObj.MTS}</SelectItem>
                                                        <SelectItem value="SUPERVISOR">{jobPostObj.SUPERVISOR}</SelectItem>
                                                        <SelectItem value="CLERK">{jobPostObj.CLERK}</SelectItem>
                                                        <SelectItem value="ASSISTANT_AGRICULTURE_OFFICER">{jobPostObj.ASSISTANT_AGRICULTURE_OFFICER}</SelectItem>
                                                        <SelectItem value="AGRICULTURE_OFFICER">{jobPostObj.AGRICULTURE_OFFICER}</SelectItem>
                                                        <SelectItem value="FIELD_OFFICER">{jobPostObj.FIELD_OFFICER}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Category Information</CardTitle>
                                <CardDescription>Select the category type</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="category.categoryType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category Type</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="EWS_OR_OBC">{categoryObj.EWS_OR_OBC}</SelectItem>
                                                        <SelectItem value="SC_OR_ST">{categoryObj.SC_OR_ST}</SelectItem>
                                                        <SelectItem value="GENERAL">{categoryObj.GENERAL}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <Button type="submit" className="w-full cursor-pointer"
                            disabled={!disabled || !isEmailVerified || isEmailExist || isPhoneExist || isAadhaarExist}>Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export function BasicInformationPageSkeleton() {
    return (
        <Card className="border-none">
            <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Loading...</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>User Information</CardTitle>
                        <CardDescription>Loading user details...</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-full mb-2" />
                        <Skeleton className="h-8 w-full mb-2" />
                        <Skeleton className="h-8 w-full mb-2" />
                        <Skeleton className="h-8 w-full mb-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Job Post Information</CardTitle>
                        <CardDescription>Loading job post details...</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-full mb-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Category Information</CardTitle>
                        <CardDescription>Loading category details...</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-full mb-2" />
                    </CardContent>
                </Card>
            </CardContent>
            <Button className="w-full" disabled>
                Submit
            </Button>
        </Card>
    );
}



export function BasicInformationPage() {
    const basicInformation = useBasicInformationStore((state) => state.basicInformation);
    return (
        <Card className="border-none">
            <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Review your basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>User Information</CardTitle>
                        <CardDescription>Details about the user</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p><strong>Name:</strong> {basicInformation?.user.name}</p>
                        <p><strong>Email:</strong> {basicInformation?.user.email}</p>
                        <p><strong>Phone:</strong> {basicInformation?.user.phone}</p>
                        <p><strong>Aadhaar:</strong> {basicInformation?.user.aadhaar}</p>

                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Job Post Information</CardTitle>
                        <CardDescription>Details about the job post</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p><strong>Job Post:</strong> {basicInformation?.jobPost.name ? jobPostObj[basicInformation.jobPost.name] : ""}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Category Information</CardTitle>
                        <CardDescription>Details about the category</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p><strong>Category:</strong> {basicInformation?.category.categoryType ? categoryObj[basicInformation.category.categoryType] : ""}</p>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}