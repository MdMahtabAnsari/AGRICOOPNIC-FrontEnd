import { Card, CardHeader, CardDescription, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCallback, useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { authSchema,userIdSchema } from "@/lib/schemas/auth.shema";
import type{ AuthSchema } from "@/lib/schemas/auth.shema";
import { signup, checkUserIdAvailability } from "@/lib/api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";


export const SignupForm = () => {

    const form = useForm<AuthSchema>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            userId: "",
            password: ""
        },
        mode: "onChange"
    });

    const [debouncedUserId, setDebouncedUserId] = useState<string>("");
    const debouncedUserIdCheck = useDebounceCallback(setDebouncedUserId, 500);
    const [isUserIdExists, setIsUserIdExists] = useState<boolean>(false);
    const navigate = useNavigate();

    const userId = form.watch("userId");


    useEffect(() => {
        if (userId) {
            debouncedUserIdCheck(userId);
        }
    }, [userId, debouncedUserIdCheck]);


    useEffect(() => {
        if (debouncedUserId) {
            isUserIdAvailabe(debouncedUserId);
        }
    }, [debouncedUserId]);


    const isUserIdAvailabe = useCallback(async (userId: string) => {
        if(!userIdSchema.safeParse(userId).success) {
            return;
        }
        setIsUserIdExists(false);
        const response = await checkUserIdAvailability(userId);
        if(response.status === 'success'){
            if(response.data){
                setIsUserIdExists(true);
                form.setError("userId", { type: "manual", message: "User ID already exists" });
                toast.error("User ID already exists");
            }
            else {
                setIsUserIdExists(false);
                toast.success("User ID is available");
            }

        }
        else{
            toast.error("Failed to check User ID availability");
            setIsUserIdExists(false);
        }

    }, [form]);

    const handleSubmit = async (data: AuthSchema) => {
        const response = await signup(data);
        if(response.status === 'success'){
            toast.success("Signup successful");
            navigate("/signin");
        }
        else{
            toast.error(response.message || "Signup failed");
        }
    }

    return(
        <Card className="w-full h-full border-none">
            <CardContent className="flex items-center justify-center h-full">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Create your account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-4 py-3">
                                <FormField
                                    control={form.control}
                                    name="userId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>User ID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your user ID" {...field} />
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

                                <Button type="submit" className="w-full mt-4 cursor-pointer" disabled={isUserIdExists||form.formState.isSubmitting||form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? <Loader className="animate-spin h-4 w-4" /> : "Sign Up"}
                                    </Button>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="link" onClick={() => navigate("/signin")} className="cursor-pointer">Already have an account? Sign In</Button>
                    </CardFooter>
                </Card>

            </CardContent>
        </Card>
    )

}
