import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import { StrictMode } from "react";
import { SkeletonThemeProvider } from "~/components/skeleton-theme-provider";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notifie - Turn TODOs into Notifications",
  description:
    "Automatically scan your codebase and turn TODO/FIXME comments into scheduled notifications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StrictMode>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <SkeletonThemeProvider>{children}</SkeletonThemeProvider>
              <Toaster />
            </TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </StrictMode>
  );
}
