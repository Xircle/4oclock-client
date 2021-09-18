// 추후에 이미지 최적할 때 쓰기
export default function optimizeImage(url: string, width?: number) {
  if (!url.includes("https://images.xircle.org")) return url;
  if (url.includes(".svg")) return url;

  let replaced = url.replace("://images.xircle.org", "://media.xircle.org"); // Cloudflare
//   let replaced = url.replace('://images', '://img'); // Cloudfront

  if (!width) {
    return replaced;
  }
  return replaced.concat(`?w=${width}`);
}
