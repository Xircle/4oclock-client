import { CreatePlaceInput, CreatePlaceData } from "./types.d";
import AxiosClient from "../apiClient";

export const createPlace = async (
  placeData: CreatePlaceData
): Promise<CreatePlaceInput> => {
  const formData = new FormData();
  placeData.coverImageFile
    ? formData.append("coverImageFile", placeData.coverImageFile!)
    : formData.append("coverImageUrl", placeData.coverImageURL!);
  formData.append("name", placeData.name);
  formData.append("isLightning", placeData.isLightning + "");
  if (placeData.maxParticipantsNumber)
    formData.append("maxParticipantsNumber", placeData.maxParticipantsNumber);
  formData.append("username", placeData.name);
  const { data } = await AxiosClient.post<CreatePlaceInput>("place", formData);
  return data;
};

// export interface CreatePlaceData {
//   name: string;
//   isLightning: boolean;
//   maxParticipantsNumber?: number;
//   location: string;
//   oneLineIntroText: string;
//   participationFee: number;
//   recommendation: string;
//   startDateAt: Date;
//   startTime: number;
//   title: string;
//   description: string;
//   categories: string[];
//   detailAddress: string;
//   detailLink: string;
//   reviewDescriptions: string[];
//   coverImage?: string;
//   coverImageFile?: File;
//   reviewImages?: string[];
//   reviewImagesFile?: File[];
// }
