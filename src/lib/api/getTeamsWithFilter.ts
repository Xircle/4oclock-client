import AxiosClient from "../apiClient";

export const seeTeamsWithFilter = async (page: number = 0) => {
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
