import { env } from "@/env.mjs";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export default stripe;
