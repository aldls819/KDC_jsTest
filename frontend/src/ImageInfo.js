import api from "./api.js";

class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    this.setFade(nextData.visible);
  }

  setFade(visible) {
    if (visible) {
      this.$imageInfo.classList.add("show");
    } else {
      this.$imageInfo.classList.remove("show");
    }
  }

  //모달에서 상세 정보 보여주기
  //async - await 적용 가능
  async showDetail(data) {
    const detailInfo = await api.fetchCatDetail(data.cat.id);
    if (detailInfo) {
      this.setState({
        visible: true,
        cat: detailInfo.data,
      });
    }
  }

  // 모달 닫기
  closeImageInfo() {
    console.log("닫기");
    this.setState({
      visible: false,
      cat: undefined,
    });
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.cat;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      // this.$imageInfo.style.display = "block";

      //x 표시 눌러서 닫기
      // this.$imageInfo.querySelector(".close").addEventListener("click", (e) => {
      //   this.closeImageInfo();
      // });

      // esc 눌러서 닫기
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.closeImageInfo();
        }
      });
      this.$imageInfo.addEventListener("click", (e) => {
        console.log(e.target.className);
        if (
          e.target.className === "ImageInfo" ||
          e.target.className === "close"
        ) {
          this.closeImageInfo();
        }
      });
    } else {
      // this.$imageInfo.style.display = "none";
    }
  }
}

export default ImageInfo;
