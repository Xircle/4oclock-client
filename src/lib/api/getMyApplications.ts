import AxiosClient from "../apiClient";
import { GetMyApplicationsOutput } from "./types";

export const getMyApplications = async (): Promise<GetMyApplicationsOutput> => {
  const response = await AxiosClient.get<GetMyApplicationsOutput>(
    "user/history/applications",
  );

  return response.data;
};
