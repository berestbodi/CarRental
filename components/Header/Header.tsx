"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../Icon/Icon";
import clsx from "clsx";
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          <Icon id="logo" className={css.logoIcon} />
        </Link>

        <nav className={css.nav}>
          <Link
            href="/"
            className={clsx(css.navLink, pathname === "/" && css.active)}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={clsx(css.navLink, pathname === "/catalog" && css.active)}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
