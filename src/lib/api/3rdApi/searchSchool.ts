import { SchoolInfo } from "./../types.d";

export const searchSchool = async (
  searchSchuNm?: string,
): Promise<SchoolInfo[]> => {
  const apiKey = process.env.CAREERNET_API_KEY;
  const thisPage = 1;
  const perPage = 20;
  const axios = require("axios").default;

  const { dataSearch } = await axios.get(
    `www.career.go.kr/cnet/openapi/getOpenApi?apiKey=${apiKey}&svcType=api&svcCode=SCHOOL&contentType=json&gubun=univ_list&thisPage=${thisPage}&perPage=${perPage}&searchSchulNm=${searchSchuNm}`,
  );

  return dataSearch.content;
};
