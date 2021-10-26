import { GetReviewsOutput, ReviewData } from "./types.d";
import AxiosClient from "../apiClient";

export const getMyPlaces = async (): Promise<ReviewData[]> => {
  const { data } = await AxiosClient.get<GetReviewsOutput>("review");
  if (!data.ok) {
    alert(data.error);
  }
  return data.reviews;
};
