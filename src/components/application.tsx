import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ApplicationSchema } from "@/lib/schemas/application.schema";
import { Button } from "@/components/ui/button";
import { jobPostObj, genderObj, marksTypeObj, preferenceObj, preferenceRankObj, qualificationObj, paymentStatusObj, addressTypeObj } from '@/lib/helpers/type-object';
import { Skeleton } from "@/components/ui/skeleton";
import { ApplicationDownloadButton } from "@/components/pdf/application-download-button";
interface Props {
    data: ApplicationSchema;
}

export function ApplicationDetails({ data }: Props) {
    const printRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        documentTitle: `${data.name}_Application`,
        contentRef: printRef,
        pageStyle: "@page { size: A4;  margin: 5mm; }"
    });

    return (
        <div className="max-w-4xl mx-auto my-8 p-4">
            <Card className="shadow border bg-white dark:bg-slate-900">
                <div ref={printRef}>
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-2xl font-bold">Application Details</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Application No: <span className="font-semibold">{data.jobPost.applicationNo}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Post: <span className="font-semibold">{jobPostObj[data.jobPost.name]}</span>
                        </p>


                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Personal Details */}
                        <Section title="Personal Details">
                            <Grid>
                                <Field label="Name" value={data.name} />
                                <Field label="Email" value={data.email} />
                                <Field label="Phone" value={data.phone} />
                                <Field label="Aadhaar" value={data.aadhaar} />
                                <Field label="Gender" value={genderObj[data.personalDetail.gender]} />
                                <Field label="Date of Birth" value={new Date(data.personalDetail.dateOfBirth).toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        formatMatcher: 'best fit'
                                    }
                                )} />
                                <Field label="Nationality" value={data.personalDetail.nationality} />

                            </Grid>
                        </Section>

                        <Section title="Address">
                            <Grid>
                                {data.address.map(addr => (
                                    <div key={addr.id} className="border rounded-md p-3 space-y-1">
                                        <Badge variant="outline">{addressTypeObj[addr.addressType]}</Badge>
                                        <Field label="Address" value={addr.addressLine} />
                                        <Field label="City" value={addr.city} />
                                        <Field label="State" value={addr.state} />
                                        <Field label="Pin Code" value={addr.pinCode} />
                                    </div>
                                ))}
                            </Grid>
                        </Section>

                        <Section title="Education">
                            <Grid>
                                {data.education.map(edu => (
                                    <div key={edu.id} className="border rounded-md p-3 space-y-1">
                                        <Badge variant="outline">{qualificationObj[edu.qualification]}</Badge>
                                        <Field label={edu.qualification === 'MATRICULATION' ? "School" : edu.qualification === 'INTERMEDIATE_OR_DIPLOMA' ? "School/College" : "College"} value={edu.institution} />
                                        <Field label={edu.qualification === 'MATRICULATION' ? "Board" : edu.qualification === 'INTERMEDIATE_OR_DIPLOMA' ? "Board/University" : "University"} value={edu.boardOrUniversity} />
                                        <Field label="Year of Passing" value={edu.yearOfPassing} />
                                        <Field label="Marks Type" value={marksTypeObj[edu.marksType]} />
                                        <Field label="Marks" value={edu.marks} />
                                        {edu.subjectOrSpecialization && (
                                            <Field label={edu.qualification === 'INTERMEDIATE_OR_DIPLOMA' ? "Stream" : "Specialization"} value={edu.subjectOrSpecialization} />
                                        )}
                                    </div>
                                ))}
                            </Grid>
                        </Section>

                        <Section title="Examination Preferences">
                            <div className="flex flex-wrap gap-2">
                                {data.examinationPreferences.sort((a, b) => a.preferenceType.localeCompare(b.preferenceType)).map(pref => (
                                    <Badge key={pref.id} variant="outline" className="px-3 py-1">
                                        {preferenceRankObj[pref.preferenceType]}: {preferenceObj[pref.examCenterName]}
                                    </Badge>
                                ))}
                            </div>
                        </Section>

                        <Section title="Family Details">
                            <Grid>
                                <Field label="Father's Name" value={data.family.fatherName} />
                                <Field label="Mother's Name" value={data.family.motherName} />
                            </Grid>
                        </Section>
                        <Section title="Payment Details">
                            <Grid>
                                <Field label="Amount" value={`₹${data.payment.amount}`} />
                                <Field label="Status" value={paymentStatusObj[data.payment.paymentStatus]} />
                                <Field label="Payment ID" value={data.payment.paymentId} />
                                <Field label="Order ID" value={data.payment.orderId} />
                                <Field label="Date & Time" value={data.payment.dateTime? new Date(data.payment.dateTime).toLocaleTimeString(
                                    "en-IN",
                                    {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        formatMatcher: 'best fit'
                                    }
                                ):new Date(data.payment.updatedAt).toLocaleTimeString(
                                    "en-IN",
                                    {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        formatMatcher: 'best fit'
                                    }
                                )} />
                            </Grid>
                        </Section>

                        <Section title="Submission">
                            <Field
                                label="Status"
                                value={data.formSubmitted.status ? "Submitted" : "Not Submitted"}
                            />
                            <Field
                                label="Date & Time"
                                value={new Date(data.formSubmitted.submissionDate).toLocaleTimeString(
                                    "en-IN",
                                    {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        formatMatcher: 'best fit'
                                    }
                                )}
                            />
                        </Section>
                        <Section title="Documents">
                            <div className="flex gap-6 flex-wrap justify-center mt-4">
                                <DocumentItem label="Photo" url={data.documents.find(doc => doc.documentType === "PHOTO")?.url || ""} />
                                <DocumentItem label="Signature" url={data.documents.find(doc => doc.documentType === "SIGNATURE")?.url || ""} />
                                <DocumentItem label="Aadhaar (Front)" url={data.documents.find(doc => doc.documentType === "AADHAAR_FRONT")?.url || ""} />
                                <DocumentItem label="Aadhaar (Back)" url={data.documents.find(doc => doc.documentType === "AADHAAR_BACK")?.url || ""} />
                            </div>
                        </Section>
                    </CardContent>
                </div>

                <CardFooter className="flex justify-end">
                    <div className="flex justify-center items-center" >
                        <Button className="cursor-pointer" onClick={handlePrint}>Print Application</Button>
                        <ApplicationDownloadButton data={data} />
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

