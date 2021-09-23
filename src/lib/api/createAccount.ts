import { CreateAccountOutput } from "./types.d";
import AxiosClient from "../apiClient";
import { AuthState } from "../../components/auth/types";

export const createAccount = async (
  state: AuthState
): Promise<CreateAccountOutput> => {
  console.log("state : ", state);

  const formData = new FormData();
  state.profileImgFile
    ? formData.append("profileImageFile", state.profileImgFile!)
    : formData.append("profileImageUrl", state.profileImgUrl!);
  formData.append("socialId", state.uid + "");
  formData.append("email", state.email);
  formData.append("phoneNumber", state.phoneNumber);
  formData.append("username", state.name);
  formData.append("university", state.university);
  formData.append("isGraduate", state.isGraduate + "");
  formData.append("age", state.age);
  formData.append("gender", state.gender === "male" ? "Male" : "Female");
  formData.append("job", state.title);
  formData.append("shortBio", state.bio);
  formData.append("location", state.location + "");
  formData.append("isMarketingAgree", state.agree4 + "");
  const { data } = await AxiosClient.post<CreateAccountOutput>(
    "auth/social/register/kakao",
    formData
  );
  return data;
};
