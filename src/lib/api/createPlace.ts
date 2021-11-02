import { AdminPlaceOutput, AdminPlaceData } from "./types.d";
import AxiosClient from "../apiClient";
import moment from "moment";
import "moment/locale/ko";

export const createPlace = async (
  placeData: AdminPlaceData
): Promise<AdminPlaceOutput> => {
  const formData = new FormData();

  formData.append("coverImage", placeData.coverImageFile!);

  if (placeData.reviewImagesFile) {
    for (let i = 0; i < placeData.reviewImagesFile.length; i++) {
      formData.append("reviewImages", placeData.reviewImagesFile[i]!);
    }
  }
  formData.append(
    "reviewDescription",
    JSON.stringify(placeData.reviewDescriptions)
  );
  formData.append("name", placeData.name);
  formData.append("isLightning", placeData.isLightning + "");
  if (placeData.maxParticipantsNumber)
    formData.append("maxParticipantsNumber", placeData.maxParticipantsNumber);
  formData.append("location", placeData.location);
  formData.append("detailLink", placeData.detailLink);
  formData.append("detailAddress", placeData.detailAddress);

  formData.append("categories", JSON.stringify(placeData.categories));
  formData.append("description", placeData.description);
  formData.append("title", placeData.title);
  formData.append("startTime", placeData.startTime);
  formData.append("startDateAt", placeData.startDateAt + "");
  formData.append("recommendation", placeData.recommendation);
  formData.append("participationFee", placeData.participationFee);
  formData.append("oneLineIntroText", placeData.oneLineIntroText);
  const { data } = await AxiosClient.post<AdminPlaceOutput>("place", formData);
  return data;
};
