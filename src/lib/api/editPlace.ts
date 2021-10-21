import AxiosClient from "../apiClient";
import { EditPlaceInput, EditPlaceOutput } from "../../lib/api/types";
import { AxiosResponse } from "axios";

export const editPlace = async (
  editPlaceInput: EditPlaceInput
): Promise<AxiosResponse<EditPlaceOutput>> => {

  return AxiosClient.patch<EditPlaceOutput>(`place/${editPlaceInput.placeId}`, {
    editedPlace: editPlaceInput.editedPlace,
    editedPlaceDetail: editPlaceInput.editedPlaceDetail,
  });
};
