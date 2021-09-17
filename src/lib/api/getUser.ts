import AxiosClient from "../apiClient";
import { GetUserOutput, UserData } from "./types.d";

export const getUser = async (): Promise<UserData> => {
  const { data } = await AxiosClient.get<GetUserOutput>(`/user/me`);
  if (!data.ok) {
    alert(data.error);
  }
  return data.data;
};
