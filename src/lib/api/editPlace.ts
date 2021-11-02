import AxiosClient from "../apiClient";
import {
  EditPlaceInput,
  EditPlaceOutput,
  AdminPlaceData,
} from "../../lib/api/types";
import { AxiosResponse } from "axios";

export const editPlace = async (
  editPlaceInput: EditPlaceInput
): Promise<AxiosResponse<EditPlaceOutput>> => {
  const editedPlace = new FormData();
  const editedPlaceDetail = new FormData();

  editedPlace.append("coverImage", editPlaceInput.state.coverImageFile!);

  if (editPlaceInput.state.reviewImagesFile) {
    for (let i = 0; i < editPlaceInput.state.reviewImagesFile.length; i++) {
      editedPlaceDetail.append(
        "reviewImages",
        editPlaceInput.state.reviewImagesFile[i]!
      );
    }
  }
  editedPlaceDetail.append(
    "reviewDescription",
    editPlaceInput.state.reviewDescription
  );
  editedPlace.append("name", editPlaceInput.state.name);
  editedPlace.append("isLightning", editPlaceInput.state.isLightning + "");
  if (editPlaceInput.state.maxParticipantsNumber)
    editedPlaceDetail.append(
      "maxParticipantsNumber",
      editPlaceInput.state.maxParticipantsNumber
    );
  editedPlace.append("location", editPlaceInput.state.location);
  editedPlaceDetail.append("detailLink", editPlaceInput.state.detailLink);
  editedPlaceDetail.append("detailAddress", editPlaceInput.state.detailAddress);

  editedPlaceDetail.append(
    "categories",
    JSON.stringify(editPlaceInput.state.categories)
  );
  editedPlaceDetail.append("description", editPlaceInput.state.description);
  editedPlaceDetail.append("title", editPlaceInput.state.title);
  editedPlace.append("startTime", editPlaceInput.state.startTime);
  editedPlace.append("startDateAt", editPlaceInput.state.startDateAt + "");
  editedPlace.append("recommendation", editPlaceInput.state.recommendation);
  editedPlaceDetail.append(
    "participationFee",
    editPlaceInput.state.participationFee
  );
  editedPlace.append("oneLineIntroText", editPlaceInput.state.oneLineIntroText);
  console.log(editedPlace);
  return AxiosClient.patch<EditPlaceOutput>(`place/${editPlaceInput.placeId}`, {
    editedPlace: editedPlace,
    editedPlaceDetail: editedPlaceDetail,
  });
};
