import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ResourceNotFound({ message = "Resource not found", actionLabel = "Go Home", actionPath = "/" }) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="max-w-md w-full text-center p-6">
                <CardHeader>
                    <div className="flex flex-col items-center gap-2">
                        <AlertTriangle className="h-12 w-12 text-yellow-500 mb-2" />
                        <h2 className="text-2xl font-bold">404</h2>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="mb-4 text-muted-foreground">{message}</p>
                    <Button className="cursor-pointer" onClick={() => navigate(actionPath)}>{actionLabel}</Button>
                </CardContent>
            </Card>
        </div>
    );
}