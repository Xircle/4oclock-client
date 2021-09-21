import { GetPlaceByIdOutput, PlaceData } from "./types.d";
import AxiosClient from "../apiClient";

export const getPlaceById = async (placeId: string): Promise<PlaceData> => {
  const { data } = await AxiosClient.get<GetPlaceByIdOutput>(
    `/place/${placeId}`
  );
  if (!data.ok) {
    alert(data.error);
  }
  return data.placeData;
};
