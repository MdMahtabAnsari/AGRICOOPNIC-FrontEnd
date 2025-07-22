import { Card, CardHeader, CardDescription, CardContent, CardTitle} from "@/components/ui/card";
import type { EducationDetailsSchema } from "@/lib/schemas/pages/educationDetails.schema";
import { useEducationDetailsStore } from "@/store/education-details-store";
import { educationDetailsSchema } from "@/lib/schemas/pages/educationDetails.schema";

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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import { useState, useEffect} from "react";

import { useFormStepStore } from "@/store/form-step-store.ts";

import { Skeleton } from "@/components/ui/skeleton";


export function EducationDetailForm() {
    const [loading, setLoading] = useState<boolean>(true);
    const educationDetails = useEducationDetailsStore((state) => state.educationDetails);
    const setEducationDetails = useEducationDetailsStore((state) => state.setEducationDetails);
    const setDisabled = useFormStepStore((state) => state.setDisabled);
    const disabled = useFormStepStore((state) => state.disabled)

    const form = useForm<EducationDetailsSchema>({
        resolver: zodResolver(educationDetailsSchema),
        defaultValues: {
            _10th: {
                qualification: "MATRICULATION",
                institution: "",
                boardOrUniversity: "",
                marksType: undefined,
                yearOfPassing: undefined,
                marks: undefined,
                subjectOrSpecialization: undefined,
            },
            _12th: {
                qualification: "INTERMEDIATE_OR_DIPLOMA",
                institution: "",
                boardOrUniversity: "",
                marksType: undefined,
                yearOfPassing: undefined,
                marks: undefined,
                subjectOrSpecialization: undefined,
            },
            graduation: {
                qualification: "GRADUATION",
                institution: "",
                boardOrUniversity: "",
                marksType: undefined,
                yearOfPassing: undefined,
                marks: undefined,
                subjectOrSpecialization: undefined,
            }
        },
        mode: "onChange",

    });

    const watchedValues = form.watch([
        "_10th.institution",
        "_10th.boardOrUniversity",
        "_10th.marksType",
        "_10th.yearOfPassing",
        "_10th.marks",
        "_10th.subjectOrSpecialization",
        "_12th.institution",
        "_12th.boardOrUniversity",
        "_12th.marksType",
        "_12th.yearOfPassing",
        "_12th.marks",
        "_12th.subjectOrSpecialization",
        "graduation.institution",
        "graduation.boardOrUniversity",
        "graduation.marksType",
        "graduation.yearOfPassing",
        "graduation.marks",
        "graduation.subjectOrSpecialization",

    ]);

    const [institution10th, boardOrUniversity10th, marksType10th, yearOfPassing10th, marks10th, subjectOrSpecialization10th,
        institution12th, boardOrUniversity12th, marksType12th, yearOfPassing12th, marks12th, subjectOrSpecialization12th,
        institutionGraduation, boardOrUniversityGraduation, marksTypeGraduation, yearOfPassingGraduation, marksGraduation, subjectOrSpecializationGraduation] = watchedValues;

        // Check if the form value is changed from stored value in educationDetails
        useEffect(() => {
            if(loading){
                return;
            }
            else if(!educationDetails ||(
                educationDetails._10th.institution !== institution10th ||
                educationDetails._10th.boardOrUniversity !== boardOrUniversity10th ||
                educationDetails._10th.marksType !== marksType10th ||
                educationDetails._10th.yearOfPassing !== yearOfPassing10th ||
                educationDetails._10th.marks !== marks10th ||
                educationDetails._10th.subjectOrSpecialization !== subjectOrSpecialization10th ||
                educationDetails._12th.institution !== institution12th ||
                educationDetails._12th.boardOrUniversity !== boardOrUniversity12th ||
                educationDetails._12th.marksType !== marksType12th ||
                educationDetails._12th.yearOfPassing !== yearOfPassing12th ||
                educationDetails._12th.marks !== marks12th ||
                educationDetails._12th.subjectOrSpecialization !== subjectOrSpecialization12th ||
                educationDetails.graduation.institution !== institutionGraduation ||
                educationDetails.graduation.boardOrUniversity !== boardOrUniversityGraduation ||
                educationDetails.graduation.marksType !== marksTypeGraduation ||
                educationDetails.graduation.yearOfPassing !== yearOfPassingGraduation ||
                educationDetails.graduation.marks !== marksGraduation ||
                educationDetails.graduation.subjectOrSpecialization !== subjectOrSpecializationGraduation
            )) {
                setDisabled(true)
            }
            else{
                setDisabled(false);
            }
        }, [boardOrUniversity10th, boardOrUniversity12th, boardOrUniversityGraduation, educationDetails, institution10th, institution12th, institutionGraduation, loading, marks10th, marks12th, marksGraduation, marksType10th, marksType12th, marksTypeGraduation, setDisabled, subjectOrSpecialization10th, subjectOrSpecialization12th, subjectOrSpecializationGraduation, watchedValues, yearOfPassing10th, yearOfPassing12th, yearOfPassingGraduation]);

        // reseet form state by the previous value
        useEffect(() => {
            setLoading(true);
            if(educationDetails) {
                form.reset(educationDetails);
            }
            setLoading(false);
        }, []);

        if(loading) {
            return <EducationDetailFormSkeleton />;
        }

    const onSubmit = (data: EducationDetailsSchema) => {
        setEducationDetails(data);
    };

    return (
        <Card className="border-none">
            <CardHeader>
                <CardTitle>Education Details</CardTitle>
                <CardDescription>Fill in your education details</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 py-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>10th Details</CardTitle>
                                <CardDescription>Details of your 10th grade education</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">

                                <FormField
                                    control={form.control}
                                    name="_10th.institution"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>School</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your school" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="_10th.boardOrUniversity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Board</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your board" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="_10th.marksType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Marks Type</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select marks type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                                                        <SelectItem value="CGPA">CGPA</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="_10th.marks"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Marks</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter marks" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="_10th.yearOfPassing"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Year of Passing</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter year of passing" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>12th Details</CardTitle>
                                <CardDescription>Details of your 12th grade education</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="_12th.institution"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>School</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your school" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="_12th.boardOrUniversity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Board</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your board" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="_12th.marksType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Marks Type</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select marks type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                                                        <SelectItem value="CGPA">CGPA</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="_12th.marks"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Marks</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter marks" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="_12th.subjectOrSpecialization"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Stream</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter stream (e.g. Science, Arts, Commerce)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="_12th.yearOfPassing"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Year of Passing</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter year of passing" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Graduation Details</CardTitle>
                                <CardDescription>Details of your graduation education</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="graduation.institution"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>College</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your College" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="graduation.boardOrUniversity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>University</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your University" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="graduation.marksType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Marks Type</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select marks type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                                                        <SelectItem value="CGPA">CGPA</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="graduation.marks"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Marks</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter marks" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="graduation.subjectOrSpecialization"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Major/Specialization</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Major/Specialization (e.g. B.A,B.Com, BBA,B.Sc)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="graduation.yearOfPassing"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Year of Passing</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter year of passing" {...field} />
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




export function EducationDetailFormSkeleton() {
    return (
        <Card className="border-none">
            <CardHeader>
                <CardTitle>Education Details</CardTitle>
                <CardDescription>Loading...</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>10th Details</CardTitle>
                        <CardDescription>Details of your 10th grade education</CardDescription>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-6 w-1/3" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardContent>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>12th Details</CardTitle>
                        <CardDescription>Details of your 12th grade education</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Graduation Details</CardTitle>
                        <CardDescription>Details of your graduation education</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}


export const marksTypeObj = {
    "PERCENTAGE": "Percentage",
    "CGPA": "CGPA"
}


export function EducationDetailsPage(){
    const educationDetails = useEducationDetailsStore((state) => state.educationDetails);
    return (
        <Card className="border-none">
            <CardHeader>
                <CardTitle>Education Details</CardTitle>
                <CardDescription>Review your education details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>10th Details</CardTitle>
                        <CardDescription>Details of your 10th grade education</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p><strong>School:</strong> {educationDetails?._10th?.institution || "N/A"}</p>
                        <p><strong>Board:</strong> {educationDetails?._10th?.boardOrUniversity || "N/A"}</p>
                        <p><strong>Marks Type:</strong> {educationDetails?._10th?.marksType && marksTypeObj[educationDetails._10th.marksType] ? marksTypeObj[educationDetails._10th.marksType] : "N/A"}</p>
                        <p><strong>Year of Passing:</strong> {educationDetails?._10th?.yearOfPassing || "N/A"}</p>
                        <p><strong>Marks:</strong> {educationDetails?._10th?.marks || "N/A"}</p>
                        <p><strong>Subject/Specialization:</strong> {educationDetails?._10th?.subjectOrSpecialization || "N/A"}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>12th Details</CardTitle>
                        <CardDescription>Details of your 12th grade education</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p><strong>School:</strong> {educationDetails?._12th?.institution || "N/A"}</p>
                        <p><strong>Board:</strong> {educationDetails?._12th?.boardOrUniversity || "N/A"}</p>
                        <p><strong>Marks Type:</strong> {educationDetails?._12th?.marksType && marksTypeObj[educationDetails._12th.marksType] ? marksTypeObj[educationDetails._12th.marksType] : "N/A"}</p>
                        <p><strong>Year of Passing:</strong> {educationDetails?._12th?.yearOfPassing || "N/A"}</p>
                        <p><strong>Marks:</strong> {educationDetails?._12th?.marks || "N/A"}</p>
                        <p><strong>Stream:</strong> {educationDetails?._12th?.subjectOrSpecialization || "N/A"}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Graduation Details</CardTitle>
                        <CardDescription>Details of your graduation education</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p><strong>College:</strong> {educationDetails?.graduation?.institution || "N/A"}</p>
                        <p><strong>University:</strong> {educationDetails?.graduation?.boardOrUniversity || "N/A"}</p>
                        <p><strong>Marks Type:</strong> {educationDetails?.graduation?.marksType && marksTypeObj[educationDetails.graduation.marksType] ? marksTypeObj[educationDetails.graduation.marksType] : "N/A"}</p>
                        <p><strong>Year of Passing:</strong> {educationDetails?.graduation?.yearOfPassing || "N/A"}</p>
                        <p><strong>Marks:</strong> {educationDetails?.graduation?.marks || "N/A"}</p>
                        <p><strong>Major/Specialization:</strong> {educationDetails?.graduation?.subjectOrSpecialization || "N/A"}</p>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
}