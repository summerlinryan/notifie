import { FaDiscord, FaGithub, FaGoogle, FaSlack } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { Badge } from "~/components/ui/badge";
import { signIn } from "~/server/auth";
import { authConfig } from "~/server/auth/config";

const providerStyleConfig: Record<
  string,
  { icon: IconType; style: string; textColor: string }
> = {
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
  const getProviderConfig = (providerId: string) => {
    const id = providerId.toLowerCase();
    return providerStyleConfig[id] || providerStyleConfig.default;
  };

  const providers = authConfig.providers;
  const callbackUrl = (await searchParams)?.callbackUrl || "/";
  const error = (await searchParams)?.error || "";

  return (
    <main className="px-4 bg-background h-full">
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-700 bg-gray-800/70 shadow-xl backdrop-blur-sm">
          <div className="border-b border-gray-700 bg-gray-700/50 px-8 py-5">
            <h1 className="text-center text-2xl font-bold text-white">
              Welcome
            </h1>
            <p className="mt-1 text-center text-sm text-gray-400">
              Sign in to continue to your account
            </p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 rounded-md border border-red-900/30 bg-red-500/10 p-4 text-sm text-red-400">
                <div className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-red-400"
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
                    {error === "OAuthSignin" &&
                      "Error starting sign in process."}
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
                      await signIn(provider.id, {
                        redirectTo: callbackUrl,
                      });
                    }}
                    className="w-full"
                  >
                    <button
                      type="submit"
                      key={provider.id}
                      className={`flex w-full items-center justify-center rounded-md px-4 py-3 ${config?.style} ${config?.textColor} shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-800 bg-indigo-600 hover:bg-indigo-700`}
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
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-800/70 px-2 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="rounded-md border border-gray-700 bg-gray-800/50 p-4 text-center text-sm text-gray-400">
              Email sign-in coming soon
            </div>
          </div>

          <div className="border-t border-gray-700 bg-gray-700/30 px-8 py-4 text-center text-xs text-gray-400">
            By signing in, you agree to our{" "}
            <a href="#" className="text-indigo-400 hover:text-indigo-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-indigo-400 hover:text-indigo-300">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
    </main>
  );
}