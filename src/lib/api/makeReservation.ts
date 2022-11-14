import { checkResponseStatus } from "./../checkResponseStatus";
import { MakeReservationInput, MakeReservationOutput } from "./types.d";
import { AxiosResponse } from "axios";
import AxiosClient from "../apiClient";

export const makeReservation = async (
  makeReservationInput: MakeReservationInput,
): Promise<AxiosResponse<MakeReservationOutput>> => {
  const response = await AxiosClient.post<MakeReservationOutput>(
    "reservation",
    makeReservationInput,
  );

  return response;
};
