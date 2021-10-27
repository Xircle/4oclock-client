import { GetReviewsOutput, ReviewData } from "./types.d";
import AxiosClient from "../apiClient";
import storage from "../storage";
import { CURRENT_USER } from "../../components/shared/constants";

export const getReviews = async (
  page: number = 1,
  limit: number = 18
): Promise<ReviewData[]> => {
  if (!storage.getItem(CURRENT_USER)) return [];
  const { data } = await AxiosClient.get<GetReviewsOutput>(
    `/review?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getItem(CURRENT_USER)["token"]}`,
      },
    }
  );
  if (!data.ok) {
    throw new Error(data.error);
  }
  return data.reviews;
};
