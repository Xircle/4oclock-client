import { AgeData, TimeData } from "./../v2/utils";
import { CategoryData } from "./types.d";
import AxiosClient from "../apiClient";

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
  let minAge = 100;
  let maxAge = 0;
  ageData.map((age) => {
    if (age.selected) {
      if (minAge > age.minAge) {
        minAge = age.minAge;
      }
      if (maxAge < age.maxAge) {
        maxAge = age.maxAge;
      }
    }
  });

  console.log(minAge + " " + maxAge);

  const { data } = await AxiosClient.get(`team/all/filter`, {
    params: {
      page: page,
      categoryIds: categoryQuery,
      times: timeQuery,
      minAge: minAge < 100 ? minAge : 20,
      maxAge: maxAge > 0 ? maxAge : 30,
    },
  });

  if (!data.ok) {
    throw new Error(data.error);
  }
  return data;
};
