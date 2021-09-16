import Avartar1 from "./Avartar1.png";
import MainPicDummy from "./MainPicDummy.jpg";

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

export const DummyAvartar = Avartar1;

export const feedDummyData: DummyData[] = [
  {
    placeImgSrc: MainPicDummy,
    feedClosed: true,
    feedParticipant: [
      Avartar1,
      Avartar1,
      Avartar1,
      Avartar1,
      Avartar1,
      Avartar1,
      Avartar1,
    ],
    feedLocation: "참살이",
    feedHeading: "bunt 28",
    feedDetail: "#카페 #조용 $감성 #책",
    feedTime: "내일",
    feedCondition: "20세 ~ 26세",
  },
  {
    placeImgSrc: MainPicDummy,
    feedClosed: false,
    feedTag: "오늘 마감",
    feedParticipant: [Avartar1, Avartar1, Avartar1, Avartar1],
    feedLocation: "참살이",
    feedHeading: "bunt 28",
    feedDetail: "#카페 #조용 $감성 #책",
    feedTime: "내일",
    feedCondition: "20세 ~ 26세",
  },
  {
    placeImgSrc: MainPicDummy,
    feedTag: "D-1",
    feedParticipant: [Avartar1, Avartar1],
    feedLocation: "참살이",
    feedHeading: "춘자",
    feedDetail: "#과일소주 #신나는 #시끄러운",
    feedTime: "내일",
    feedCondition: "20세 ~ 26세",
  },
  {
    placeImgSrc: MainPicDummy,
    feedParticipant: [Avartar1, Avartar1, Avartar1, Avartar1, Avartar1],
    feedLocation: "참살이",
    feedHeading: "봉구비어",
    feedDetail: "#맥주 #북적북적 #시원",
    feedTime: "이번주 목요일",
    feedCondition: "20세 ~ 26세",
  },
  {
    placeImgSrc: MainPicDummy,
    feedClosed: true,
    feedParticipant: [],
    feedLocation: "참살이",
    feedHeading: "역전 할머니 맥주",
    feedDetail: "#맥주 #북적북적 #시원",
    feedTime: "이번주 금요일",
    feedCondition: "25세 ~ 29세",
  },
  {
    placeImgSrc: MainPicDummy,
    feedTag: "D-2",
    feedParticipant: [Avartar1, Avartar1],
    feedLocation: "참살이",
    feedHeading: "춘자",
    feedDetail: "#과일소주 #신나는 #시끄러운",
    feedTime: "내일",
    feedCondition: "20세 ~ 26세",
  },
  {
    placeImgSrc: MainPicDummy,
    feedTag: "D-3",
    feedParticipant: [Avartar1, Avartar1],
    feedLocation: "참살이",
    feedHeading: "춘자",
    feedDetail: "#과일소주 #신나는 #시끄러운",
    feedTime: "내일",
    feedCondition: "20세 ~ 26세",
  },
  {
    placeImgSrc: MainPicDummy,
    feedTag: "D-1",
    feedParticipant: [Avartar1, Avartar1],
    feedLocation: "참살이",
    feedHeading: "춘자",
    feedDetail: "#과일소주 #신나는 #시끄러운",
    feedTime: "내일",
    feedCondition: "20세 ~ 26세",
  },
];
