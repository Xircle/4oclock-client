import AxiosClient from "../apiClient";

export const seeTeamsWithFilter = async (
  page: number = 1,
  limit: number = 10,
) => {
  const { data } = await AxiosClient.get(
    `team/all/filter?page=${page}&limit=${limit}`,
  );

  if (!data.ok) {
    throw new Error(data.error);
  }
  return data;
};
