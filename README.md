<p align="center">
    <img src="./.r/gh-logo.png" width="320px" >
</p>

<h1 align="center">
    μScale
</h1>

<p align="center">
    µ(micro)Scale is a web app that allows you to upscale any images up to 2x its resolution with AI.
</p>

## Introduction and features

What started out as a hackathon project (The FullStack Network Hackathon #1) eventually evolved into a template that other developers could use to expand on this foundation with the following features integrated in this new version:

- +Next.js 14
- +shadcn/ui
- +sonner
- +Supabase (Storage, Auth and Database)
- +Stripe and Stripe Checkout
- +Replicate AI

The app is built with Next.js and Tailwind CSS, and uses Supabase for storage, authentication and database. The app also uses Stripe for payments so the users can buy credits to have access to the upscale feature that is built around Replicate AI.

## Try the app

You can try the app [here](https://uscale.imadil.dev/)

## Getting Started

Before starting, you'll need to configure the environment variables with the various keys required.
Once you've set up your environment variables, you'll need to configure your database with the schema provided below.

> Note for Stripe webhook:
> When configuring your webhook to know if the payment was successful, the URL for the webhook is as follows: `http://localhost:3000/api/stripe`

## Database Schema

### Tables

1. **credits**

   - `amount`: (number | null) - The amount of credits.
   - `created_at`: (string) - The creation date of the credit record.
   - `id`: (number) - The unique identifier of the credit record.
   - `user_id`: (string | null) - The identifier of the user associated with the credit record.

2. **predictions**
   - `created_at`: (string) - The creation date of the prediction record.
   - `id`: (number) - The unique identifier of the prediction record.
   - `input_url`: (string | null) - The input URL for the prediction.
   - `output_url`: (string | null) - The output URL for the prediction.
   - `status`: (number | null) - The status of the prediction.
   - `user_id`: (string | null) - The identifier of the user associated with the prediction record.

### Relationships

1. **public_credits_user_id_fkey**: A foreign key relationship from the `user_id` column in the `credits` table to the `id` column in the `users` table.
2. **public_predictions_user_id_fkey**: A foreign key relationship from the `user_id` column in the `predictions` table to the `id` column in the `users` table.

Please ensure that your database is set up with this schema before running the application.

## Local Development

You can now start the development server by running:

```bash
yarn dev
```

When your server has started, you'll NEED to run a [ngrok tunnel](https://ngrok.com) to expose your localhost to the internet. This is necessary for the AI predictions runned by Replicate that will trigger the different webhooks in the app.

```bash
ngrok http 3000
```

Finally, I have commented out the Replicate AI integration in the app, so you'll need to uncomment the code in the `src/app/api/upload` file to enable the AI predictions.

You are all set! You can now access your app and try it out.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Useful Links

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Stripe](https://stripe.com/)
- [Replicate AI](https://replicate.com/)
- [The FullStack Network](https://thefullstack.network/)
- [ngrok](https://ngrok.com/)
