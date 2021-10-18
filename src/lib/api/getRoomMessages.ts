import { GetRoomMessages, IMessage } from "./types.d";
import AxiosClient from "../apiClient";

export const getRoomMessages = async (
  page: number,
  roomId: string,
  receiverId: string
): Promise<IMessage[] | undefined> => {
  if (roomId === "0") return;
  const { data } = await AxiosClient.get<GetRoomMessages>(
    `/room/${roomId}/messages/${receiverId}?page=${page}`
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  return data.messages;
};
