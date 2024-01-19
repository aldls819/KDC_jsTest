class DarkModeToggle {
  //초기화
  isDarkMode = null;

  constructor({ $target, onSearch }) {
    const $wrapper = document.createElement("section");
    const $DarkModeToggle = document.createElement("input");
    this.$DarkModeToggle = $DarkModeToggle;
    this.$DarkModeToggle.type = "checkbox";

    $DarkModeToggle.className = "DarkModeToggle";
    $wrapper.appendChild($DarkModeToggle);
    $target.appendChild($wrapper);

    $DarkModeToggle.addEventListener("change", (e) => {
      this.setColorMode(e.target.checked);
    });

    this.initColorMode();
  }

  //초기화가 굉장히 중요하다!!!!!
  initColorMode() {
    //초기화 과정
    //isDarkMode, checkbox html attr 상태

    //matchMedia 사용해서 감지
    // 미디어 쿼리를 통해서 현재 다크모드인지 아닌지 상태를 받아옴
    this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    //다크모드인지 아닌지 체크
    this.$DarkModeToggle.checked = this.isDarkMode;
    this.setColorMode(this.isDarkMode);
  }

  setColorMode(isDarkMode) {
    document.documentElement.setAttribute(
      "color-mode",
      isDarkMode ? "dark" : "light"
    );
  }
}

export default DarkModeToggle;
