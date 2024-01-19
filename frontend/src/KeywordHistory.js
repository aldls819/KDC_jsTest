class KeywordHistory {
  $keywordHistory = null;
  data = null;

  constructor({ $target, onSearch }) {
    const $keywordHistory = document.createElement("ul");
    this.$keywordHistory = $keywordHistory;
    this.$keywordHistory.className = "KeywordHistory";
    $target.appendChild(this.$keywordHistory);

    this.data = ["아", "고양이", "캣"];

    this.onSearch = onSearch;
    this.init();
    this.render();
  }

  //로컬 스토리지에서 데이터 가져오기
  init() {
    //data 가공 -> split 메소드를 사용해서 문자열을 배열로 변환
    //null 일 때 예외처리
    const data = this.getHistory();
    this.setState(data);
  }

  addKeyword(keyword) {
    // 최근 키워드 저장
    //배열로 push
    //null 일 때의 예외처리
    let keywordHistory = this.getHistory();
    keywordHistory.unshift(keyword);
    //최근 검색어 5개 제한
    keywordHistory = keywordHistory.slice(0, 5);
    //join 사용해서 string 으로
    localStorage.setItem("keywordHistory", keywordHistory.join(","));
    this.init();
  }

  getHistory() {
    return localStorage.getItem("keywordHistory") === null
      ? []
      : localStorage.getItem("keywordHistory").split(",");
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$keywordHistory.innerHTML = this.data
      .map(
        (keyword) => `
      <li><button>${keyword}</button></li>`
      )
      .join("");

    this.$keywordHistory
      .querySelectorAll("li button")
      .forEach(($item, index) => {
        $item.addEventListener("click", () => {
          console.log($item);
          console.log(index);
          console.log(this.data[index]);
          this.onSearch(this.data[index]);
        });
      });
  }
}
