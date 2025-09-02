import { Card, CardHeader, CardDescription, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCallback } from "react";
import { signInSchema } from "@/lib/schemas/auth.shema";
import type { SignInSchema } from "@/lib/schemas/auth.shema";
import { signIn } from "@/lib/api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { isUserLoggedIn } from "@/lib/api/auth"
import { useEffect } from "react";
import { Link } from "react-router-dom";


export const SignInForm = () => {

    const form = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: "",
            password: ""
        },
        mode: "onChange"
    });

    const navigate = useNavigate();

    const handleSubmit = useCallback(async (data: SignInSchema) => {
        const response = await signIn(data);
        if (response.status === 'success') {
            toast.success("Sign In successful");
            navigate("/");
        } else {
            toast.error(response.message || "Sign In failed");
        }
    }, [navigate]);

    const checkUserLoggedIn = useCallback(async () => {
        const response = await isUserLoggedIn();
        if (response.status === "success") {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        checkUserLoggedIn();
    }, [checkUserLoggedIn]);

    return (
        <Card className="w-full h-full border-none">
            <CardContent className="flex items-center justify-center h-full">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Sign In</CardTitle>
                        <CardDescription>Sign in to your account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-4 py-3">
                                <FormField
                                    control={form.control}
                                    name="identifier"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>UserId/Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your userId/email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full mt-4 cursor-pointer" disabled={form.formState.isSubmitting || form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? <Loader className="animate-spin h-4 w-4" /> : "Sign In"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center justify-center">

                        <Link to="/signup">
                            <Button variant="link" className="cursor-pointer">
                                Don't have an account? Sign Up
                            </Button>
                        </Link>
                        <Link to='/forgot-password'>
                            <Button variant="link" className="cursor-pointer">
                                Forgot Password?
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

            </CardContent>
        </Card>
    )
}