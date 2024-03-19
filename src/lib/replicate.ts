import "server-only";
import Replicate from "replicate";
import { env } from "@/env.mjs";

const replicate = new Replicate({
  auth: env.REPLICATE_API_KEY,
});

export default replicate;
