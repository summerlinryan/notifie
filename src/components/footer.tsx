import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 border-t backdrop-blur">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
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
        <div className="flex gap-4">
          <Link
            href="/privacy"
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
