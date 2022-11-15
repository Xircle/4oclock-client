import { UserProfile, SeeRandomProfile } from "./types.d";
import AxiosClient from "../apiClient";

export const seeRandomProfile = async (
  isYkClub: boolean,
): Promise<UserProfile | undefined> => {
  try {
    const { data } = await AxiosClient.get<SeeRandomProfile>(
      `/user/profile/random?ykClubOnly=${isYkClub}`,
      {
        timeout: 6000,
      },
    );
    if (!data.ok) {
      throw new Error(data.error);
    }
    return data.randomProfile;
  } catch (err) {
    throw new Error("일시적인 에러가 발생했습니다.");
  }
};
