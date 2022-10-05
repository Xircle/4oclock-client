export const DayNumToKor = (day: number) => {
  let result;
  switch (day) {
    case 0:
      result = "일";
      break;
    case 1:
      result = "월";
      break;
    case 2:
      result = "화";
      break;
    case 3:
      result = "수";
      break;
    case 4:
      result = "목";
      break;
    case 5:
      result = "금";
      break;
    case 6:
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

const day = ["월", "화", "수", "목", "금", "토", "일"];

export let myTimeData: TimeData[] = [];

for (let i = 0; i < 7; i++) {
  myTimeData.push({ day: day[i], numV: i, selected: true });
}
