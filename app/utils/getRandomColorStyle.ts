export function getRandomColorStyle(str: string, tagName: string) {
  if (["статья", "article", "artikel"].includes(tagName.toLowerCase())) {
    return "indigo";
  }
  if (["видео", "video"].includes(tagName.toLowerCase())) {
    return "brick";
  }
  const palette = ["indigo", "brick", "jungle", "clay", "slate"];
  const letterNumber = tagName!.charCodeAt(0) % palette.length;
  return str + palette[letterNumber];
}
