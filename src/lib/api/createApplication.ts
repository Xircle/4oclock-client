import { CoreOutput } from "./../../components/shared/types.d";
import { CreateApplicationInput } from "./types.d";
import AxiosClient from "../apiClient";
import { AxiosResponse } from "axios";

export const createApplication = async (
  createApplicationInput: CreateApplicationInput,
): Promise<AxiosResponse<CoreOutput>> => {
  const { teamId, status, content } = createApplicationInput;
  const data = await AxiosClient.post(`/application/create`, {
    teamId,
    status,
    content,
  });

  return data;
};
