"use client";

import { useState, useEffect } from "react";
import { Car, CarQueryParams } from "@/types/car";
import css from "./CarsGallery.module.css";
import { CarCard } from "../CarCard/CarCard";
import { getCars } from "@/lib/api/car";
import axios from "axios";
import Button from "../Button/Button";
import Pagination from "../Pagination/Pagination";

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
    if (isLoading || page >= totalPages) return;

    setIsLoading(true);
    const nextPage = page + 1;

    try {
      const data = await getCars({ ...filters, page: nextPage });

      if (data.cars && data.cars.length > 0) {
        setCars((prev) => [...prev, ...data.cars]);
        setPage(nextPage);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = async (event: { selected: number }) => {
    const selectedPage = event.selected + 1;
    if (selectedPage === page) return;

    setIsLoading(true);

    try {
      const data = await getCars({ ...filters, page: selectedPage });

      if (data.cars) {
        setCars(data.cars);
        setPage(selectedPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      console.error(
        "Server message:",
        error.response?.data?.message || error.message,
      );
    } else {
      console.error("Error:", error);
    }
  };

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>

      <div className={css.navigationWrapper}>
        {page < totalPages && (
          <Button
            type="button"
            className={css.loadMoreBtn}
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load more"}
          </Button>
        )}

        <Pagination
          pageCount={totalPages}
          forcePage={page - 1}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
}
