import "./globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteConfig } from "@/lib/site";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LayoutProvider } from "@/components/providers/layout-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: SiteConfig.name,
    template: `%s | ${SiteConfig.name}`,
  },
  description: SiteConfig.description,
  icons: [
    {
      url: "/favicon.png",
      href: "/favicon.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutProvider>
          <ConvexClientProvider>
            <EdgeStoreProvider>
              <ThemeProvider
                enableSystem
                attribute="class"
                defaultTheme="system"
                disableTransitionOnChange
                storageKey="notion-theme-2"
              >
                {children}
                <ModalProvider />
                <Toaster position="bottom-right" />
              </ThemeProvider>
            </EdgeStoreProvider>
          </ConvexClientProvider>
        </LayoutProvider>
      </body>
    </html>
  );
}
