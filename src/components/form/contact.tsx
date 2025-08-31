import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react";
import { contactSchema } from "@/lib/schemas/contact.schema";
import type { ContactSchema } from "@/lib/schemas/contact.schema";
import { Separator } from "@/components/ui/separator";
import { sendContactMessage } from "@/lib/api/contact";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";


export function ContactForm() {
    const form = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
        mode: "onChange"
    });

    const handleSubmit = async (data: ContactSchema) => {
        const response = await sendContactMessage(data);
        if (response.status === "success") {
            toast.success("Message sent successfully!");
        } else {
            toast.error(response.message || "Failed to send message. Please try again later.");
        }
    };

    return (
        <div className="max-w-md mx-auto my-8 p-4">
            <Card className="border-none shadow-none">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold ">
                        Contact Us
                    </CardTitle>
                    <CardDescription>We would love to hear from you! Please fill out the form below to get in touch.</CardDescription>
                    <Separator />
                </CardHeader>
                <CardContent className="space-y-4 text-base leading-relaxed">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
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
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter your message" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full cursor-pointer" disabled={form.formState.isSubmitting || !form.formState.isValid}>
                                {form.formState.isSubmitting ? <Loader className="animate-spin h-4 w-4" /> : "Submit"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}