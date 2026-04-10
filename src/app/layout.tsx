import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { AuthProvider } from "@/context/AuthContext";
import { FavouritesProvider } from "@/context/FavouritesContext";

const jost = Jost({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BARDIUZHENKO — Любительский футбол",
    template: "%s | BARDIUZHENKO",
  },
  description: "Платформа для любительских футбольных лиг. Найди свою лигу, следи за турнирами и статистикой.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BARDIUZHENKO",
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
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <FavouritesProvider>
            <Navbar />
            <main className="flex-1 flex flex-col pb-16 md:pb-0">
              {children}
            </main>
            <Footer />
            <BottomNav />
          </FavouritesProvider>
        </AuthProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
