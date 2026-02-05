import { getCarById } from "@/lib/api/car";
import { notFound } from "next/navigation";
import css from "./CarDetailsPage.module.css";
import RentForm from "@/components/RentForm/RentForm";
import DetailInfo from "@/components/DetailInfo/DetailInfo";
import { CarImage } from "@/components/CarImage/CarImage";

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
        <CarImage src={car.img} alt={`${car.brand} ${car.model}`} />
        <RentForm />
      </div>
      <DetailInfo car={car} />
    </div>
  );
}
