import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/form/contact";

export function ContactPage() {
    return (
            <Card className="border-none shadow-none">
                <CardContent className="space-y-4 text-base leading-relaxed">
                    <ContactForm />
                </CardContent>
                <Separator />
                <CardFooter className="flex flex-col justify-center items-center">
                    <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-primary" />
                        <a
                            href="mailto:Info@agricoopnic.org"
                            className="text-blue-600 hover:underline"
                        >
                            Info@agricoopnic.org
                        </a>
                    </div>
                </CardFooter>
            </Card>
    );
}
