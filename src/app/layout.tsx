import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harish Mondepu | Salesforce Engineer",
  description: "Portfolio of Harish Mondepu, a Salesforce Engineer with 9+ years of experience specializing in CPQ, Service Cloud, LWC, MuleSoft integrations, and CRM Analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`antialiased min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-salesforce/30`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
