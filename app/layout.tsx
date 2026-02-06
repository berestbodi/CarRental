import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-family",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--second-family",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "RentalCar | Luxury & Affordable Car Rentals",
  description:
    "Rent the best cars in Ukraine at affordable prices. RentalCar - your journey starts here.",
  keywords: ["car rental", "rent car Ukraine", "RentalCar", "оренда авто"],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "RentalCar | Luxury & Affordable Car Rentals",
    description: "Rent the best cars in Ukraine at affordable prices.",
    url: "https://car-rental-one-delta.vercel.app/",
    siteName: "RentalCar",
    images: [
      {
        url: "/background.webp",
        width: 1200,
        height: 630,
        alt: "RentalCar - Luxury Car Fleet",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RentalCar | Luxury & Affordable Car Rentals",
    description: "Rent the best cars in Ukraine at affordable prices.",
    images: ["/background.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <Header />
        <main style={{ paddingTop: "68px" }}>{children}</main>
      </body>
    </html>
  );
}
