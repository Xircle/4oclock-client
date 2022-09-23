import AxiosClient from "../apiClient";

export const seeTeamsWithFilter = async () => {
  const { data } = await AxiosClient.patch(`team/all/filter`, {
    categoryIds: ["1", "2"],
  });

  if (!data.ok) {
    throw new Error(data.error);
  }
  return data.data;
};
