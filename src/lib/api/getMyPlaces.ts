import { GetMyPlaceOutput, MyPlaceData } from "./types.d";
import AxiosClient from "../apiClient";

export const getMyPlaces = async (): Promise<MyPlaceData[]> => {
  const { data } = await AxiosClient.get<GetMyPlaceOutput>("user/history");
  if (!data.ok) {
    alert(data.error);
  }
  return data.places;
};
