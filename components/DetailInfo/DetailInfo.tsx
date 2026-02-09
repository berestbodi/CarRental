import css from "./DetailInfo.module.css";
import { Icon } from "../Icon/Icon";
import { Car } from "../../types/car";

interface Props {
  car: Car;
}
export default function DetailInfo({ car }: Props) {
  return (
    <div className={css.container}>
      <div className={css.mainInfo}>
        <div className={css.titleThumb}>
          <h2 className={css.title}>
            {car.brand} {car.model}, {car.year}
          </h2>
          <span className={css.carId}>id: {car.id.slice(0, 4)}</span>
        </div>

        <div className={css.markerThumb}>
          <Icon id="Location" className={css.markerIcon} />
          <div className={css.locationThumb}>
            <span className={css.city}>
              {car.address.split(",")[1]},{car.address.split(",")[2]}
            </span>
            <span className={css.mileage}>
              Mileage: {car.mileage.toLocaleString("uk-UA")} km
            </span>
          </div>
        </div>

        <p className={css.price}>${car.rentalPrice}</p>

        <p className={css.subtitle}>{car.description}</p>
      </div>
      <div className={css.moreInfo}>
        <div>
          <h2 className={css.titleConditions}>Rental Conditions:</h2>
          <div className={css.conditions}>
            {car.rentalConditions.map((item, index) => (
              <span key={index} className={css.tag}>
                <Icon id="Check" className={css.icon} />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className={css.titleConditions}>Car Specifications:</h2>
          <div className={css.conditions}>
            <span className={css.tag}>
              <Icon id="Calendar" className={css.icon} />
              Year: {car.year}
            </span>
            <span className={css.tag}>
              <Icon id="Car" className={css.icon} />
              Type: {car.type}
            </span>
            <span className={css.tag}>
              <Icon id="Fuel" className={css.icon} />
              Fuel Consumption: {car.fuelConsumption}
            </span>
            <span className={css.tag}>
              <Icon id="Settings" className={css.icon} />
              Engine Size: {car.engineSize}
            </span>
          </div>
        </div>

        <div>
          <h2 className={css.titleConditions}>
            Accessories and functionalities:
          </h2>
          <div className={css.conditions}>
            {car.accessories.map((item, index) => (
              <span key={index} className={css.tag}>
                <Icon id="Check" className={css.icon} />
                {item}
              </span>
            ))}
            {car.functionalities.map((item, index) => (
              <span key={index} className={css.tag}>
                <Icon id="Check" className={css.icon} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
