import { checkResponseStatus } from "./../checkResponseStatus";
import { CoreOutput } from "./../../components/shared/types.d";
import { AxiosResponse } from "axios";
import AxiosClient from "../apiClient";
import { SendMessageInput } from "./types";

interface SendMessageOutput extends CoreOutput {
  createdRoomId?: string;
}

export const sendMessage = async (
  sendMessageInput: SendMessageInput,
): Promise<AxiosResponse<SendMessageOutput>> => {
  const { roomId, isRead, content, receiverId } = sendMessageInput;
  const response = await AxiosClient.post(`/room/${roomId}/messages`, {
    content,
    receiverId,
    isRead,
    sentAt: new Date(),
  });

  return response.data;
};
