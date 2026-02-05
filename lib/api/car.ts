import { Car, CarQueryParams, CarsResponse } from "@/types/car";
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL,
});

export const getCars = async (params: CarQueryParams) => {
  const { data } = await api.get<CarsResponse>("/cars", {
    params: {
      limit: 12,
      ...params,
    },
  });
  return data;
};

export const getCarById = async (id: string) => {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
};

export const getBrands = async () => {
  const { data } = await api.get<string[]>("/brands");
  return data;
};
