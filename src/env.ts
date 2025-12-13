import { z } from "zod"

const envSchema = z.object({
  VITE_LOCAL_API_URL: z.url().default("http://localhost:8080/api/web"),
})

const parsed = envSchema.safeParse(import.meta.env)

if (!parsed.success) {
  console.error("Invalid environment variables:", z.treeifyError(parsed.error))
  throw new Error("Invalid environment variables")
}

const env = parsed.data

export const LOCAL_API_URL = env.VITE_LOCAL_API_URL
