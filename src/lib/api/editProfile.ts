import { CreateAccountOutput } from "./types";
import AxiosClient from "../apiClient";
import { CoreOutput } from "../../components/shared/types";
import { ProfileData } from "../../pages/v1/my/EditProfilePage";
import { AxiosResponse } from "axios";

export const editProfile = async (
  editedProfileData: ProfileData,
): Promise<AxiosResponse<CoreOutput>> => {
  const formData = new FormData();
  editedProfileData.profileImageFile &&
    formData.append("profileImageFile", editedProfileData.profileImageFile);
  editedProfileData.username &&
    formData.append("username", editedProfileData.username);
  editedProfileData.shortBio &&
    formData.append("shortBio", editedProfileData.shortBio);
  editedProfileData.job && formData.append("job", editedProfileData.job);
  editedProfileData.activities &&
    formData.append("activities", editedProfileData.activities);
  if (typeof editedProfileData.isYkClub === "boolean") {
    formData.append("isYkClub", String(editedProfileData.isYkClub));
  }
  editedProfileData.MBTI && formData.append("MBTI", editedProfileData.MBTI);
  editedProfileData.personality &&
    formData.append("personality", editedProfileData.personality);
  editedProfileData.drinkingStyle &&
    formData.append("drinkingStyle", editedProfileData.drinkingStyle + "");
  return AxiosClient.put<CreateAccountOutput>("user", formData);
};
