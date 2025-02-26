import Image from "next/image";
import { signIn } from "~/server/auth";
import { authConfig } from "~/server/auth/config";

export default async function SignInPage({
  searchParams,
}: {
  searchParams?: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  // In a server component, we can directly access the providers from authConfig
  const providers = authConfig.providers;
  const callbackUrl = (await searchParams)?.callbackUrl || "/";
  const error = (await searchParams)?.error || "";

  return (
    <div className="bg-background/95 flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border border-gray-700 bg-neutral-900 p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Sign In
        </h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 p-3 text-center text-sm text-red-400">
            {error === "OAuthSignin" && "Error starting sign in process."}
            {error === "OAuthCallback" && "Error completing sign in."}
            {error === "OAuthAccountNotLinked" &&
              "Account already linked to another user."}
            {error === "Callback" && "Error during callback."}
            {error === "Default" && "Unable to sign in."}
          </div>
        )}

        <div className="space-y-4">
          {providers.map((provider: any) => (
            <form
              key={provider.id}
              action={async () => {
                "use server";
                await signIn(provider.id, {
                  redirectTo: callbackUrl,
                });
              }}
              className="w-full"
            >
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-neutral-800 px-4 py-3 text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2 focus:ring-offset-neutral-900"
              >
                <ProviderImage provider={provider.id} />
                <span className="text-base font-medium">
                  Sign in with {provider.name}
                </span>
              </button>
            </form>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

const ProviderImage = ({ provider }: { provider: string }): JSX.Element => {
  return (
    <Image
      src={`/providers/slack.svg`}
      alt={provider}
      width={24}
      height={24}
      className="mr-2"
      color="#5865F2"
    />
  );
};
