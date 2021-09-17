import { AuthState } from "./../../pages/auth/types.d";
import { CoreOutput } from "./../../components/shared/types.d";

// createAccount fetcher types
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

// getPlacesByLocation fetcher types
enum Gender {
  Male = "Male",
  Female = "Female",
}

export interface Participants {
  userId: string;
  profileImgUrl: string;
  gender: Gender;
  age: number;
}
export interface PlaceData {
  id: string;
  name: string;
  coverImage: string;
  tags: string;
  recommendation: string;
  startDateAt: string;
  isClosed: boolean;
  participantsCount: number;
  startDateFromNow: string;
  participants: Participants[];
  isParticipating: boolean;
  deadline?: string;
}

export interface GetPlacesByLocationOutput extends CoreOutput {
  places: PlaceData[];
}

export interface UserData {
  profileImageUrl: string;
  username: string;
  university: string;
  age: number;
  reservation_count: number;
}

export interface GetUserOutput extends CoreOutput {
  data: Userdata;
}

export interface MyPlaceData {
  id: string;
  coverImage: string;
  name: string;
  tags: string;
  recommendation: string;
  startDateFromNow: string;
}

export interface GetMyPlaceOutput extends CoreOutput {
  places: MyPlaceData[];
}
