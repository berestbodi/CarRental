import { getCarById } from "@/lib/api/car";
import { notFound } from "next/navigation";
import css from "./CarDetailsPage.module.css";
import RentForm from "@/components/RentForm/RentForm";
import DetailInfo from "@/components/DetailInfo/DetailInfo";
import Image from "next/image";

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) {
    return {
      title: "Car Not Found",
    };
  }

  const title = `${car.brand} ${car.model} for Rent | Premium Service`;
  const description = `Rent the ${car.brand} ${car.model} (${car.year}). ${car.description.substring(0, 150)}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: car.img,
          width: 800,
          height: 600,
          alt: `${car.brand} ${car.model}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [car.img],
    },
  };
}

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
            priority
          />
        </div>
        <div className={css.rentFormWrapper}>
          <RentForm />
        </div>
      </div>
      <div className={css.detailInfoWrapper}>
        <DetailInfo car={car} />
      </div>
    </div>
  );
}
