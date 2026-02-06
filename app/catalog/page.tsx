import { getCars, getBrands } from "@/lib/api/car";
import css from "./catalog.module.css";
import Filter from "@/components/Filter/Filter";
import CarsGallery from "@/components/CarsGallery/CarsGallery";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const filters = await searchParams;
  const brand = filters.brand ? String(filters.brand) : "";

  const title = brand
    ? `${brand.charAt(0).toUpperCase() + brand.slice(1)} for Rent | Car Catalog`
    : "Car Catalog | Premium Car Rental";

  return {
    title,
    description: `Rent ${brand || "premium cars"} at the best prices. Wide selection, transparent conditions, and high-quality service.`,
  };
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const filters = await searchParams;
  const [data, brands] = await Promise.all([getCars(filters), getBrands()]);

  return (
    <main className={css.catalog}>
      <Filter brands={brands} />

      {data.cars && data.cars.length > 0 ? (
        <CarsGallery
          initialCars={data.cars}
          totalPages={data.totalPages}
          filters={filters}
        />
      ) : (
        <div className={css.notFound}>
          <h2>No cars found matching your criteria.</h2>
        </div>
      )}
    </main>
  );
}
