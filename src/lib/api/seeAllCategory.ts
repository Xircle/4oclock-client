import { SeeAllCategoryOutput, CategoryData } from "./types.d";
import AxiosClient from "../apiClient";

export const seeAllCategory = async (): Promise<CategoryData[] | undefined> => {
  const { data } = await AxiosClient.get<SeeAllCategoryOutput>(
    `category/all/brief`,
  );

  if (!data.ok) {
    throw new Error(data.error);
  }
  return data.data;
};
