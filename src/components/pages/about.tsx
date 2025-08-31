import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function AboutPage() {
    return (
        <div className="max-w-2xl mx-auto my-8 p-4">
            <Card className="border-none shadow-none">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary mb-2">About Us</CardTitle>
                    <Separator />
                </CardHeader>
                <CardContent className="space-y-4 text-base leading-relaxed">
                    <p>
                        <strong>
                            Welcome to{" "}
                            <a
                                href="https://agricoopnic.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Agricoopnic.org
                            </a>
                        </strong>, a consultancy and hiring platform managed under{" "}
                        <strong>Vinod Manpower Service</strong> by Mr. Vinod Kumar Tiwari.
                    </p>
                    <p>
                        We specialize in manpower consultancy and recruitment, helping businesses hire skilled candidates through a fair process of applications, assessments, and selection. Our goal is to connect the right talent with the right opportunities while supporting companies with reliable staffing solutions.
                    </p>
                    <Separator />
                    <div>
                        <strong>Mission:</strong> To provide transparent and efficient hiring services.
                    </div>
                    <div>
                        <strong>Vision:</strong> To be a trusted name in consultancy and manpower services across India.
                    </div>
                    <Separator />
                    <div>
                        <strong>Business Name:</strong> Vinod Manpower Service (Proprietorship)
                    </div>
                    <div>
                        <strong>Founder:</strong> Vinod Kumar Tiwari
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}