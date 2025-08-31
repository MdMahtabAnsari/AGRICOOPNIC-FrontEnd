// ApplicationDetails.tsx
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ApplicationPDF } from '@/components/pdf/application-pdf';
import type{ ApplicationSchema } from '@/lib/schemas/application.schema';
import { Button } from '@/components/ui/button';




export function ApplicationDownloadButton({ data }: { data: ApplicationSchema }) {
    return (
        <div className="max-w-4xl mx-auto my-8 p-4">
            {/* Old UI here ... */}
            <PDFDownloadLink
                document={<ApplicationPDF data={data} />}
                fileName={`${data.name}_Application.pdf`}
            >
                {({ loading }) =>
                    loading ? <Button className="cursor-not-allowed" disabled>Preparing document...</Button> : (
                        <Button className="cursor-pointer">
                            Download PDF
                        </Button>
                    )
                }
            </PDFDownloadLink>
        </div>
    );
}
