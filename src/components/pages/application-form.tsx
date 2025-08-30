import { Stepper } from "@/components//custom/stepper"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import { BasicInformationForm, BasicInformationPageSkeleton } from "@/components/pages/basic-information"
import { Progress } from "@/components/ui/progress"
import { useFormStepStore } from "@/store/form-step-store"
import { FamilyAddressForm, FamilyAddressFormSkeleton } from "@/components/pages/family-address-form"
import { EducationDetailForm, EducationDetailFormSkeleton } from "@/components/pages/education-detail-form"
import { DocumentAndCenterForm, DocumentAndCenterFormSkeleton } from "@/components/pages/document-and-center-form"
import { Suspense } from "react"
import { ReviewPage, ReviewPageSkeleton } from "@/components/pages/review-page"
import { getFormStatus } from "@/lib/api/formSubmit"
import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Skeleton } from "../ui/skeleton"

import { isUserLoggedIn } from "@/lib/api/auth"

const steps = [
  { title: "Basic Information" },
  { title: "Family & Address" },
  { title: "Education Details" },
  { title: "File Upload" },
  { title: "Review" },
]

export function ApplicationFormPage() {

  const step = useFormStepStore((state) => state.step)
  const inCrementStep = useFormStepStore((state) => state.incrementStep)
  const deCrementStep = useFormStepStore((state) => state.decrementStep)
  const disabled = useFormStepStore((state) => state.disabled)
  const prevDisabled = useFormStepStore((state) => state.prevDisabled)
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFormStatus = useCallback(async () => {
    setLoading(true);
    const response = await getFormStatus();
    if (response.status === "success") {
      if (response.data.status) {
        toast.success("Form already submitted successfully!");
        navigate("/");
      }
    }
    setLoading(false);
  }, [navigate]);

  const checkUserLoggedIn = useCallback(async () => {
    const response = await isUserLoggedIn();
    if (response.status === "success") {
      console.log("User is logged in");
    } else {
      toast.error(response.message || "You need to be logged in to access this page");
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    checkUserLoggedIn();
  }, [checkUserLoggedIn]);

  useEffect(() => {
    fetchFormStatus();
  }, [fetchFormStatus]);

  if (loading) {
    return <ApplicationFormPageSkeleton />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-2 sm:p-4 scroll-auto overflow-auto">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>Application Form</CardTitle>
          <CardDescription>Step {step} of {steps.length}</CardDescription>
          <CardContent className="flex flex-col items-center gap-3">
            <Stepper steps={steps} currentStep={step - 1} />
            <Progress value={step / steps.length * 100} />
          </CardContent>
        </CardHeader>

        <CardContent className="w-full p-2 sm:p-6">
          <div className="w-full max-w-none">
            {step === 1 && (
              <Suspense fallback={<BasicInformationPageSkeleton />}>
                <BasicInformationForm />
              </Suspense>
            )}
            {step === 2 && (
              <Suspense fallback={<FamilyAddressFormSkeleton />}>
                <FamilyAddressForm />
              </Suspense>
            )}
            {step === 3 && (
              <Suspense fallback={<EducationDetailFormSkeleton />}>
                <EducationDetailForm />
              </Suspense>
            )}
            {step === 4 && (
              <Suspense fallback={<DocumentAndCenterFormSkeleton />}>
                <DocumentAndCenterForm />
              </Suspense>
            )}
            {step === 5 && (
              <Suspense fallback={<ReviewPageSkeleton />}>
                <ReviewPage />
              </Suspense>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex w-full justify-between items-center p-4 sm:p-6">
          <Button
            disabled={step === 1 || prevDisabled}
            onClick={deCrementStep}
            variant="outline"
            className="cursor-pointer"
          >
            Back
          </Button>
          <Button
            onClick={inCrementStep}
            disabled={step === steps.length || disabled}
            variant="outline"
            className="cursor-pointer"
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}





export function ApplicationFormPageSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-4 sm:mt-6 lg:mt-10 p-2 sm:p-4 lg:p-6">
      <Card className="w-full">
        <CardHeader className="text-center px-2 sm:px-4 lg:px-6">
          <Skeleton className="h-6 sm:h-7 lg:h-8 w-36 sm:w-44 lg:w-48 mx-auto mb-2" />
          <Skeleton className="h-3 sm:h-4 w-24 sm:w-28 lg:w-32 mx-auto mb-4" />
          <CardContent className="flex flex-col items-center gap-3 px-0">
            {/* Stepper skeleton - responsive */}
            <div className="w-full flex justify-center">
              <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center flex-shrink-0">
                    <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 rounded-full" />
                    {i < 4 && <Skeleton className="h-0.5 w-8 sm:w-12 mx-1 sm:mx-2" />}
                  </div>
                ))}
              </div>
            </div>
            {/* Progress bar skeleton - responsive */}
            <Skeleton className="h-1.5 sm:h-2 w-full max-w-xs sm:max-w-md" />
          </CardContent>
        </CardHeader>

        <CardContent className="w-full p-2 sm:p-4 lg:p-6">
          <div className="w-full max-w-none space-y-4 sm:space-y-6">
            {/* Form field skeletons - responsive */}
            <div className="space-y-2 sm:space-y-3">
              <Skeleton className="h-3 sm:h-4 w-24 sm:w-32" />
              <Skeleton className="h-8 sm:h-10 w-full" />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
              <Skeleton className="h-8 sm:h-10 w-full" />
            </div>

            {/* Two column grid - responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2 sm:space-y-3">
                <Skeleton className="h-3 sm:h-4 w-24 sm:w-28" />
                <Skeleton className="h-8 sm:h-10 w-full" />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <Skeleton className="h-3 sm:h-4 w-28 sm:w-36" />
                <Skeleton className="h-8 sm:h-10 w-full" />
              </div>
            </div>

            {/* Three column grid for larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="space-y-2 sm:space-y-3">
                <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
                <Skeleton className="h-8 sm:h-10 w-full" />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <Skeleton className="h-3 sm:h-4 w-24 sm:w-28" />
                <Skeleton className="h-8 sm:h-10 w-full" />
              </div>
              <div className="space-y-2 sm:space-y-3 sm:col-span-2 lg:col-span-1">
                <Skeleton className="h-3 sm:h-4 w-28 sm:w-32" />
                <Skeleton className="h-8 sm:h-10 w-full" />
              </div>
            </div>

            {/* Text area skeleton */}
            <div className="space-y-2 sm:space-y-3">
              <Skeleton className="h-3 sm:h-4 w-32 sm:w-40" />
              <Skeleton className="h-24 sm:h-32 w-full" />
            </div>

            {/* Additional form sections for variety */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2 sm:space-y-3">
                <Skeleton className="h-3 sm:h-4 w-28 sm:w-32" />
                <Skeleton className="h-8 sm:h-10 w-full" />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <Skeleton className="h-3 sm:h-4 w-24 sm:w-28" />
                <Skeleton className="h-8 sm:h-10 w-full" />
              </div>
            </div>

            {/* File upload skeleton */}
            <div className="space-y-2 sm:space-y-3">
              <Skeleton className="h-3 sm:h-4 w-36 sm:w-44" />
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                  <Skeleton className="h-8 sm:h-10 w-8 sm:w-10 rounded" />
                  <Skeleton className="h-3 sm:h-4 w-32 sm:w-40" />
                  <Skeleton className="h-2 sm:h-3 w-24 sm:w-32" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex w-full justify-between items-center p-2 sm:p-4 lg:p-6 gap-3 sm:gap-4">
          <Skeleton className="h-8 sm:h-10 w-12 sm:w-16" />
          <Skeleton className="h-8 sm:h-10 w-12 sm:w-16" />
        </CardFooter>
      </Card>
    </div>
  );
}

