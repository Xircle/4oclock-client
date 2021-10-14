import { GetMyRooms, IRoom } from "./types.d";
import AxiosClient from "../apiClient";

export const getMyRooms = async (): Promise<IRoom[]> => {
  const { data } = await AxiosClient.get<GetMyRooms>("room");
  if (!data.ok) {
    alert(data.error);
  }
  return data.myRooms;
};
