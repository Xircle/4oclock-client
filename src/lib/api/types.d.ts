import { AuthState } from "./../../pages/auth/types.d";
import { CoreOutput } from "./../../components/shared/types.d";

export interface CreateAccountInput {
  profileImgUrl?: string;
  profileImgFile?: File;
  socialId: number;
  email: string;
  phoneNumber: string;
  username: string;
  university: string;
  isGraduate: boolean;
  age: string;
  gender: string;
  job: string;
  shortBio: string;
  location?: string;
  isMarketingAgree: boolean;
}

export interface CreateAccountOutput extends CoreOutput {}
