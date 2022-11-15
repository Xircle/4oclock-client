import { GetMyTeamsLeaderOutput, MyTeamsLeader } from "./types.d";
import AxiosClient from "../apiClient";

export const getMyTeamsLeader = async (): Promise<
  MyTeamsLeader[] | undefined
> => {
  const { data } = await AxiosClient.get<GetMyTeamsLeaderOutput>(
    "user/leader/myteams",
  );
  if (!data.ok) {
    alert(data.error);
  }
  return data.teams;
};
