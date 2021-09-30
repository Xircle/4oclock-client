import AxiosClient from "../apiClient";
import {
  CancelReservationOutput,
  CancelReservationInput,
} from "../../lib/api/types";
import { AxiosResponse } from "axios";

export const cancelReservation = async (
  cancelReservationInput: CancelReservationInput
): Promise<AxiosResponse<CancelReservationOutput>> => {
  return AxiosClient.patch<CancelReservationOutput>(
    `reservation/${cancelReservationInput.placeId}`,
    cancelReservationInput
  );
};
