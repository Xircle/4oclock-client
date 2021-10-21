import { GetRoomMessagesOutput, IMessage } from "./types.d";
import AxiosClient from "../apiClient";
import storage from "../storage";
import routes from "../../routes";

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
    // 권한이 없습니다.
    storage.removeItem(`chat-${receiverId}`);
    window.location.href = routes.chatList;
    throw new Error(data.error);
  }
  return data;
};
