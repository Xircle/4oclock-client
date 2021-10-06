import { CreateAccountOutput } from "./types";
import AxiosClient from "../apiClient";
import { CoreOutput } from "../../components/shared/types";
import { ProfileData } from "../../pages/my/EditProfilePage";
import { AxiosResponse } from "axios";

export const editProfile = async (
  editedProfileData: ProfileData
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
  if (
    editedProfileData.isYkClub === true ||
    editedProfileData.isYkClub === false
  ) {
    formData.append("isYkClub", editedProfileData.isYkClub + "");
  }

  return AxiosClient.put<CreateAccountOutput>("user", formData);
};
