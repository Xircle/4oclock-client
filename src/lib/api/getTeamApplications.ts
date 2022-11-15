import { GetTeamApplicationsOutput } from "./types.d";
import AxiosClient from "../apiClient";
import { GetTeamApplications } from "./types";

export const getTeamApplications = async (
  teamId?: string,
): Promise<GetTeamApplications | undefined> => {
  if (!teamId) return;
  console.log(teamId);
  const { data } = await AxiosClient.get<GetTeamApplicationsOutput>(
    `/team/crew-applications?teamId=${parseInt(teamId)}`,
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  return data.data;
};
