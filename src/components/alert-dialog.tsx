import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { ReactNode } from "react"

interface AlertDialogProps {
    title: string;
    description: ReactNode;
    isOpen: boolean;
    action: () => void; // Called on open/close

}

export function AlertDialogComponent({ title, description, isOpen, action }: AlertDialogProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => !open && action()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}