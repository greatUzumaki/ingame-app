import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { FavouritesProvider } from "@/context/FavouritesContext";

const jost = Jost({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "InGame Sports — Любительский футбол",
    template: "%s | InGame Sports",
  },
  description: "Платформа для любительских футбольных лиг. Найди свою лигу, следи за турнирами и статистикой.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "InGame Sports",
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={jost.variable}>
      <head>
        <meta name="theme-color" content="#060b14" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <FavouritesProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </FavouritesProvider>
        </AuthProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
