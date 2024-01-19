export default function uniqueArray(list) {
  //중복 제거해서 Set으로 넣어주고 다시 Array로
  return Array.from(new Set(list));
}
