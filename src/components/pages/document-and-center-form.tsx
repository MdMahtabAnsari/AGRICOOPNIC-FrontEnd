import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import type { DocumentAndCenterSchema } from "@/lib/schemas/pages/document-and-prefrence-schema";
import { useDocumentAndCenterStore } from "@/store/document-and-center-store";
import { documentAndCenterSchema } from "@/lib/schemas/pages/document-and-prefrence-schema";
import { CloudinaryUploadWidget } from "@/components/custom/cloudinary-widget";

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




import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";



import { useState, useEffect } from "react";

import { useFormStepStore } from "@/store/form-step-store.ts";

import { Skeleton } from "@/components/ui/skeleton";

import { preferenceObj } from "@/lib/helpers/type-object";
import type { ExamCenterNameEnum } from "@/lib/schemas/common.schema"


export function DocumentAndCenterForm() {
    const [loading, setLoading] = useState<boolean>(true);
    const documentAndCenter = useDocumentAndCenterStore((state) => state.documentAndCenter);
    const setDocumentAndCenter = useDocumentAndCenterStore((state) => state.setDocumentAndCenter);
    const setDisabled = useFormStepStore((state) => state.setDisabled);
    const disabled = useFormStepStore((state) => state.disabled);
    const [pref1, setPref1] = useState<ExamCenterNameEnum | undefined>(undefined);
    const [pref2, setPref2] = useState<ExamCenterNameEnum | undefined>(undefined);
    const [pref3, setPref3] = useState<ExamCenterNameEnum | undefined>(undefined);

    const form = useForm<DocumentAndCenterSchema>({
        resolver: zodResolver(documentAndCenterSchema),
        defaultValues: {
            photo: { documentType: 'PHOTO', url: undefined },
            signature: { documentType: 'SIGNATURE', url: undefined },
            aadhaarFront: { documentType: 'AADHAAR_FRONT', url: undefined },
            aadhaarBack: { documentType: 'AADHAAR_BACK', url: undefined },
            preference1: { preferenceType: 'PREFERENCE_1', examCenterName: undefined },
            preference2: { preferenceType: 'PREFERENCE_2', examCenterName: undefined },
            preference3: { preferenceType: 'PREFERENCE_3', examCenterName: undefined }
        },
        mode: 'onChange',
    });



    const photoUrl = form.watch('photo.url');
    const signatureUrl = form.watch('signature.url');
    const aadhaarFrontUrl = form.watch('aadhaarFront.url');
    const aadhaarBackUrl = form.watch('aadhaarBack.url');
    const preference1Type = form.watch('preference1.preferenceType');
    const preference1Center = form.watch('preference1.examCenterName');
    const preference2Type = form.watch('preference2.preferenceType');
    const preference2Center = form.watch('preference2.examCenterName');
    const preference3Type = form.watch('preference3.preferenceType');
    const preference3Center = form.watch('preference3.examCenterName');



    useEffect(() => {
        if (loading) {
            return;
        }
        else if (!documentAndCenter || (
            documentAndCenter.photo.url !== photoUrl ||
            documentAndCenter.signature.url !== signatureUrl ||
            documentAndCenter.aadhaarFront.url !== aadhaarFrontUrl ||
            documentAndCenter.aadhaarBack.url !== aadhaarBackUrl ||
            documentAndCenter.preference1.preferenceType !== preference1Type ||
            documentAndCenter.preference1.examCenterName !== preference1Center ||
            documentAndCenter.preference2.preferenceType !== preference2Type ||
            documentAndCenter.preference2.examCenterName !== preference2Center ||
            documentAndCenter.preference3.preferenceType !== preference3Type ||
            documentAndCenter.preference3.examCenterName !== preference3Center
        )) {
            setDisabled(true);
        }
        else {
            setDisabled(false);
        }
    }, [loading, documentAndCenter, photoUrl, signatureUrl, aadhaarFrontUrl, aadhaarBackUrl, preference1Type, preference1Center, preference2Type, preference2Center, setDisabled, preference3Type, preference3Center]);

    // reset the form value with stored value
    useEffect(() => {
        setLoading(true);
        if (documentAndCenter) {
            form.reset(documentAndCenter);
        }

        setLoading(false);
    }, []);


    useEffect(() => {
        setPref1(preference1Center);
    }, [preference1Center]);

    useEffect(() => {
        setPref2(preference2Center);
    }, [preference2Center]);

    useEffect(() => {
        setPref3(preference3Center);
    }, [preference3Center]);

    const onSubmit = (data: DocumentAndCenterSchema) => {
        setDocumentAndCenter(data);
    };

    if (loading) {
        return <DocumentAndCenterFormSkeleton />;
    }

    return (
        <Card className="border-none">
            <CardHeader>
                <CardTitle>Document and Exam Center Preferences</CardTitle>
                <CardDescription>
                    Please upload your documents and select your exam center preferences.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 py-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Documents</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="photo.url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Photo</FormLabel>
                                            <FormControl>
                                                <CloudinaryUploadWidget
                                                    onUpload={(info) => {
                                                        field.onChange(info.secure_url);
                                                    }}
                                                    buttonText="Upload Photo"
                                                    disabled={false}
                                                    className="mt-2 cursor-pointer"
                                                    maxFileSize={2 * 1024 * 1024}
                                                    allowedFormats={["png", "jpg", "jpeg"]}
                                                    folder="photos"
                                                    multiple={false}
                                                    showAdvancedOptions={false}
                                                    cropping={false}
                                                    sources={["local"]}
                                                    publicId={`photo_${Date.now()}`}

                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {
                                    photoUrl &&
                                    (
                                        <img src={photoUrl} alt="Uploaded Photo" className="w-32 h-32 object-fit rounded-md" />
                                    )
                                }

                                <FormField
                                    control={form.control}
                                    name="signature.url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Signature</FormLabel>
                                            <FormControl>
                                                <CloudinaryUploadWidget
                                                    onUpload={(info) => {
                                                        field.onChange(info.secure_url);
                                                    }}
                                                    buttonText="Upload Signature"
                                                    disabled={false}
                                                    className="mt-2 cursor-pointer"
                                                    maxFileSize={2 * 1024 * 1024}
                                                    allowedFormats={["png", "jpg", "jpeg"]}
                                                    folder="signatures"
                                                    multiple={false}
                                                    showAdvancedOptions={false}
                                                    cropping={false}
                                                    sources={["local"]}
                                                    publicId={`signature_${Date.now()}`}

                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {
                                    signatureUrl &&
                                    (
                                        <img src={signatureUrl} alt="Uploaded Signature" className="w-32 h-32 object-fit rounded-md" />
                                    )
                                }
                                <FormField
                                    control={form.control}
                                    name="aadhaarFront.url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Aadhaar Front</FormLabel>
                                            <FormControl>
                                                <CloudinaryUploadWidget
                                                    onUpload={(info) => {
                                                        field.onChange(info.secure_url);
                                                    }}
                                                    buttonText="Upload Aadhaar Front"
                                                    disabled={false}
                                                    className="mt-2 cursor-pointer"
                                                    maxFileSize={2 * 1024 * 1024}
                                                    allowedFormats={["png", "jpg", "jpeg"]}
                                                    folder="aadhaar_front"
                                                    multiple={false}
                                                    showAdvancedOptions={false}
                                                    cropping={false}
                                                    sources={["local"]}
                                                    publicId={`aadhaar_front_${Date.now()}`}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {
                                    aadhaarFrontUrl &&
                                    (
                                        <img src={aadhaarFrontUrl} alt="Uploaded Aadhaar Front" className="w-32 h-32 object-fit rounded-md" />
                                    )
                                }
                                <FormField
                                    control={form.control}
                                    name="aadhaarBack.url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Aadhaar Back</FormLabel>
                                            <FormControl>
                                                <CloudinaryUploadWidget
                                                    onUpload={(info) => {
                                                        field.onChange(info.secure_url);
                                                    }}
                                                    buttonText="Upload Aadhaar Back"
                                                    disabled={false}
                                                    className="mt-2 cursor-pointer"
                                                    maxFileSize={2 * 1024 * 1024}
                                                    allowedFormats={["png", "jpg", "jpeg"]}
                                                    folder="aadhaar_back"
                                                    multiple={false}
                                                    showAdvancedOptions={false}
                                                    cropping={false}
                                                    sources={["local"]}
                                                    publicId={`aadhaar_back_${Date.now()}`}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {
                                    aadhaarBackUrl &&
                                    (
                                        <img src={aadhaarBackUrl} alt="Uploaded Aadhaar Back" className="w-32 h-32 object-fit rounded-md" />
                                    )
                                }
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Exam Center Preferences</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="preference1.examCenterName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Choice</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Exam Center" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(preferenceObj).map(([key, value]) =>
                                                            (key !== pref2 && key !== pref3) ? (
                                                                <SelectItem key={key} value={key}>
                                                                    {value}
                                                                </SelectItem>
                                                            ) : null
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="preference2.examCenterName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Second Choice</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Exam Center" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(preferenceObj).map(([key, value]) =>
                                                            (key !== pref1 && key !== pref3) ? (
                                                                <SelectItem key={key} value={key}>
                                                                    {value}
                                                                </SelectItem>
                                                            ) : null
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="preference3.examCenterName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Third Choice</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Exam Center" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(preferenceObj).map(([key, value]) =>
                                                            (key !== pref2 && key !== pref1) ? (
                                                                <SelectItem key={key} value={key}>
                                                                    {value}
                                                                </SelectItem>
                                                            ) : null
                                                        )}
                                                    </SelectContent>
                                                </Select>
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


export function DocumentAndCenterFormSkeleton() {
    return (
        <Card className="border-none">
            <CardHeader>
                <CardTitle>Document and Exam Center Preferences</CardTitle>
                <CardDescription>
                    Loading...
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Card>
                    <CardHeader>
                        <CardTitle>Documents</CardTitle>
                        <CardDescription>
                            Upload your documents below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-10 w-full mb-4" />
                        <Skeleton className="h-10 w-full mb-4" />
                        <Skeleton className="h-10 w-full mb-4" />
                        <Skeleton className="h-10 w-full mb-4" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Exam Center Preferences</CardTitle>
                        <CardDescription>
                            Select your preferred exam centers.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-10 w-full mb-4" />
                        <Skeleton className="h-10 w-full mb-4" />
                    </CardContent>
                </Card>
                <Button className="w-full mt-4 cursor-pointer" disabled>
                    Submit
                </Button>
            </CardContent>
        </Card>
    );
}





export function DocumentAndCenterPage() {
    const documentAndCenter = useDocumentAndCenterStore((state) => state.documentAndCenter);
    return (
        <Card className="border-none">
            <CardHeader>
                <CardTitle>Document and Exam Center Preferences</CardTitle>
                <CardDescription>
                    Please review your uploaded documents and exam center preferences.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Documents</CardTitle>
                        <CardDescription>
                            Your uploaded documents are displayed below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="w-full flex flex-wrap justify-between items-center gap-4">
                        <div>
                            <strong>Photo:</strong>
                            {documentAndCenter?.photo?.url && (
                                <img
                                    src={
                                        documentAndCenter.photo.url
                                    }
                                    alt="Uploaded Photo"
                                    className="w-32 h-32 object-fit rounded-md"
                                />
                            )}
                        </div>
                        <div>
                            <strong>Signature:</strong>
                            {documentAndCenter?.signature?.url && (
                                <img src={
                                    documentAndCenter.signature.url
                                } alt="Uploaded Signature" className="w-32 h-32 object-fit rounded-md" />
                            )}
                        </div>
                        <div>
                            <strong>Aadhaar Front:</strong>
                            {documentAndCenter?.aadhaarFront?.url && (
                                <img src={
                                    documentAndCenter.aadhaarFront.url
                                } alt="Uploaded Aadhaar Front" className="w-32 h-32 object-fit rounded-md" />
                            )}
                        </div>
                        <div>
                            <strong>Aadhaar Back:</strong>
                            {documentAndCenter?.aadhaarBack?.url && (
                                <img src={
                                    documentAndCenter.aadhaarBack.url
                                } alt="Uploaded Aadhaar Back" className="w-32 h-32 object-fit rounded-md" />
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Exam Center Preferences</CardTitle>
                        <CardDescription>
                            Your selected exam center preferences are displayed below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {documentAndCenter?.preference1 && (
                            <div>
                                <strong>First Choice:</strong> {preferenceObj[documentAndCenter.preference1.examCenterName as keyof typeof preferenceObj] || 'Not Selected'}
                            </div>
                        )}
                        {documentAndCenter?.preference2 && (
                            <div>
                                <strong>Second Choice:</strong> {preferenceObj[documentAndCenter.preference2.examCenterName as keyof typeof preferenceObj] || 'Not Selected'}
                            </div>
                        )}
                        {documentAndCenter?.preference3 && (
                            <div>
                                <strong>Third Choice:</strong> {preferenceObj[documentAndCenter.preference3.examCenterName as keyof typeof preferenceObj] || 'Not Selected'}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
