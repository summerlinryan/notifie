import { ArrowRight, Bell, Code, Zap } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function LandingPage() {
  const session = await auth();

  return (
    <HydrateClient>
      <div className="flex min-h-screen flex-col">
        <header className="container z-40 bg-background">
          <div className="flex h-20 items-center justify-between py-6">
            <div className="flex gap-6 md:gap-10">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
                  <span className="font-bold text-white">N</span>
                </div>
                <span className="inline-block font-bold">Notifie</span>
              </Link>
              <nav className="hidden gap-6 md:flex">
                <Link
                  href="#features"
                  className="flex items-center text-lg font-medium text-muted-foreground"
                >
                  Features
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <ModeToggle />

              {!session && (
                <Link href="/auth/signin?callbackUrl=/dashboard">
                  <Button variant="outline" className="border-border">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1">
          <section className="space-y-6 pt-16 md:pt-10 lg:pb-12 lg:pt-24">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                Turn TODOs into Notifications
              </h1>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Automatically scan your codebase and turn TODO/FIXME comments
                into scheduled notifications. Never forget a task again.
              </p>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <section
            id="features"
            className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
          >
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              <div className="relative overflow-hidden rounded-lg border border-border bg-background p-2 pb-4">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <div className="mb-4 flex justify-center">
                    <Zap className="h-12 w-12 text-yellow-500" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold">Automated Scanning</h3>
                    <p className="text-sm text-muted-foreground">
                      Our CLI tool seamlessly integrates with your CI pipeline
                      to scan your codebase.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border border-border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <div className="mb-4 flex justify-center">
                    <Bell className="h-12 w-12 text-green-500" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold">Smart Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive timely reminders on Slack or Discord about your
                      TODO and FIXME comments.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border border-border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <div className="mb-4 flex justify-center">
                    <Code className="h-12 w-12 text-blue-500" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold">Developer Friendly</h3>
                    <p className="text-sm text-muted-foreground">
                      Easy to set up and use, with minimal changes to your
                      existing workflow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="border-t border-border">
          <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built by{" "}
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  Notifie
                </a>
                . The source code is available on{" "}
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
          </div>
        </footer>
      </div>
    </HydrateClient>
  );
}
