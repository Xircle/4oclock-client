import { CategoryData } from "./types.d";
import AxiosClient from "../apiClient";

export const seeTeamsWithFilter = async (
  categories: CategoryData[],
  page: number = 0,
) => {
  let categoryQuery: string[] = [];
  categories.map((category) => {
    if (category.selected) {
      categoryQuery.push(category.id);
    }
  });
  console.log(categoryQuery);

  const { data } = await AxiosClient.get(`team/all/filter`, {
    params: {
      page: page,
      categoryIds: categoryQuery,
    },
  });

  if (!data.ok) {
    throw new Error(data.error);
  }
  return data;
};
