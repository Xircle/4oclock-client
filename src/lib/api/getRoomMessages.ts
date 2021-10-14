import { GetRoomMessages, IMessage } from "./types.d";
import AxiosClient from "../apiClient";

export const getRoomMessages = async (
  roomId: string,
  receiverId: string
): Promise<IMessage[]> => {
  const { data } = await AxiosClient.get<GetRoomMessages>(
    `/room/${roomId}/messages/${receiverId}`
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  return data.messages;
};
