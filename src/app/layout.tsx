import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppSidebar } from "@/components/SideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "@/components/custom/Navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import ModelProvider from "@/components/custom/ModelProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quorix Ai",
  description:
    "Everything you need in an Ai chatbot, from coding to image generation and many more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark")}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <ClerkProvider>
            <AppSidebar />
            <main className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between px-4 py-2 w-full fixed top-0 left-0 z-999">
                <SidebarTrigger />
                <Navbar />
              </div>
              <div className="pt-10 min-h-screen px-4">{children}</div>
              <ModelProvider />
            </main>
            <Toaster />
          </ClerkProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
