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
        //로딩 show
        console.log("show");
        this.Loading.show();
        api.fetchCats(keyword).then(({ data }) => this.setState(data));
        //로딩 hide
        console.log("hide");
        this.Loading.hide();
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
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
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
