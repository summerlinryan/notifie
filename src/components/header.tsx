import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { auth, signOut } from "~/server/auth";

export default async function Header(): Promise<JSX.Element> {
  const session = await auth();

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed left-0 right-0 top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/notifie.png"
              alt="Notifie logo"
              width={32}
              height={32}
            />
            <span className="text-xl font-bold">Notifie</span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link
              href="/features"
              className="hover:text-foreground/80 text-foreground/60 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="hover:text-foreground/80 text-foreground/60 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="hover:text-foreground/80 text-foreground/60 transition-colors"
            >
              Docs
            </Link>
          </nav>
        </div>

        {!session ? (
          <div className="flex items-center space-x-2">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow"
              asChild
            >
              <Link href="/auth/signin">Sign in</Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow"
              >
                Sign out
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
