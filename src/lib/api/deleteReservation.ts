import AxiosClient from "../apiClient";
import { CoreOutput } from "../../components/shared/types.d";

export const deleteReservation = async (placeId: string): Promise<boolean> => {
  const { data } = await AxiosClient.delete<CoreOutput>(
    `reservation/${placeId}`
  );
  if (!data.ok) {
    alert(data.error);
  }
  return data.ok;
};
