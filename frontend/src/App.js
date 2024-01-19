console.log("app is running!");

class App {
  $target = null;
  data = [];

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
          this.setState(data);
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
    this.setState(lastResult);
  }
}
