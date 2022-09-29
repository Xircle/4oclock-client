import AxiosClient from "../apiClient";

export const seeTeamsWithFilter = async () => {
  const { data } = await AxiosClient.get(`team/all/filter`);

  if (!data.ok) {
    throw new Error(data.error);
  }
  return data.data;
};
