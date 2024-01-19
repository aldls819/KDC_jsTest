console.log("app is running!");

class App {
  $target = null;
  data = [];
  page = 1;

  //클래스 실행 시 초기화 -> constructor
  constructor($target) {
    this.$target = $target;

    this.Loading = new Loading({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.Loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          //데이터 없으면 빈 배열로 처리
          this.setState(data ? data : []);
          this.Loading.hide();
          // 로컬에 저장
          this.saveResult(data);
        });
      },
      onRandomSearch: () => {
        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          this.Loading.hide();
        });
      },
    });

    this.DarkModeToggle = new DarkModeToggle({
      $target,
      // onSearch: (keyword) => {
      //   api.fetchCats(keyword).then(({ data }) => this.setState(data));
      // },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (cat) => {
        this.imageInfo.showDetail({
          visible: true,
          cat,
        });
      },
      //이 부분 다시 보기
      // 배열 합칠 때는 concat, 요소 합칠 때는 push
      onNextPage: () => {
        console.log("다음 페이지 로딩");
        this.Loading.show();
        const keywordHistory =
          localStorage.getItem("keywordHistory") === null
            ? []
            : localStorage.getItem("keywordHistory").split(",");
        const lastKeyword = keywordHistory[0];
        const page = this.page + 1;
        //새로운 api에 의해서 새로운 데이터를 기존 데이터에 추가한다
        api.fetchCats("cat", page).then(({ data }) => {
          let newData = this.data.concat(data);
          this.setState(newData);
          this.page = page;

          this.Loading.hide();
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });

    this.init();
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  //받은 검색결과 값을 localStorage에 저장하는 메소드
  saveResult(result) {
    console.log(result);
    //JSON.stringify 메소드 사용해서 string으로 저장
    localStorage.setItem("lastResult", JSON.stringify(result));
  }

  //init 메소드
  init() {
    const result =
      localStorage.getItem("lastResult") === null
        ? []
        : JSON.parse(localStorage.getItem("lastResult"));
    this.setState("lastResult");
  }
}
