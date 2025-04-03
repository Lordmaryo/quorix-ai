import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
});

export type PromptFormData = z.infer<typeof formSchema>;

export const validatePrompt = (prompt: string) => {
  let error = null;
  const validationResult = formSchema.safeParse({ prompt });

  if (!validationResult.success) {
    error =
      validationResult.error.format().prompt?._errors[0] || "Invalid Input";
  } else {
    error = null;
  }

  return error;
};
