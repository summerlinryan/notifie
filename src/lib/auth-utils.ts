import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

/**
 * Requires authentication for a route, redirecting to sign in if not authenticated
 * @param callbackUrl The URL to redirect back to after successful authentication
 * @returns The user session if authenticated
 */
export async function requireAuth(callbackUrl: string) {
  const session = await auth();

  if (!session) {
    // Encode the callback URL to handle special characters
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    redirect(`/auth/signin?callbackUrl=${encodedCallbackUrl}`);
  }

  return session;
}
