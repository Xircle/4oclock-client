import { searchSchool } from "./3rdApi/searchSchool";
import { ApplicationStatus } from "./../v2/enums";
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
      role: string;
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
  isClosed: boolean;
  participantsCount: number;
  leftParticipantsCount: number;
  startDateFromNow: string;
  startDateAt: string;
  participants: Participants[];
  isParticipating: boolean;
  deadline: string;
  views: number;
  placeDetail: {
    description: string;
  };
}

export interface ParticipantsListData extends Participants {}

export interface GetPlacesByLocationOutput extends CoreOutput {
  places: PlaceFeedData[];
  eventBannerImageUrl: string;
}

// Get Place By Id
interface PlaceDataParticipantsProfile extends Participants {}

export interface Review {
  id: string;
  imageUrls: string[];
  isRepresentative: boolean;
  description: string;
  user_id: string;
  likesNumber: number;
  place_id: string;
  ratings?: number | null;
}

export interface PlaceData {
  name: string;
  coverImage: string;
  subImages: string[];
  oneLineIntroText: string;
  recommendation: string;
  startDateFromNow: string;
  startTime: number;
  deadline: string;
  isClosed: boolean;
  isLightning: boolean;
  isParticipating: boolean;
  participants: PlaceDataParticipantsProfile[];
  participantsCount: number;
  views: number;
  startDateAt: string;
  reviews: Review[];
  isLightning?: boolean;
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
    maxParticipantsNumber?: number;
  };
}

export interface AdminPlaceData {
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
  reviewDescription: string;
  coverImageUrl?: string;
  coverImageFile?: File;
  reviewImagesUrl?: string[];
  reviewImagesFile?: File[];
}

// need to change CreatePlaceOutput
export interface AdminPlaceOutput extends AdminPlaceData {}

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
  accountType?: string;
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
  fk_user_id: string;
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

export interface EditPlaceInput {
  placeId: string;
  state: AdminPlaceOutput;
}

export interface EditPlaceOutput extends CoreOutput {}

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
  hasUnreadMessage: boolean;
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
  isRead?: boolean;
  receiverId: string;
  content: string;
}

export interface GetReviewsOutput extends CoreOutput {
  reviews: Review[];
}

export interface CategoryData {
  id: string;
  name: string;
  image?: string;
  selected?: boolean;
}

export interface SeeAllCategoryOutput extends CoreOutput {
  data?: CategoryData[];
}

export interface ApplicationData {
  id: string;
  status: string;
  user_id: string;
  team_id: number;
  paid: boolean;
  createdAt: Date;
  isCanceled: boolean;
  image: string;
}

export interface GMALeaderData {
  id: string;
  username: string;
  profileImageUrl: string;
  shortBio?: string;
}
export interface TeamData {
  id: number;
  name: string;
  season?: number;
  startDate?: Date;
  description?: string;
  images?: string[];
  applications?: ApplicationData[];
  leader?: GMALeaderData;
  price?: number;
  meetingDay?: number;
  meetingHour?: number;
  maxParticipant?: number;
  areaInfo?: string;
  maleMinAge?: number;
  maleMaxAge?: number;
  femaleMinAge?: number;
  femaleMaxAge?: number;
  leaderIntro?: string;
}

export interface DetailTeamData extends TeamData {
  maleCount?: number;
  femaleCount?: number;
}
export interface GetTeamByIdData extends DetailTeamData {
  applications?: ApplicationData[];
}

export interface GetTeamByIdOutput extends CoreOutput {
  data: GetTeamByIdData;
}

export interface CreateApplicationInput {
  teamId: number;
  status?: ApplicationStatus;
  content?: string;
}

export interface MyApplication {
  id: string;
  status: ApplicationStatus;
  appliedAt: Date;
  teamId: number;
  teamName: string;
  isCanceled: boolean;
  paid?: boolean;
  teamImage: string;
  isCancelRequested?: boolean;
}

export interface MyApplicationsByStatus {
  approveds?: MyApplication[];
  pendings?: MyApplication[];
  disapproveds?: MyApplication[];
  enrolleds?: MyApplication[];
}
export interface GMALeaderData {
  leaderId: string;
  leaderName: string;
  leaderPhoneNumber: string;
  leaderProfileUrl: string;
}

export interface GetMyApplicationsOutput extends CoreOutput {
  applications?: MyApplicationsByStatus;
  leaderData?: GMALeaderData;
}

export interface EditApplicationInput {
  applicationId: string;
  status?: ApplicationStatus;
  isCanceled?: string;
  paid?: string;
  isCancelRequested?: string;
  cancelReason?: string;
}

export interface MyTeamsLeader {
  teamId: number;
  teamImage?: string;
  name: string;
  total: number;
  count: number;
}

export interface GetMyTeamsLeaderOutput extends CoreOutput {
  teams?: MyTeamsLeader[];
}

export interface ApplicantProfiles {
  username: string;
  gender: Gender;
  age: number;
  applicationId?: string;
  phoneNumber?: string;
  profileImg: string;
  userId?: string;
  isCancelRequested?: boolean;
}

export interface GetTeamApplications {
  maxParticipant: number; //
  curCount: number; //
  maleApproveCount: number; //
  femaleApproveCount: number; //
  maleApplyCount: number;
  femaleApplyCount: number;
  pendingApplicantProfiles: ApplicantProfiles[];
  approvedApplicantProfiles: ApplicantProfiles[];
  cancelRequestedApplicantProfiles: ApplicantProfiles[];
}

export interface GetTeamApplicationsOutput extends CoreOutput {
  data?: GetTeamApplications;
}

export interface GetTeamApplicationInput {
  param1?: string;
  param2?: number;
}

export interface GetApplicationByLeaderData {
  username: string;
  mbti?: string;
  shortBio?: string;
  job?: string;
  phoneNumber?: string;
  content?: string;
  status: ApplicationStatus;
  profileImage: string;
  age: number;
  gender: Gender;
  university: string;
}

export interface GetApplicationByLeaderOutput extends CoreOutput {
  data?: GetApplicationByLeaderData;
}

export interface SchoolInfo {
  schoolName: string;
  adres: string;
}

export interface SchoolsInfo {
  content: SchoolInfo[];
}

export interface SearchSchoolOutput {
  dataSearch: SchoolsInfo;
}

export interface CreatePlaceData {
  name: string;
  maxParticipantsNumber?: number;
  participationFee: string;
  startDateAt: string;
  description: string;
  detailAddress: string;
  coverImage?: File;
  subImages?: File[];
  placeId?: string;
  kakaoLink?: string;
  recommendation?: string;
  participating?: boolean;
  qAndA?: string[];
}

// need to change CreatePlaceOutput
export interface CreatePlaceOutput extends CreatePlaceData {}

export interface MyCreatedPlaceData {
  isClosed: boolean;
  id: string;
  coverImage: string;
  name: string;
  startDateFromNow: string;
  kakaoPlaceId?: string;
  recommendation?: string;
  subImages?: string[];
  team_id?: string | null;
  placeType: string;
  placeDetail: MyCreatedPlaceDetail;
  startDateAt: string;
}

export interface GetMyCreatedPlaceOutput extends CoreOutput {
  places: MyCreatedPlaceData[];
}
