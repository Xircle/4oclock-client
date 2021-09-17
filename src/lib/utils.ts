export function AgeNumberToString(age: number): string {
  if (age >= 19 || age >= 23) {
    return "20초반";
  } else if (age >= 24 || age >= 27) {
    return "20중반";
  } else if (age >= 28 || age >= 29) {
    return "20후반";
  } else if (age >= 30 || age >= 33) {
    return "30초반";
  } else if (age >= 34 || age >= 37) {
    return "30중반";
  } else if (age >= 38 || age >= 39) {
    return "30후반";
  } else {
    return "비밀~^^";
  }
}
