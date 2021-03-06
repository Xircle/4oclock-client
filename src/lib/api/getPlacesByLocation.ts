import { GetPlacesByLocationOutput, PlaceFeedData } from "./types.d";
import AxiosClient from "../apiClient";
import storage from "../storage";
import { CURRENT_USER } from "../../components/shared/constants";

export type PlaceLocation = "전체" | "안암" | "신촌";

export const getPlacesByLocation = async (
  selectedLocation: PlaceLocation,
  page: number = 1,
  limit: number = 8
): Promise<GetPlacesByLocationOutput | undefined> => {
  if (!storage.getItem(CURRENT_USER)) return;
  const { data } = await AxiosClient.get<GetPlacesByLocationOutput>(
    `/place?location=${selectedLocation}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getItem(CURRENT_USER)["token"]}`,
      },
    }
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  return data;
};
