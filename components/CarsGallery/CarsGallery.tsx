"use client";

import { useState, useEffect } from "react";
import { Car, CarQueryParams } from "@/types/car";
import css from "./CarsGallery.module.css";
import { CarCard } from "../CarCard/CarCard";
import { getCars } from "@/lib/api/car";
import axios from "axios";

interface CarsGalleryProps {
  initialCars: Car[];
  totalPages: number;
  filters: CarQueryParams;
}

export default function CarsGallery({
  initialCars,
  totalPages,
  filters,
}: CarsGalleryProps) {
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCars(initialCars);
    setPage(1);
  }, [initialCars]);

  const handleLoadMore = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const nextPage = page + 1;

    try {
      const data = await getCars({ ...filters, page: nextPage });

      if (data.cars && data.cars.length > 0) {
        setCars((prev) => [...prev, ...data.cars]);
        setPage(nextPage);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Server message:",
          error.response?.data?.message || error.message,
        );
      } else {
        console.error("Non-axios error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>

      {page < totalPages && (
        <button
          type="button"
          className={css.loadMoreBtn}
          onClick={handleLoadMore}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
