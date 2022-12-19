import { Area, GetAreaOutput } from "../api/types";
import AxiosClient from "../apiClient";

export const getAreas = async (): Promise<Area[] | undefined> => {
  const { data } = await AxiosClient.get<GetAreaOutput>("area/all");
  if (!data.ok) {
    alert(data.error);
  }
  return data.areas;
};
