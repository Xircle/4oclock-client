export function AgeNumberToString(age: number): string {
  if (age === 0) {
    return "미정";
  } else if (age >= 19 && age <= 24) {
    return "20초반";
  } else if (age >= 24 && age <= 27) {
    return "20중반";
  } else if (age >= 28 && age <= 29) {
    return "20후반";
  } else if (age >= 30 && age <= 33) {
    return "30초반";
  } else if (age >= 34 && age <= 37) {
    return "30중반";
  } else if (age >= 38 && age <= 39) {
    return "30후반";
  } else {
    return "비밀~^^";
  }
}

export const getScrollTop = () => {
  if (!document.body) return 0;
  const scrollTop = document.documentElement
    ? document.documentElement.scrollTop || document.body.scrollTop
    : document.body.scrollTop;
  return scrollTop;
};

export const getScrollBottom = () => {
  if (!document.body) return 0;
  const { scrollHeight } = document.body;
  const { innerHeight } = window;
  const scrollTop = getScrollTop();
  return scrollHeight - innerHeight - scrollTop;
};

export const encodeUrlSlug = (url: string): string => {
  return url.replaceAll(" ", "-");
};

export const decodeUrlSlug = (url: string): string => {
  return url.replaceAll("-", " ");
};

export const CalculateCloseDate = (startDateFromNow: string): string => {
  if (startDateFromNow.includes("일요일")) {
    return "토요일 자정 신청 마감";
  } else if (startDateFromNow.includes("토요일")) {
    return "금요일 자정 신청 마감";
  } else {
    return "NA";
  }
};

export const ModifyDeadline = (deadline: string): string => {
  if (deadline.includes("D")) {
    return "신청 ".concat(deadline);
  } else {
    return deadline;
  }
};
