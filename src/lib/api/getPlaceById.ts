import { GetPlaceByIdOutput, PlaceData } from "./types.d";
import AxiosClient from "../apiClient";
import storage from "../storage";
import { CURRENT_USER } from "../../components/shared/constants";

export const getPlaceById = async (placeId: string): Promise<PlaceData> => {
  const { data } = await AxiosClient.get<GetPlaceByIdOutput>(
    `/place/${placeId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getItem(CURRENT_USER)["token"]}`,
      },
    }
  );
  if (!data.ok) {
    alert(data.error);
  }
  return data.placeData;
};
