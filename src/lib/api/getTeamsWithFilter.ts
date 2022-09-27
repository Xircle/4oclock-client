import AxiosClient from "../apiClient";

export const seeTeamsWithFilter = async () => {
  const { data } = await AxiosClient.get(
    `team/all/filter?categoryIds=b089c0f2-eae5-4200-8d96-a6d2e186dbf1,c9ce15c1-dd55-4c2a-a0e9-7adf91c46e5c,edfa2469-0712-4250-9431-a27e349a4b36&minAge=20&maxAge=30&areaIds=c5c6e68d-d62c-443f-a31e-9566dcf59bb2,b3319d6d-60e5-4dc8-ad3a-f7518b7ba5c3,b065ca5a-19c7-4eec-9f98-d4badbd75a25`,
  );

  if (!data.ok) {
    throw new Error(data.error);
  }
  return data.data;
};
