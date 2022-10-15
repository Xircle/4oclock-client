import {
  GetApplicationByLeaderData,
  GetApplicationByLeaderOutput,
  GetTeamApplicationInput,
} from "./types.d";

import AxiosClient from "../apiClient";

export const getApplicationByLeader = async (
  getTeamApplicationInput: GetTeamApplicationInput,
): Promise<GetApplicationByLeaderData | undefined> => {
  const { param1, param2 } = getTeamApplicationInput;
  console.log({ param1, param2 });

  if (param1 && param2) {
    const { data } = await AxiosClient.get<GetApplicationByLeaderOutput>(
      `application/leader?userId=${param1}&teamId=${param2}`,
    );
    if (!data.ok) {
      alert(data.error);
    }
    return data.data;
  } else if (param1) {
    const { data } = await AxiosClient.get<GetApplicationByLeaderOutput>(
      `application/leader?applicationId=${param1}`,
    );
    if (!data.ok) {
      alert(data.error);
    }
    return data.data;
  }
};
