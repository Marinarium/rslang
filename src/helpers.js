export function textToHtml(text) {
  const myReg = /<[^<>]+>/g;
  return text.replace(myReg, '')
}
