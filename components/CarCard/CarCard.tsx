"use client";

import { useState } from "react";
import Image from "next/image";
import css from "./CarCard.module.css";
import Link from "next/link";
import { Icon } from "../Icon/Icon";
import { Car } from "../../types/car";
import { useFavoriteStore } from "../../lib/store/favoriteStore";

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  const { favorites, toggleFavorite, _hasHydrated } = useFavoriteStore();
  const [isLoading, setIsLoading] = useState(false);

  const isFavorite = _hasHydrated ? favorites.includes(car.id) : false;

  return (
    <li className={css.item}>
      <div className={css.fovoriteIconThumb}>
        <button
          onClick={() => toggleFavorite(car.id)}
          className={css.favoriteBtn}
        >
          {isFavorite ? (
            <Icon id="favorite-active" className={css.icon} />
          ) : (
            <Icon id="favorite" className={css.icon} />
          )}
        </button>
      </div>

      <div className={css.imgWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={276}
          height={268}
          className={css.image}
        />
      </div>

      <div className={css.titleWrapper}>
        <h3 className={css.title}>
          {car.brand}{" "}
          <span className={css.modelBlue}>
            {car.brand.length + car.model.length > 20
              ? `${car.model.substring(0, 17 - car.brand.length)}...`
              : car.model}
          </span>
          , {car.year}
        </h3>
        <p className={css.price}>${car.rentalPrice}</p>
      </div>

      <div className={css.firstInfo}>
        <span className={css.city}>{car.address.split(",")[1]}</span>
        <span className={css.country}>{car.address.split(",")[2]}</span>
        <span className={css.rentalCompany}>{car.rentalCompany}</span>
      </div>

      <div className={css.secondInfo}>
        <span className={css.type}>{car.type}</span>
        <span className={css.mileage}>
          {car.mileage.toLocaleString("uk-UA")} km
        </span>
      </div>

      <Link
        href={`/catalog/${car.id}`}
        className={`${css.learnMoreBtn} ${isLoading ? css.loading : ""}`}
        onClick={() => setIsLoading(true)}
      >
        {isLoading ? "Loading..." : "Read more"}
      </Link>
    </li>
  );
};
