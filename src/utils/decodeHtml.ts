const decodeTable = {
  nbsp: " ",
  amp: "&",
  quot: '"',
  lt: "<",
  gt: ">",
} as const;

const decodeReg = /&(nbsp|amp|quot|lt|gt);/g;

export const decodeHtml = (encodedString: string): string => {
  return encodedString
    .replace(decodeReg, (_match, entity) => {
      return decodeTable[entity as keyof typeof decodeTable];
    })
    .replace(/&#(\d+);/gi, (_match, numStr) => {
      return String.fromCharCode(parseInt(numStr, 10));
    });
};