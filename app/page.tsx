import Link from "next/link";
import css from "./page.module.css";
import { Metadata } from "next";

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
    url: "https://car-rental-one-delta.vercel.app",
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

export default function Home() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Find your perfect rental car</h1>
      <p className={css.text}>
        Reliable and budget-friendly rentals for any journey
      </p>
      <Link href="/catalog" className={css.button}>
        View Catalog
      </Link>
    </div>
  );
}
