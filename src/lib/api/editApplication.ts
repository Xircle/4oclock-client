import { EditApplicationInput } from "./types.d";
import { CoreOutput } from "./../../components/shared/types.d";
import { AxiosResponse } from "axios";

import AxiosClient from "../apiClient";

export const editApplication = async (
  editApplicationInput: EditApplicationInput,
): Promise<AxiosResponse<CoreOutput>> => {
  return AxiosClient.patch<CoreOutput>(
    `application/edit`,
    editApplicationInput,
  );
};
