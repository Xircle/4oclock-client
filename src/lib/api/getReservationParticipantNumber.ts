import AxiosClient from "../apiClient";
import {
  GetReservationParticipantNumberOutput,
  ReservationInfo,
} from "./types.d";

export const getReservationParticipantNumber = async (
  placeId: string
): Promise<ReservationInfo | undefined> => {
  const { data } = await AxiosClient.get<GetReservationParticipantNumberOutput>(
    `/reservation/${placeId}/number`
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  return data.info;
};
