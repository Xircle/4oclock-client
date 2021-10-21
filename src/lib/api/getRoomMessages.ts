import { GetRoomMessagesOutput, IMessage } from "./types.d";
import AxiosClient from "../apiClient";

export const getRoomMessages = async (
  roomId: string,
  receiverId: string,
  page: number,
  limit: number = 40
): Promise<GetRoomMessagesOutput | undefined> => {
  if (roomId === "0") return;
  const { data } = await AxiosClient.get<GetRoomMessagesOutput>(
    `/room/${roomId}/messages/${receiverId}?page=${page}&limit=${limit}`
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  return data;
};
