import { getCarById } from "@/lib/api/car";
import { notFound } from "next/navigation";
import css from "./CarDetailsPage.module.css";
import RentForm from "@/components/RentForm/RentForm";
import DetailInfo from "@/components/DetailInfo/DetailInfo";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const car = await getCarById(id);

  if (!car) {
    notFound();
  }

  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <div className={css.imageWrapper}>
          <Image
            key={car.id}
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={640}
            height={512}
            className={css.image}
          />
        </div>
        <RentForm />
      </div>
      <DetailInfo car={car} />
    </div>
  );
}
