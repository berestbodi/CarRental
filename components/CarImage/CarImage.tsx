"use client";

import Image from "next/image";
import css from "./CarImage.module.css";

interface CarImageProps {
  src: string;
  alt: string;
}

export const CarImage = ({ src, alt }: CarImageProps) => {
  return (
    <div className={css.imageWrapper}>
      <Image
        key={src}
        src={src}
        alt={alt}
        width={640}
        height={512}
        className={css.image}
        priority
        unoptimized
      />
    </div>
  );
};
