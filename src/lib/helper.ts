export function parseHashTags(string): string {
  const parsedString: string[] = JSON.parse(string);
  return "#" + parsedString.join(" #");
}

