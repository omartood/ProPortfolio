"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, NewsletterValues } from "@/app/utils/form-schemas";
import { promiseToast } from "@/app/utils/toast";

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
import { Button } from "@/components/ui/button";

interface NewsletterFormProps {
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
  showLabels?: boolean;
}

export function NewsletterForm({
  title = "Subscribe to my newsletter",
  description = "Get the latest updates and articles delivered straight to your inbox.",
  buttonText = "Subscribe",
  className = "",
  showLabels = false,
}: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: NewsletterValues) => {
    setIsSubmitting(true);

    const subscribeToNewsletter = async () => {
      // Replace with your actual API endpoint
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      // Reset form on success
      form.reset();

      return data;
    };

    try {
      await promiseToast(
        subscribeToNewsletter(),
        {
          loading: "Subscribing...",
          success: "Successfully subscribed to the newsletter!",
          error: (err) =>
            `${err instanceof Error ? err.message : "Failed to subscribe"}`,
        },
        {
          duration: 5000,
        }
      );
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
      {description && (
        <p className="text-muted-foreground mb-4">{description}</p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {showLabels && <FormLabel>Email</FormLabel>}
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      placeholder="your@email.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      buttonText
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
