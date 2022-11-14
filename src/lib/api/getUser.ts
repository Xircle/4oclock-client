import { checkResponseStatus } from "./../checkResponseStatus";
import AxiosClient from "../apiClient";
import { GetUserOutput, UserData } from "./types.d";

export const getUser = async (): Promise<UserData | void> => {
  const response = await AxiosClient.get<GetUserOutput>(`/user/me`);
  if (!response.data.ok) {
    checkResponseStatus(response.status);
    alert(response.data.error);
  }
  return response.data.data;
};
