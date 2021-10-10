export function parseHashTags(string): string {
  const parsedString: string[] = JSON.parse(string);
  console.log(parsedString);
  return "#" + parsedString.join(" #");
}
