const CDN_IMAGE_DOMAIN = "https://dh2n68u8fomh1.cloudfront.net";
const IMAGE_ORIGIN = process.env.REACT_APP_IMAGE_ORIGIN;

export default function optimizeImage(url: string, width?: number): string {
  if (!url.includes(IMAGE_ORIGIN!)) return url;
  if (url.includes(".svg")) return url;

  let replaced = url.replace(IMAGE_ORIGIN!, CDN_IMAGE_DOMAIN); // Cloudfront

  if (!width) {
    return replaced;
  }
  return replaced.concat(`?w=${width}`);
}
