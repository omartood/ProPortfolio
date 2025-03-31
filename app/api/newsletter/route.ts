import { NextResponse } from "next/server";
import { newsletterSchema } from "@/app/utils/form-schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input data
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.errors.map((error) => ({
        path: error.path.join("."),
        message: error.message,
      }));

      return NextResponse.json(
        { error: "Validation failed", errors },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Here you would typically:
    // 1. Check if the email already exists in your subscriber list
    // 2. Add the email to your newsletter service (Mailchimp, ConvertKit, etc.)
    // 3. Store the subscriber in your database if needed

    // For now, we'll just simulate a successful subscription
    // In a real implementation, you would connect to your newsletter service API

    // Simulate a small delay to make it feel more realistic
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return success response
    return NextResponse.json(
      { message: "Successfully subscribed to the newsletter" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing newsletter subscription:", error);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}
