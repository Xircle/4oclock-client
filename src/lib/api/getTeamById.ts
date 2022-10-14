import { CURRENT_USER } from "./../../components/shared/constants";
import AxiosClient from "../apiClient";
import { GetTeamByIdOutput, TeamData } from "./types.d";
import storage from "../storage";

export const getTeamById = async (teamId: string): Promise<TeamData> => {
  const { data } = await AxiosClient.get<GetTeamByIdOutput>(
    `/team/id?teamId=${teamId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getItem(CURRENT_USER)?.token || ""}`,
      },
    },
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  return data.data;
};
