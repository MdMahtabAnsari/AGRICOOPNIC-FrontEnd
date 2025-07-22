// components/Stepper.tsx
import { Badge } from "@/components/ui/badge"

type Step = {
  title: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

export const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="w-full flex justify-center items-center gap-2 flex-wrap">
      {steps.map((step, index) => (
        <Badge
          key={index}
          variant={index === currentStep ? "default" : "secondary"}
          className="sm:px-4 px-2 py-1 text-sm"
        >
          {step.title}
        </Badge>
      ))}
    </div>
  )
}
