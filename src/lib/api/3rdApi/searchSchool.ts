import { SchoolsInfo } from "./../types.d";

export const searchSchool = async (
  searchSchuNm?: string,
): Promise<SchoolsInfo> => {
  const apiKey = process.env.CAREERNET_API_KEY;
  const thisPage = 1;
  const perPage = 20;
  const axios = require("axios");

  const res = await axios.get(
    `https://www.career.go.kr/cnet/openapi/getOpenApi.json?apiKey=a959ed4f1f173b6a1756c8943ab55e94&svcType=api&svcCode=SCHOOL&contentType=json&gubun=univ_list&thisPage=${thisPage}&perPage=${perPage}&searchSchulNm=${searchSchuNm}`,
  );

  return res.data.dataSearch;
};
