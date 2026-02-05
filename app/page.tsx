import Link from "next/link";
import css from "./page.module.css";

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
