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
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
