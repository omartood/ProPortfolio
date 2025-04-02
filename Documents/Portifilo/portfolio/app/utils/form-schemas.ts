import * as z from "zod";

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

/**
 * Type definition for contact form values
 */
export type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Project inquiry form validation schema
 */
export const projectInquirySchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().optional(),
  budget: z.string().optional(),
  projectType: z.enum(["website", "application", "consultation", "other"], {
    errorMap: () => ({ message: "Please select a project type" }),
  }),
  timeline: z.enum(["immediate", "1-3 months", "3-6 months", "flexible"], {
    errorMap: () => ({ message: "Please select a timeline" }),
  }),
  message: z.string().min(20, {
    message:
      "Please provide more details about your project (min 20 characters).",
  }),
});

/**
 * Type definition for project inquiry form values
 */
export type ProjectInquiryValues = z.infer<typeof projectInquirySchema>;

/**
 * Newsletter subscription form validation schema
 */
export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

/**
 * Type definition for newsletter form values
 */
export type NewsletterValues = z.infer<typeof newsletterSchema>;
