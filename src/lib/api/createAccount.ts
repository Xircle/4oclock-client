import { CreateAccountInput, CreateAccountOutput } from "./types.d";
import { AxiosResponse } from "axios";
import AxiosClient from "../apiClient";

export const createAccount = async (
  createAccountInput: CreateAccountInput
): Promise<AxiosResponse<CreateAccountOutput>> => {
  return AxiosClient.post<CreateAccountOutput>(
    "/auth/social/register/kakao",
    createAccountInput
  );
};
