import { TimeData } from "./../v2/utils";
import { CategoryData } from "./types.d";
import AxiosClient from "../apiClient";

export const seeTeamsWithFilter = async (
  categories: CategoryData[],
  times: TimeData[],
  page: number = 0,
) => {
  let categoryQuery: string[] = [];
  categories.map((category) => {
    if (category.selected) {
      categoryQuery.push(category.id);
    }
  });
  let timeQuery: number[] = [];
  times.map((time) => {
    if (time.selected) {
      timeQuery.push(time.numV);
    }
  });

  const { data } = await AxiosClient.get(`team/all/filter`, {
    params: {
      page: page,
      categoryIds: categoryQuery,
      times: timeQuery,
    },
  });

  if (!data.ok) {
    throw new Error(data.error);
  }
  return data;
};
