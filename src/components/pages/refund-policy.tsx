import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";

export function RefundPolicyPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <Card className="border-none shadow-none">
                <CardContent>
                    <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Overview</h2>
                        <p>
                            At <a
                                href="https://agricoopnic.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Agricoopnic.org
                            </a>, we strive to provide the best services to our customers. If you are not satisfied with your purchase, we are here to help.
                        </p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Refunds</h2>
                        <p>
                            Refund requests must be made within 7 days of purchase. To be eligible, your request must include proof of payment. Approved refunds will be processed to your original payment method within 7–10 business days.
                        </p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Exceptions</h2>
                        <p>
                            Certain services or digital products may not be eligible for a refund once delivered. In such cases, this will be clearly mentioned at the time of purchase.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                        <p>
                            If you have any questions regarding our refund policy, please contact us at:
                            <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-primary" />
                                <a
                                    href="tel:+918981838997"
                                    className="text-blue-600 hover:underline"
                                >
                                    +91-8981838997
                                </a>
                            </div>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
