"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import css from "./not-found.module.css";

export default function NotFound() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (countdown === 0) {
      router.push("/catalog");
    }

    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <div className={css.container}>
      <div className={css.content}>
        <span className={css.badge}>404 Error</span>
        <h1 className={css.title}>Page not found</h1>
        <p className={css.description}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          taken a wrong turn? Don’t worry, our cars will get you back on track.
        </p>
        <div className={css.actions}>
          <Link href="/" className={css.homeBtn}>
            Back to Home
          </Link>

          <Link href="/catalog" className={css.catalogBtn}>
            View Catalog
            <span className={css.timerText}>({countdown}s)</span>
            <span className={css.progressBar} />
          </Link>
        </div>
      </div>
    </div>
  );
}
