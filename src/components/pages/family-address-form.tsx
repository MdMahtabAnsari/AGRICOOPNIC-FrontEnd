import { Card, CardHeader, CardDescription, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import type { FamilyAndAddressSchema } from "@/lib/schemas/pages/familyAndAddress.schema";
import { familyAndAddressSchema } from "@/lib/schemas/pages/familyAndAddress.schema";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState, useEffect } from "react";

import { useFamilyAndAddressStore } from "@/store/family-address-store.ts";
import { useFormStepStore } from "@/store/form-step-store.ts";

import { Skeleton } from "@/components/ui/skeleton";

export function FamilyAddressForm() {
    const [loading, setLoading] = useState<boolean>(true);
    const familyAndAddress = useFamilyAndAddressStore((state) => state.familyAndAddress);
    const setFamilyAndAddress = useFamilyAndAddressStore((state) => state.setFamilyAndAddress);
    const disabled = useFormStepStore((state) => state.disabled)
    const setDisabled = useFormStepStore((state) => state.setDisabled);
    const form = useForm<FamilyAndAddressSchema>({
        resolver: zodResolver(familyAndAddressSchema),
        defaultValues: {
            family: {
                fatherName: "",
                motherName: "",
            },
            personalDetails: {
                dateOfBirth: undefined,
                gender: undefined,
                nationality: ""
            },
            permanentAddress: {
                addressType: 'PERMANENT',
                addressLine: "",
                city: "",
                state: "",
                pinCode: "",
            },
            correspondenceAddress: {
                addressType: 'CORRESPONDENCE',
                addressLine: "",
                city: "",
                state: "",
                pinCode: "",
            },
        },
        mode: 'onChange',
    });

    const watchedValues = form.watch(['family.fatherName', 'family.motherName', 'personalDetails.dateOfBirth', "personalDetails.nationality", 'personalDetails.gender', 'permanentAddress.addressLine', 'permanentAddress.city', 'permanentAddress.state', 'permanentAddress.pinCode', 'correspondenceAddress.addressLine', 'correspondenceAddress.city', 'correspondenceAddress.state', 'correspondenceAddress.pinCode']);
    const [fatherName, motherName, dateOfBirth, nationality, gender, permanentAddressLine, permanentCity, permanentState, permanentPinCode, correspondenceAddressLine, correspondenceCity, correspondenceState, correspondencePinCode] = watchedValues;




    useEffect(() => {
        if (loading) return;

        const isSameDate =
            dateOfBirth instanceof Date &&
                familyAndAddress?.personalDetails?.dateOfBirth instanceof Date
                ? dateOfBirth.getTime() === familyAndAddress.personalDetails.dateOfBirth.getTime()
                : dateOfBirth === familyAndAddress?.personalDetails?.dateOfBirth;

        const allMatch =
            familyAndAddress &&
            fatherName?.trim() === familyAndAddress.family.fatherName?.trim() &&
            motherName?.trim() === familyAndAddress.family.motherName?.trim() &&
            isSameDate &&
            nationality?.trim() === familyAndAddress.personalDetails.nationality?.trim() &&
            gender === familyAndAddress.personalDetails.gender &&
            permanentAddressLine?.trim() === familyAndAddress.permanentAddress.addressLine?.trim() &&
            permanentCity?.trim() === familyAndAddress.permanentAddress.city?.trim() &&
            permanentState?.trim() === familyAndAddress.permanentAddress.state?.trim() &&
            permanentPinCode?.trim() === familyAndAddress.permanentAddress.pinCode?.trim() &&
            correspondenceAddressLine?.trim() === familyAndAddress.correspondenceAddress.addressLine?.trim() &&
            correspondenceCity?.trim() === familyAndAddress.correspondenceAddress.city?.trim() &&
            correspondenceState?.trim() === familyAndAddress.correspondenceAddress.state?.trim() &&
            correspondencePinCode?.trim() === familyAndAddress.correspondenceAddress.pinCode?.trim();

        setDisabled(!allMatch);

    }, [correspondenceAddressLine, correspondenceCity, correspondencePinCode, correspondenceState, dateOfBirth, familyAndAddress, fatherName, gender, loading, motherName, nationality, permanentCity, permanentAddressLine, permanentPinCode, permanentState, setDisabled]);

    useEffect(() => {
        setLoading(true);
        if (familyAndAddress) {
            form.reset(familyAndAddress);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <FamilyAddressFormSkeleton />;
    }

    function onSubmit(data: FamilyAndAddressSchema) {
        setFamilyAndAddress(data);

    }

    return (
        <Card className="border-none">
            <CardHeader>
                <CardTitle>Family & Address Information</CardTitle>
                <CardDescription>Fill in your family and address details</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 py-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Family Details</CardTitle>
                                <CardDescription>Enter your family information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="family.fatherName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Father's Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter father's name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="family.motherName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mother's Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter mother's name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Details</CardTitle>
                                <CardDescription>Enter your personal details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="personalDetails.dateOfBirth"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date of Birth</FormLabel>
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
                                    name="personalDetails.gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Gender</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="MALE">Male</SelectItem>
                                                        <SelectItem value="FEMALE">Female</SelectItem>
                                                        <SelectItem value="OTHER">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="personalDetails.nationality"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nationality</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your nationality" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Permanent Address</CardTitle>
                                <CardDescription>Enter your permanent address</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="permanentAddress.addressLine"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address Line</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter your permanent address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="permanentAddress.city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter city" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="permanentAddress.state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter state" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="permanentAddress.pinCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pin Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter pin code" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Correspondence Address</CardTitle>
                                <CardDescription>Enter your correspondence address</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="correspondenceAddress.addressLine"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address Line</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter your correspondence address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="correspondenceAddress.city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter city" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="correspondenceAddress.state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter state" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="correspondenceAddress.pinCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pin Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter pin code" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <Button type="submit" className="w-full mt-4 cursor-pointer" disabled={!disabled}>
                            Submit
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

    );
}


export const FamilyAddressFormSkeleton = () => {
    return (
        <Card className="border-none">
            <CardHeader>
                <CardTitle>Family & Address Information</CardTitle>
                <CardDescription>Loading...</CardDescription>
            </CardHeader>
            <CardContent>
                <Card className="space-y-4">
                    <CardHeader>
                        <CardTitle>Family Details</CardTitle>
                        <CardDescription>Loading...</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </CardContent>
                </Card>
                <Card className="space-y-4">
                    <CardHeader>
                        <CardTitle>Personal Details</CardTitle>
                        <CardDescription>Loading...</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </CardContent>
                </Card>
                <Card className="space-y-4">
                    <CardHeader>
                        <CardTitle>Permanent Address</CardTitle>
                        <CardDescription>Loading...</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </CardContent>
                </Card>
                <Card className="space-y-4">
                    <CardHeader>
                        <CardTitle>Temporary Address</CardTitle>
                        <CardDescription>Loading...</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </CardContent>
                </Card>
            </CardContent>
            <CardFooter>
                <Button className="w-full mt-4 cursor-pointer" disabled>
                    Submit
                </Button>
            </CardFooter>
        </Card>



    );
}


export const genderObj = {
    "MALE": "Male",
    "FEMALE": "Female",
    "OTHER": "Other"
}


export function FamilyAndAddressPage() {
    const familyAndAddress = useFamilyAndAddressStore((state) => state.familyAndAddress);
    return (
        <Card className="border-none">
            <CardHeader>
                <CardTitle>Family & Address Information</CardTitle>
                <CardDescription>Review Your Family & Address Information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Family Details</CardTitle>
                        <CardDescription>Father's and Mother's Name</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p >
                            <strong >Father's Name:</strong>
                            <span>{familyAndAddress?.family?.fatherName || "N/A"}</span>
                        </p>
                        <p >
                            <strong>Mother's Name:</strong>
                            <span>{familyAndAddress?.family?.motherName || "N/A"}</span>
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Details</CardTitle>
                        <CardDescription>Date of Birth, Gender</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p >
                            <strong>Date of Birth:</strong>
                            <span>
                                {familyAndAddress?.personalDetails.dateOfBirth
                                    ? format(new Date(familyAndAddress.personalDetails.dateOfBirth), "dd MMMM yyyy")
                                    : "N/A"}
                            </span>
                        </p>
                        <p >
                            <strong>Gender:</strong>
                            <span>
                                {familyAndAddress?.personalDetails.gender && genderObj[familyAndAddress.personalDetails.gender]
                                    ? genderObj[familyAndAddress.personalDetails.gender]
                                    : "N/A"}
                            </span>
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Permanent Address</CardTitle>
                        <CardDescription>Address Line, City, State, Pin Code</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p >
                            <strong >Address Line:</strong>
                            <span>{familyAndAddress?.permanentAddress.addressLine || "N/A"}</span>
                        </p>
                        <p>
                            <strong>City:</strong>
                            <span>{familyAndAddress?.permanentAddress.city || "N/A"}</span>
                        </p>
                        <p>
                            <strong >State:</strong>
                            <span>{familyAndAddress?.permanentAddress.state || "N/A"}</span>
                        </p>
                        <p>
                            <strong>Pin Code:</strong>
                            <span>{familyAndAddress?.permanentAddress.pinCode || "N/A"}</span>
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Correspondence Address</CardTitle>
                        <CardDescription>Address Line, City, State, Pin Code</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>
                            <span>Address Line:</span>
                            <span>{familyAndAddress?.correspondenceAddress.addressLine || "N/A"}</span>
                        </p>
                        <p>
                            <span>City:</span>
                            <span>{familyAndAddress?.correspondenceAddress.city || "N/A"}</span>
                        </p>
                        <p>
                            <span>State:</span>
                            <span>{familyAndAddress?.correspondenceAddress.state || "N/A"}</span>
                        </p>
                        <p>
                            <span>Pin Code:</span>
                            <span>{familyAndAddress?.correspondenceAddress.pinCode || "N/A"}</span>
                        </p>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}


