import AxiosClient from "../apiClient";
import { GetMyApplicationsOutput, MyApplicationsByStatus } from "./types";

export const getMyApplications = async (): Promise<GetMyApplicationsOutput> => {
  const { data } = await AxiosClient.get<GetMyApplicationsOutput>(
    "user/history/applications",
  );
  if (!data.ok) {
    alert(data.error);
  }
  return data;
};
