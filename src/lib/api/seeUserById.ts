import { SeeUserByIdOutput, UserProfile } from "./types.d";
import AxiosClient from "../apiClient";

export const seeUserById = async (
  id: string
): Promise<UserProfile | undefined> => {
  try {
    const { data } = await AxiosClient.get<SeeUserByIdOutput>(`/user/profile/${id}`, {
      timeout: 6000,
    });
    if (!data.ok) {
      throw new Error(data.error);
    }
    return data.user;
  } catch (err) {
    console.log(err);
    throw new Error("일시적인 에러가 발생했습니다.");
  }
};
