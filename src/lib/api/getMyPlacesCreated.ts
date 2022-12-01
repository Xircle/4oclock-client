import AxiosClient from "../apiClient";
import { GetMyCreatedPlaceOutput, MyCreatedPlaceData } from "./types";

export const getMyPlacesCreated = async (): Promise<MyCreatedPlaceData[]> => {
  const { data } = await AxiosClient.get<GetMyCreatedPlaceOutput>(
    `user/history/created`,
  );
  if (!data.ok) {
    alert(data.error);
  }
  return data.places;
};
