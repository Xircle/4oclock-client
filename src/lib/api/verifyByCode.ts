import { CoreOutput } from "./../../components/shared/types.d";
import AxiosClient from "../apiClient";

export const verifyByCode = async (code: string): Promise<CoreOutput> => {
  const { data } = await AxiosClient.patch<CoreOutput>(
    `/user/me/verify/${code}`,
  );

  return data;
};
