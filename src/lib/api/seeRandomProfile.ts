import { RandomProfileData, SeeRandomProfile } from "./types.d";
import AxiosClient from "../apiClient";

export const seeRandomProfile = async (): Promise<
  RandomProfileData | undefined
> => {
  try {
    const { data } = await AxiosClient.get<SeeRandomProfile>("/user/friend", {
      timeout: 6000,
    });
    if (!data.ok) {
      throw new Error(data.error);
    }
    return data.randomProfile;
  } catch (err) {
    console.log(err);
    throw new Error("일시적인 에러가 발생했습니다.");
  }
};
