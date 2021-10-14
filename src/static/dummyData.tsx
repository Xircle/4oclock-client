import Avartar1 from "./Avartar1.png";
import MainPicDummy from "./MainPicDummy.jpg";
import DefaultAvatar from "./DefaultImage.png";

interface DummyData {
  placeImgSrc: string;
  feedClosed?: boolean;
  feedTag?: string;
  feedParticipant: string[];
  feedLocation?: string;
  feedHeading: string;
  feedDetail?: string;
  feedTime?: string;
  feedCondition?: string;
}

interface DummyProfile {
  userName: string;
  privacy: boolean;
  age: number;
  genderMale: boolean;
  description: string;
  category: string;
  interest: string[] | null;
  location?: string | null;
  profilePic: string;
  university: string;
}

export const DummyProfileData: DummyProfile = {
  userName: "가나다",
  privacy: true,
  age: 21,
  genderMale: true,
  description: "반가워요",
  category: "디자이너",
  interest: ["가나다", "라마바", "아자차", "#스타트업", "#한강에서 치맥"],
  location: "서울특별시 성동구",
  profilePic: Avartar1,
  university: "고려대학교",
};

