//테스트 모듈을 불러온다
import uniqueArray from "../utils/uniqueArray.js";

//describe로 시작 -> jest에서 테스트 그룹을 정의하는 데 사용
describe("uniqueArray.js", () => {
  //테스트 케이스 1
  test("중복 제거 확인 number", () => {
    //예상 결과는 [0, 1]
    expect(uniqueArray([0, 1, 1])).toStrictEqual([0, 1]);
  });
  //테스트 케이스 2
  test("중복 제거 확인 string", () => {
    //예상 결과는 ['가'. '나', '다']
    expect(uniqueArray(["가", "나", "나", "다"])).toStrictEqual([
      "가",
      "나",
      "다",
    ]);
  });
});
