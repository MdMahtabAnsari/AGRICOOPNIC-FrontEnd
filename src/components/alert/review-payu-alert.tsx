import { AlertDialogComponent } from "@/components/alert-dialog";

interface ReviewPayUAlertProps {
    email: string;
    phone: string;
    isOpen: boolean;
    action: () => void;
}

export function ReviewPayUAlert({
    email,
    phone,
    isOpen,
    action,
}: ReviewPayUAlertProps) {
    return (
        <AlertDialogComponent
            isOpen={isOpen}
            action={action}
            title="Review PayU Payment Details"
            description={
                <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <p>
                        Please review your PayU payment details. These must exactly match your registered candidate information:
                    </p>
                    <p>
                        <span className="font-medium">Email –</span> {email}
                    </p>
                    <p>
                        <span className="font-medium">Phone Number –</span> {phone}
                    </p>
                    <p className="text-yellow-700 dark:text-yellow-300 font-medium flex items-start gap-1">
                        ⚠️ If the email or phone number entered in PayU does not match the above, your payment may not be verified or linked to your candidate account.
                    </p>
                </div>
            }
        />
    );
}
