import { Inter } from "next/font/google";
import type React from "react";
import Footer from "~/components/footer";
import Header from "~/components/header";
import { ThemeProvider } from "~/components/theme-provider";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Notifie - Turn TODOs into Notifications",
  description:
    "Automatically scan your codebase and turn TODO/FIXME comments into scheduled notifications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
