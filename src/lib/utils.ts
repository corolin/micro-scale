import { env } from "@/env.mjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function getBaseUrl() {
  // Browser should use relative path
  if (typeof window !== 'undefined') return ''

  // Deployment URL when deployed on Vercel
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

  // Use NGROK URL when running locally, for the webhook to work
  return env.NGROK_URL
}
