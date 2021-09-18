import { RandomProfileData, SeeRandomProfile } from "./types.d";
import AxiosClient from "../apiClient";

export const seeRandomProfile = async (): Promise<RandomProfileData> => {
  const { data } = await AxiosClient.get<SeeRandomProfile>("user/friend");
  if (!data.ok) {
    alert(data.error);
  }
  return data.randomProfile;
};
