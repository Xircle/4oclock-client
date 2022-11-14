import { checkResponseStatus } from "./../checkResponseStatus";
import AxiosClient from "../apiClient";
import { GetMyApplicationsOutput, MyApplicationsByStatus } from "./types";

export const getMyApplications =
  async (): Promise<GetMyApplicationsOutput | void> => {
    const response = await AxiosClient.get<GetMyApplicationsOutput>(
      "user/history/applications",
    );
    if (!response.data.ok) {
      alert(response.data.error);
      checkResponseStatus(response.status);
    } else {
      return response.data;
    }
  };