/* ---------- Small Reusable Components ---------- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="space-y-3">
            <h2 className="font-semibold text-lg">{title}</h2>
            <Separator />
            {children}
        </section>
    );
}

function Grid({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div>
            <span className="font-medium">{label}:</span> <span>{value}</span>
        </div>
    );
}


export function ApplicationDetailsSkeleton() {
    return (
        <div className="max-w-4xl mx-auto my-8 p-4">
            <Card className="shadow border bg-white dark:bg-slate-900">
                <CardHeader className="text-center space-y-2">
                    <CardTitle>
                        <Skeleton className="h-7 w-48 mx-auto" />
                    </CardTitle>
                    <Skeleton className="h-5 w-32 mx-auto" />
                    <Skeleton className="h-4 w-40 mx-auto" />
                    <Separator className="my-3" />
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Section: Personal Details */}
                    <SectionSkeleton fields={7} />

                    {/* Section: Address */}
                    <SectionSkeleton fields={4} items={2} />

                    {/* Section: Education */}
                    <SectionSkeleton fields={5} items={2} />

                    {/* Section: Examination Preferences */}
                    <section className="space-y-3">
                        <Skeleton className="h-6 w-40" />
                        <Separator />
                        <div className="flex flex-wrap gap-2">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-6 w-28" />
                            ))}
                        </div>
                    </section>

                    {/* Section: Family Details */}
                    <SectionSkeleton fields={2} />

                    {/* Section: Payment Details */}
                    <SectionSkeleton fields={4} />

                    {/* Section: Submission */}
                    <section className="space-y-3">
                        <Skeleton className="h-6 w-40" />
                        <Separator />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-32" />
                    </section>
                    {/* Documents Section */}
                    <section className="space-y-3">
                        <div className="flex gap-4 flex-wrap justify-center">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="h-28 w-28 rounded border" />
                            ))}
                        </div>
                    </section>
                </CardContent>

                <CardFooter className="flex justify-end">
                    <Button disabled>
                        <Skeleton className="h-8 w-36" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

/* ---------- Reusable Skeleton Section ---------- */
function SectionSkeleton({ fields, items = 1 }: { fields: number; items?: number }) {
    return (
        <section className="space-y-3">
            <Skeleton className="h-6 w-40" />
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(items)].map((_, i) => (
                    <div key={i} className="space-y-2 border rounded-md p-3">
                        {[...Array(fields)].map((_, j) => (
                            <Skeleton key={j} className="h-4 w-full" />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}



function DocumentItem({ label, url }: { label: string; url: string }) {
    return (
        <div className="flex flex-col items-center space-y-2 border rounded-md p-2 w-28 cursor-pointer" onClick={() => window.open(url, "_blank")}>
            <img
                src={url}
                alt={label}
                className="w-24 h-24 object-cover border"
            />
            <span className="text-xs font-medium">{label}</span>
        </div>
    );
}