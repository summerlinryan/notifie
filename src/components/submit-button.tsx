"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useFormContext } from "react-hook-form";
import { Button } from "~/components/ui/button";

interface SubmitButtonProps {
  defaultText: string;
  pendingText: string;
  className?: string;
}

export default function SubmitButton({
  defaultText,
  pendingText,
  className,
}: SubmitButtonProps) {
  // For server actions
  const { pending } = useFormStatus();

  // For React Hook Form
  const formContext = useFormContext();
  const isSubmitting = formContext?.formState?.isSubmitting;

  const isDisabled = pending || isSubmitting;
  const buttonText = isDisabled ? pendingText : defaultText;

  return (
    <Button type="submit" disabled={isDisabled} className={className}>
      {isDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {buttonText}
    </Button>
  );
}
