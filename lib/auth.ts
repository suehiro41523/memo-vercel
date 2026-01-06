import { createAuthClient } from "@neondatabase/neon-js/auth";

const neonAuthUrl = process.env.NEXT_PUBLIC_NEON_AUTH_URL;
console.log(neonAuthUrl);

if (!neonAuthUrl) {
  throw new Error("NEON_AUTH_URL environment variable is not set");
}

export const authClient = createAuthClient(neonAuthUrl);
