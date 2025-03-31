# Email Setup Guide

This document explains how to set up the email functionality for the contact form in your portfolio website.

## Prerequisites

- Node.js and npm installed
- A Gmail account or other email provider account

## Setup Steps

1. **Install Required Packages**

   The application uses Nodemailer for sending emails. It should already be installed, but if not, run:

   ```bash
   npm install nodemailer
   ```

2. **Configure Environment Variables**

   Edit the `.env.local` file in the root directory with your email credentials:

   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password-or-password
   EMAIL_TO=omarjibrilabdulkhadir@gmail.com
   ```

   Replace the placeholder values with your actual email credentials.

3. **Gmail Setup**

   If you're using Gmail, you need to:

   a. Enable "Less secure app access" or
   b. (Recommended) Use an App Password:

   - Go to your Google Account > Security
   - Enable 2-Step Verification if not already enabled
   - Under "App passwords", create a new app password for your portfolio
   - Use this app password in the `.env.local` file

4. **Test the Contact Form**

   After setting up your email credentials, test the contact form by:

   - Running the application locally (`npm run dev`)
   - Filling out the contact form
   - Checking your email to ensure you receive the contact form submission

## Troubleshooting

- **Email Not Sending**:

  - Check your email credentials in `.env.local`
  - Verify your email provider settings (host, port, etc.)
  - Check for any error messages in the console

- **Gmail Authentication Issues**:
  - Make sure you're using an App Password if you have 2-Step Verification enabled
  - Check if "Less secure app access" is enabled (not recommended for production)

## Alternative Email Services

If you don't want to use your personal email, consider:

- **Mailtrap** (for testing): Provides a testing inbox
- **SendGrid**: Offers a free tier for transactional emails
- **Mailgun**: Another popular email service provider

Update the `route.ts` file with appropriate configuration if you switch providers.
