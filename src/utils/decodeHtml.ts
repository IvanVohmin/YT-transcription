const decodeTable: { [key: string]: string } = {
    "nbsp": " ",
    "amp" : "&",
    "quot": "\"",
    "lt"  : "<",
    "gt"  : ">"
  };
const decodeReg = /&(nbsp|amp|quot|lt|gt);/g;

export const decodeHtml = (encodedString: string) => {
  return encodedString.replace(decodeReg, (match, entity) => {
    return decodeTable[entity];
  }).replace(/&#(\d+);/gi, (match, numStr) => {
    return String.fromCharCode(parseInt(numStr, 10));
  });
}