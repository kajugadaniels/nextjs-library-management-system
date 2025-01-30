"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
  FieldValues,
  Path, // Ensure Path is imported if you're using it
} from "react-hook-form";
import { z, ZodType } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

// Removed unused formSchema since schema is passed as a prop
/*
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
*/

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const isSignedIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      // Handle successful submission (e.g., redirect or show a success message)
    } else {
      // Handle error (e.g., display error message)
      console.error(result.error);
    }
  };

  // Optional: Define a mapping for field labels if you have specific labels
  // Otherwise, the field name will be used with the first letter capitalized
  const FIELD_NAMES: Partial<Record<keyof T, string>> = {
    // Example:
    // username: "Username",
    // email: "Email Address",
    // Add more mappings as needed
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-medium text-white">
        {isSignedIn
          ? "Welcome again to BookWise"
          : "Create your library account"}
      </h1>
      <p className="text-light-100">
        {isSignedIn ? "Sign in to continue" : "Sign up to get started"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={`Enter your ${field}`} {...field} />
                  </FormControl>
                  <FormDescription>{`This is your ${field}.`}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit">Submit</Button>
        </form>
        <p className="text-center text-base font-medium">
          {isSignedIn ? "New to BookWise! " : "Already have an account? "}

          <Link
            href={isSignedIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-primary"
          >
            {isSignedIn ? "Create an account" : "Sign in"}
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default AuthForm;
