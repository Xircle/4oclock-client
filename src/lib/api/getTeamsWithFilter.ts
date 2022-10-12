import { AgeData, TimeData } from "./../v2/utils";
import { CategoryData } from "./types.d";
import AxiosClient from "../apiClient";

interface AgeQuery {
  minAge: number;
  maxAge: number;
}

export const seeTeamsWithFilter = async (
  categories: CategoryData[],
  times: TimeData[],
  ageData: AgeData[],
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
  let ageQuery: AgeQuery[] = [];
  ageData.map((age) => {
    if (age.selected) {
      ageQuery.push({ minAge: age.minAge, maxAge: age.maxAge });
    }
  });

  const { data } = await AxiosClient.get(`team/all/filter`, {
    params: {
      page: page,
      categoryIds: categoryQuery,
      times: timeQuery,
      ages: ageQuery,
    },
  });

  if (!data.ok) {
    throw new Error(data.error);
  }
  return data;
};
