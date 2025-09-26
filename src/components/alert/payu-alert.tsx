import { AlertDialogComponent } from "@/components/alert-dialog";


interface PayUAlertProps {
    isOpen: boolean;
    action: () => void;
}

export function PayUAlert({ isOpen, action }: PayUAlertProps) {
    return (
        <AlertDialogComponent
            isOpen={isOpen}
            action={action}
            title="PayU Payment Instruction"
            description={
                <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <p>
                        To ensure successful payment verification, please make sure that the
                        details provided match exactly with the PayU payment details:
                    </p>
                    <p>
                        <span className="font-medium">Email –</span> The candidate’s registered
                        email address must be the same as the customer email used in PayU.
                    </p>
                    <p>
                        <span className="font-medium">Phone Number –</span> The candidate’s
                        registered phone number must be the same as the customer phone number
                        used in PayU.
                    </p>
                    <p className="text-yellow-700 dark:text-yellow-300 font-medium flex items-start gap-1">
                        ⚠️ If the email or phone number does not match, the payment may not be
                        verified or linked to the candidate’s account.
                    </p>
                </div>
            }
        />
    );
}