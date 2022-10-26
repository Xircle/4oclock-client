export const DayNumToKor = (day?: string) => {
  let result;
  switch (day) {
    case "0":
      result = "일";
      break;
    case "1":
      result = "월";
      break;
    case "2":
      result = "화";
      break;
    case "3":
      result = "수";
      break;
    case "4":
      result = "목";
      break;
    case "5":
      result = "금";
      break;
    case "6":
      result = "토";
      break;
  }
  return result;
};

export interface TimeData {
  day: string;
  numV: number;
  selected: boolean;
}

export const dayArr = ["일", "월", "화", "수", "목", "금", "토"];

export const ITimeData: TimeData[] = [];

for (let i = 0; i < 7; i++) {
  ITimeData.push({ day: dayArr[i], numV: i, selected: true });
}

export interface AgeData {
  title: string;
  maleMinAge?: number;
  maleMaxAge?: number;
  femaleMinAge?: number;
  femaleMaxAge?: number;
  selected: boolean;
}

export const IAgeData: AgeData[] = [
  {
    title: "A.남자(20-23살) 여자(19-22살)",
    maleMinAge: 20,
    maleMaxAge: 23,
    femaleMinAge: 19,
    femaleMaxAge: 22,
    selected: true,
  },
  {
    title: "B.남자(23-26살) 여자(22-25살)",
    maleMinAge: 23,
    maleMaxAge: 26,
    femaleMinAge: 22,
    femaleMaxAge: 25,
    selected: true,
  },
  {
    title: "C.남자(26이상) 여자(25이상)",
    maleMinAge: 26,
    femaleMinAge: 25,
    selected: true,
  },
];

export const RoleHashTable = {
  Client: "크루",
  Owner: "리더",
  Banned: "Banned",
  Admin: "운영진",
};

const openInNewTab = (url) => {
  window.open(url, "_blank");
};
export const InquiryCTA = () => {
  openInNewTab("https://open.kakao.com/o/shdu1PFe");
};

export const InstagramCTA = () => {
  openInNewTab("https://instagram.com/kevin.club_official?igshid=MDE2OWE1N2Q=");
};
