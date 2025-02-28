import Link from "next/link"
import { ArrowRight, Bell, Code, Zap } from "lucide-react"
import { Button } from "~/components/ui/button"
import { ModeToggle } from "~/components/mode-toggle"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="font-bold text-white">N</span>
              </div>
              <span className="font-bold inline-block">Notifie</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link href="#features" className="flex items-center text-lg font-medium text-muted-foreground">
                Features
              </Link>
              <Link href="#pricing" className="flex items-center text-lg font-medium text-muted-foreground">
                Pricing
              </Link>
              <Link href="/docs" className="flex items-center text-lg font-medium text-muted-foreground">
                Docs
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Link href="/sign-in">
              <Button variant="outline" className="border-border">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-16 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">Turn TODOs into Notifications</h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Automatically scan your codebase and turn TODO/FIXME comments into scheduled notifications. Never forget a
              task again.
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
        <section id="features" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border border-border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Zap className="h-12 w-12 text-yellow-500" />
                <div className="space-y-2">
                  <h3 className="font-bold">Automated Scanning</h3>
                  <p className="text-sm text-muted-foreground">
                    Our CLI tool seamlessly integrates with your CI pipeline to scan your codebase.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Bell className="h-12 w-12 text-green-500" />
                <div className="space-y-2">
                  <h3 className="font-bold">Smart Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive timely reminders on Slack or Discord about your TODO and FIXME comments.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Code className="h-12 w-12 text-blue-500" />
                <div className="space-y-2">
                  <h3 className="font-bold">Developer Friendly</h3>
                  <p className="text-sm text-muted-foreground">
                    Easy to set up and use, with minimal changes to your existing workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" className="border-t border-border">
          <div className="container flex flex-col items-center gap-4 py-12 text-center md:py-16">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Ready to tackle your technical debt?
            </h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Start managing your TODOs effectively. Join thousands of developers who never miss a task.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/dashboard">
                <Button className="bg-indigo-600 hover:bg-indigo-700">Get Started for Free</Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" className="border-border">
                  Read the Docs
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by{" "}
              <a href="#" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
                Notifie
              </a>
              . The source code is available on{" "}
              <a href="#" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

