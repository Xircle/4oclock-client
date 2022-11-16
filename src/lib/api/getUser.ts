import { checkResponseStatus } from "./../checkResponseStatus";
import AxiosClient from "../apiClient";
import { GetUserOutput, UserData } from "./types.d";

export const getUser = async (): Promise<UserData> => {
  const response = await AxiosClient.get<GetUserOutput>(`/user/me`);

  return response.data.data;
};
