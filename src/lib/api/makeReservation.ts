import { MakeReservationInput, MakeReservationOutput } from "./types.d";
import { AxiosResponse } from "axios";
import AxiosClient from "../apiClient";

export const makeReservation = async (
  makeReservationInput: MakeReservationInput
): Promise<AxiosResponse<MakeReservationOutput>> => {
  return AxiosClient.post<MakeReservationOutput>(
    "reservation",
    makeReservationInput
  );
};
