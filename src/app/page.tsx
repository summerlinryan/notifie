import { ArrowRight, Bell, Code, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="from-background to-background/80 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b py-12">
      <section className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Turn TODOs into Notifications
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
              Automatically scan your codebase and turn TODO/FIXME comments into
              scheduled notifications. Never forget a task again.
            </p>
          </div>
          <div className="space-x-4">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link href={session ? "/dashboard" : "/auth/signin"}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <Zap className="h-10 w-10 text-yellow-400" />
            <h2 className="text-primary text-2xl font-bold">
              Automated Scanning
            </h2>
            <p className="text-gray-400">
              Our CLI tool seamlessly integrates with your CI pipeline to scan
              your codebase.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <Bell className="h-10 w-10 text-green-400" />
            <h2 className="text-primary text-2xl font-bold">
              Smart Notifications
            </h2>
            <p className="text-gray-400">
              Receive timely reminders on Slack or Discord about your TODO and
              FIXME comments.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <Code className="h-10 w-10 text-blue-400" />
            <h2 className="text-primary text-2xl font-bold">
              Developer Friendly
            </h2>
            <p className="text-gray-400">
              Easy to set up and use, with minimal changes to your existing
              workflow.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
