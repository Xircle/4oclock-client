import { CreatePlaceOutput, CreatePlaceData } from "./types.d";
import AxiosClient from "../apiClient";
import moment from "moment";
import "moment/locale/ko";

export const createPlace = async (
  placeData: CreatePlaceData
): Promise<CreatePlaceOutput> => {
  const formData = new FormData();
  placeData.coverImageFile
    ? formData.append("coverImageFile", placeData.coverImageFile!)
    : formData.append("coverImageUrl", placeData.coverImageUrl!);
  if (
    placeData.reviewImagesFile &&
    placeData.reviewImagesFile?.length === placeData.reviewImagesUrl?.length
  ) {
    for (let i = 0; i < placeData.reviewImagesFile.length; i++) {
      formData.append("reviewImagesFile", placeData.reviewImagesFile[i]!);
      formData.append("reviewDescriptions", placeData.reviewDescriptions[i]);
    }
  } else if (placeData.reviewImagesUrl) {
    for (let i = 0; i < placeData.reviewImagesUrl.length; i++) {
      formData.append("reviewImagesFile", placeData.reviewImagesUrl[i]!);
      formData.append("reviewDescriptions", placeData.reviewDescriptions[i]);
    }
  }
  formData.append("name", placeData.name);
  formData.append("isLightning", placeData.isLightning + "");
  if (placeData.maxParticipantsNumber)
    formData.append("maxParticipantsNumber", placeData.maxParticipantsNumber);
  formData.append("location", placeData.location);
  formData.append("detailLink", placeData.detailLink);
  formData.append("detailAddress", placeData.detailAddress);
  placeData.categories.map((category) =>
    formData.append("categories", category)
  );
  formData.append("description", placeData.description);
  formData.append("title", placeData.title);
  formData.append("startTime", placeData.startTime);
  formData.append("startDateAt", placeData.startDateAt + "");
  formData.append("recommendation", placeData.recommendation);
  formData.append("participationFee", placeData.participationFee);
  formData.append("oneLineIntroText", placeData.oneLineIntroText);
  const { data } = await AxiosClient.post<CreatePlaceOutput>("place", formData);
  return data;
};
