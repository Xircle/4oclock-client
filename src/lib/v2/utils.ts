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
  minAge: number;
  maxAge: number;
  selected: boolean;
}

export const IAgeData: AgeData[] = [
  {
    title: "20~21",
    minAge: 20,
    maxAge: 21,
    selected: true,
  },
  {
    title: "22~24",
    minAge: 22,
    maxAge: 24,
    selected: true,
  },
  {
    title: "25이상",
    minAge: 25,
    maxAge: 30,
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
