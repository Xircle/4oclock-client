import { GetMyRooms } from "./types.d";
import AxiosClient from "../apiClient";

export const getMyRooms = async (): Promise<GetMyRooms> => {
  const { data } = await AxiosClient.get<GetMyRooms>("room");
  if (!data.ok) {
    alert(data.error);
  }
  return data;
};
