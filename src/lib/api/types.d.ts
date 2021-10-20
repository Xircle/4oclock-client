import { AuthState } from "./../../pages/auth/types.d";
import { CoreOutput, MetaTag } from "./../../components/shared/types.d";

export interface CreateAccountOutput extends CoreOutput {
  data?: {
    uid: string;
    username: string;
    email: string;
    token: string;
    profile: {
      id: string;
      thumbnail: string;
    };
  };
}

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
  job: string;
  shortBio: string;
  isYkClub: boolean;
}
export interface PlaceFeedData {
  id: string;
  name: string;
  coverImage: string;
  oneLineIntroText: string;
  startDateAt: string;
  startTime: number;
  isClosed: boolean;
  participantsCount: number;
  startDateFromNow: string;
  participants: Participants[];
  isParticipating: boolean;
  deadline?: string;
  views: number;
}

export interface ParticipantsListData extends Participants {}

export interface GetPlacesByLocationOutput extends CoreOutput {
  places: PlaceFeedData[];
}

// Get Place By Id
interface PlaceDataParticipantsProfile extends Participants {}

export interface ReviewData {
  id: string;
  imageUrl: string;
  description: string;
}

export interface PlaceData {
  name: string;
  oneLineIntroText: string;
  recommendation: string;
  startDateFromNow: string;
  startTime: number;
  deadline: string;
  coverImage: string;
  isClosed: boolean;
  isParticipating: boolean;
  participants: PlaceDataParticipantsProfile[];
  participantsCount: number;
  views: number;
  startDateAt: string;
  reviews: ReviewData[];
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
    detailLink: string;
    participationFee: number;
  };
}

export interface CreatePlaceData {
  name: string;
  isLightning: boolean;
  maxParticipantsNumber?: string;
  location: string;
  oneLineIntroText: string;
  participationFee: string;
  recommendation: string;
  startDateAt: Date;
  startTime: string;
  title: string;
  description: string;
  categories: string[];
  detailAddress: string;
  detailLink: string;
  reviewDescriptions: string[];
  coverImageURL?: string;
  coverImageFile?: File;
  reviewImagesURL?: string[];
  reviewImagesFile?: File[];
}

// need to change CreatePlaceOutput
export interface CreatePlaceOutput extends CreatePlaceData {}

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
  job: string;
  gender: string;
  shortBio: string;
  location: string;
  activities?: string;
  isYkClub?: boolean;
  MBTI?: string;
  drinkingStyle?: number;
  personality?: string;
}

export interface GetUserOutput extends CoreOutput {
  data: Userdata;
}

// My Xircle I've registered
export interface MyPlaceData {
  id: string;
  coverImage: string;
  name: string;
  oneLineIntroText: string;
  participantsCount: number;
  startDateFromNow: string;
  isClosed: boolean;
}

export interface GetMyPlaceOutput extends CoreOutput {
  places: MyPlaceData[];
}

// See Random Profile
interface UserProfile {
  id: string;
  profileImageUrl: string;
  location?: string;
  username: string;
  job: string;
  university: string;
  gender: Gender;
  age: number;
  shortBio: string;
  activities?: string;
  isYkClub?: boolean;
  MBTI?: string;
  drinkingStyle?: number;
  personality?: string;
}

export interface SeeRandomProfile extends CoreOutput {
  randomProfile: UserProfile;
}

// See User By Id
export interface SeeUserByIdOutput extends CoreOutput {
  user: UserProfile;
}

// Make reservation
export interface MakeReservationInput {
  placeId: string;
  isVaccinated: boolean;
}

export interface MakeReservationOutput extends CoreOutput {}

export interface CancelReservationInput {
  placeId: string;
  cancelReason: string;
  detailReason: string;
}

export interface CancelReservationOutput extends CoreOutput {}

// Get Reservation Participant number
export interface GetReservationParticipantNumberOutput extends CoreOutput {
  participantsNumber?: number;
}

// Get ParticipantList
export interface PlaceParticipantListData {
  participantListProfiles: MainFeedPlaceParticipantsProfile[];
  participantsInfo: {
    total_count: number;
    male_count: number;
    average_age: number;
  };
}

export interface GetPlaceParticipantListOutput extends CoreOutput {
  participants?: PlaceParticipantListData;
}

// My Room
export interface IRoom {
  id: string;
  receiver: {
    id: string;
    profileImageUrl: string;
    username: string;
  };
  lastMessage: {
    isMe: boolean;
    isRead: boolean;
    content: string;
  };
  latestMessageAt: Date;
}

export interface GetMyRooms extends CoreOutput {
  myRooms: IRoom[];
}

// My Room Messages
export interface IMessage {
  content: string;
  isMe: boolean;
  sentAt?: Date;
  isRead?: boolean;
}

export interface GetRoomMessagesOutput extends CoreOutput {
  messages: IMessage[];
  meta?: MetaTag;
}

// Send Message
export interface SendMessageInput {
  roomId: string;
  receiverId: string;
  content: string;
}
