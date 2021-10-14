import { CoreOutput } from "./../../components/shared/types.d";
import { AxiosResponse } from "axios";
import AxiosClient from "../apiClient";
import { SendMessageInput } from "./types";

export const sendMessage = async (
  sendMessageInput: SendMessageInput
): Promise<AxiosResponse<CoreOutput>> => {
  const { roomId, content, receiverId } = sendMessageInput;
  return AxiosClient.post(`/room/${roomId}/messages`, {
    content,
    receiverId,
    sentAt: new Date(),
  });
};
