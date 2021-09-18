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
export interface PlaceFeedData {
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
  places: PlaceFeedData[];
}

// Get Place By Id
interface PlaceDataParticipantsProfile extends Participants {}

export interface PlaceData {
  name: string;
  startDateFromNow: string;
  recommendation: string;
  coverImage: string;
  isClosed: boolean;
  isParticipating: boolean;
  participants: PlaceDataParticipantsProfile[];
  participantsCount: number;
  participantsInfo: {
    total_count: number;
    male_count: number;
    average_age: number;
  };
  placeDetail: {
    title: string;
    description: string;
    categories: string;
    detailAddress: string;
    photos: string[];
  };
}
export interface GetPlaceByIdOutput extends CoreOutput {
  placeData: PlaceData;
}

// My Page
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

// My Xircle I've registered
export interface MyPlaceData {
  id: string;
  coverImage: string;
  name: string;
  tags: string;
  recommendation: string;
  startDateFromNow: string;
  isClosed: boolean;
}

export interface GetMyPlaceOutput extends CoreOutput {
  places: MyPlaceData[];
}

// See Random Profile
interface RandomProfileData {
  id: string;
  profileImageUrl: string;
  location?: string;
  username: string;
  job: string;
  university: string;
  age: number;
  shortBio: string;
}

export interface SeeRandomProfile extends CoreOutput {
  randomProfile: RandomProfileData;
}

// Make reservation
export type StartTime = "Four" | "Seven";
export interface MakeReservationInput {
  placeId: string;
  startTime: StartTime;
}

export interface MakeReservationOutput extends CoreOutput {}
