import { GetPlacesByLocationOutput, PlaceData } from "./types.d";
import AxiosClient from "../apiClient";

export type PlaceLocation = "전체" | "안암" | "신촌";

export const getPlacesByLocation = async (
  selectedLocation: PlaceLocation,
  page: number = 1
): Promise<PlaceData[]> => {
  const { data } = await AxiosClient.get<GetPlacesByLocationOutput>(
    `/place?location=${selectedLocation}&page=${page}`
  );
  if (!data.ok) {
    alert(data.error);
  }
  return data.places;
};
