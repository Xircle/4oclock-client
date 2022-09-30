import { CategoryData } from "./types.d";
import AxiosClient from "../apiClient";

export const seeTeamsWithFilter = async (
  categories: CategoryData[],
  page: number = 0,
) => {
  let categoryquery = "";
  const { data } = await AxiosClient.get(`team/all/filter`, {
    params: {
      page: page,
    },
  });

  if (!data.ok) {
    throw new Error(data.error);
  }
  return data;
};
