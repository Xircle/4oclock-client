import {
  GetApplicationByLeaderData,
  GetApplicationByLeaderOutput,
} from "./types.d";

import AxiosClient from "../apiClient";

export const getApplicationByLeader = async (
  applicationId?: string,
): Promise<GetApplicationByLeaderData | undefined> => {
  if (!applicationId) return;

  const { data } = await AxiosClient.get<GetApplicationByLeaderOutput>(
    `application/leader?applicationId=${applicationId}`,
  );
  if (!data.ok) {
    alert(data.error);
  }
  return data.data;
};
