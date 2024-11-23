import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteConfig } from "@/lib/site";
import { ThemeProvider } from "@/components/providers/theme-provider";

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
      url: "/notion.png",
      href: "/notion.png",
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
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          storageKey="notion-theme-2"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
