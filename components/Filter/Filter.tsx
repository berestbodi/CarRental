"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import css from "./Filter.module.css";
import { CarQueryParams } from "@/types/car";
import { Icon } from "../Icon/Icon";

interface FilterProps {
  brands: string[];
}

export default function Filter({ brands }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [values, setValues] = useState<CarQueryParams>({
    brand: searchParams.get("brand") || "",
    rentalPrice: searchParams.get("rentalPrice") || "",
    minMileage: searchParams.get("minMileage") || "",
    maxMileage: searchParams.get("maxMileage") || "",
  });

  const [isOpenBrand, setIsOpenBrand] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);

  const brandRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (brandRef.current && !brandRef.current.contains(event.target as Node))
        setIsOpenBrand(false);
      if (priceRef.current && !priceRef.current.contains(event.target as Node))
        setIsOpenPrice(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (name: keyof CarQueryParams, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setIsOpenBrand(false);
    setIsOpenPrice(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    Object.entries(values).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });

    params.set("page", "1");
    router.push(`/catalog?${params.toString()}`, { scroll: false });
  };

  const prices = [30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

  return (
    <form className={css.filterForm} onSubmit={handleSubmit}>
      <div className={css.inputGroup}>
        <label className={css.label}>Car brand</label>
        <div className={css.dropdownWrapper} ref={brandRef}>
          <div
            className={css.dropdownHeader}
            onClick={() => setIsOpenBrand(!isOpenBrand)}
          >
            <span className={!values.brand ? css.placeholder : ""}>
              {values.brand || "Choose a brand"}
            </span>
            <Icon
              id="arrow-Up"
              className={`${css.iconArrow} ${isOpenBrand ? css.rotate : ""}`}
            />
          </div>
          <ul
            className={`${css.dropdownList} ${isOpenBrand ? css.openList : ""}`}
          >
            <li
              onClick={() => handleSelect("brand", "")}
              className={css.dropdownItem}
            >
              All brands
            </li>
            {brands.map((brand) => (
              <li
                key={brand}
                onClick={() => handleSelect("brand", brand)}
                className={css.dropdownItem}
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={css.inputGroup}>
        <label className={css.label}>Price/ 1 hour</label>
        <div className={css.dropdownWrapper} ref={priceRef}>
          <div
            className={css.dropdownHeader}
            onClick={() => setIsOpenPrice(!isOpenPrice)}
          >
            <span>
              {values.rentalPrice === "" &&
              searchParams.get("rentalPrice") === null
                ? "Choose a price"
                : values.rentalPrice === ""
                  ? "All prices"
                  : `To ${values.rentalPrice}$`}
            </span>
            <Icon
              id="arrow-Up"
              className={`${css.iconArrow} ${isOpenPrice ? css.rotate : ""}`}
            />
          </div>
          <ul
            className={`${css.dropdownListPrice} ${isOpenPrice ? css.openList : ""}`}
          >
            <li
              onClick={() => handleSelect("rentalPrice", "")}
              className={css.dropdownItem}
            >
              All prices
            </li>
            {prices.map((price) => (
              <li
                key={price}
                onClick={() => handleSelect("rentalPrice", price.toString())}
                className={css.dropdownItem}
              >
                {price}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={css.inputGroup}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.mileageContainer}>
          <div className={css.inputWrapper}>
            <label htmlFor="minMileage" className={css.prefix}>
              From
            </label>
            <input
              type="number"
              id="minMileage"
              name="minMileage"
              value={values.minMileage}
              onChange={handleInputChange}
              className={css.mileageInput}
            />
          </div>
          <div className={css.inputWrapper}>
            <label htmlFor="maxMileage" className={css.prefix}>
              To
            </label>
            <input
              type="number"
              id="maxMileage"
              name="maxMileage"
              value={values.maxMileage}
              onChange={handleInputChange}
              className={css.mileageInput}
            />
          </div>
        </div>
      </div>

      <button type="submit" className={css.searchBtn}>
        Search
      </button>
    </form>
  );
}
