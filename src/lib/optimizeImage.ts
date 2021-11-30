const CDN_IMAGE_DOMAIN = process.env.REACT_APP_CDN_IMAGE_DOMAIN;
const IMAGE_ORIGIN = process.env.REACT_APP_IMAGE_ORIGIN;
interface options {
  width: number;
  height: number;
  quality?: number;
}
export default function optimizeImage(
  url: string,
  resizeOptions?: options
): string {
  if (!url) return "";
  if (!url.includes(IMAGE_ORIGIN!)) return url;
  if (url.includes(".svg")) return url;

  let replaced = url.replace(IMAGE_ORIGIN!, CDN_IMAGE_DOMAIN!); // Cloudfront

  if (!resizeOptions) {
    return replaced;
  }
  const { width, height, quality } = resizeOptions;
  return replaced.concat(`?w=${width}&h=${height}&q=${quality || 80}`);
}
