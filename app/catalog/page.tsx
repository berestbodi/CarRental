import { getCars, getBrands } from "@/lib/api/car";
import css from "./catalog.module.css";
import Filter from "@/components/Filter/Filter";
import CarsGallery from "@/components/CarsGallery/CarsGallery";

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
