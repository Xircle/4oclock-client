import {
  GetPlaceParticipantListOutput,
  PlaceParticipantListData,
} from "./types.d";
import AxiosClient from "../apiClient";

export const getPlaceParticipantList = async (
  placeId: string
): Promise<PlaceParticipantListData | undefined> => {
  const { data } = await AxiosClient.get<GetPlaceParticipantListOutput>(
    `place/${placeId}/participants`
  );

  if (!data.ok) {
    throw new Error(data.error);
  }
  return data.participants;
};
