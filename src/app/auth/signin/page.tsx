import { FaDiscord, FaGithub, FaGoogle, FaSlack } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { signIn } from "~/server/auth";
import { authConfig } from "~/server/auth/config";

type ProviderStyleConfig = {
  icon: IconType;
  style: string;
  textColor: string;
};

const providerStyleConfig: Record<string, ProviderStyleConfig> = {
  discord: {
    icon: FaDiscord,
    style: "bg-[#5865F2] hover:bg-[#4752C4]",
    textColor: "text-white",
  },
  google: {
    icon: FaGoogle,
    style: "bg-white hover:bg-gray-100 border border-gray-300",
    textColor: "text-gray-800",
  },
  github: {
    icon: FaGithub,
    style: "bg-[#24292e] hover:bg-[#1a1e22]",
    textColor: "text-white",
  },
  slack: {
    icon: FaSlack,
    style: "bg-[#4A154B] hover:bg-[#3B0D3B]",
    textColor: "text-white",
  },
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams?: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const getProviderConfig = (
    providerId: string,
  ): ProviderStyleConfig | undefined => {
    const id = providerId.toLowerCase();
    return providerStyleConfig[id];
  };

  const providers = authConfig.providers;
  const callbackUrl = (await searchParams)?.callbackUrl ?? "/";
  const error = (await searchParams)?.error ?? "";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md overflow-hidden rounded-lg border bg-card shadow-lg">
        <div className="border-b bg-muted/50 px-8 py-5">
          <h1 className="text-center text-2xl font-bold">Welcome</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            Sign in to continue to your account
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              <div className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-destructive"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  {error === "OAuthSignin" && "Error starting sign in process."}
                  {error === "OAuthCallback" && "Error completing sign in."}
                  {error === "OAuthAccountNotLinked" &&
                    "Account already linked to another user."}
                  {error === "Callback" && "Error during callback."}
                  {error === "Default" && "Unable to sign in."}
                </span>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {providers.map((provider: any) => {
              const config = getProviderConfig(provider.id);
              const IconComponent = config?.icon;

              return (
                <form
                  key={provider.id}
                  action={async () => {
                    "use server";
                    await signIn(provider.id, { redirectTo: callbackUrl });
                  }}
                >
                  <button
                    type="submit"
                    className={`flex w-full items-center justify-center rounded-md px-4 py-3 ${config?.style} ${config?.textColor} shadow-sm transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
                  >
                    {IconComponent && (
                      <IconComponent className="mr-3 h-5 w-5" />
                    )}
                    <span className="text-base font-medium">
                      Continue with {provider.name}
                    </span>
                  </button>
                </form>
              );
            })}
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="rounded-md border bg-muted/50 p-4 text-center text-sm text-muted-foreground">
            Email sign-in coming soon
          </div>
        </div>

        <div className="border-t bg-muted/30 px-8 py-4 text-center text-xs text-muted-foreground">
          By signing in, you agree to our{" "}
          <a href="#" className="text-primary hover:text-primary/90">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:text-primary/90">
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
}
