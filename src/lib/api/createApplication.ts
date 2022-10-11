import { CoreOutput } from "./../../components/shared/types.d";
import { CreateApplicationInput } from "./types.d";
import AxiosClient from "../apiClient";

export const createApplication = async (
  createApplicationInput: CreateApplicationInput,
): Promise<CoreOutput> => {
  const { teamId, status, content } = createApplicationInput;
  return AxiosClient.post(`/application/create`, {
    teamId,
    status,
    content,
  });
};
