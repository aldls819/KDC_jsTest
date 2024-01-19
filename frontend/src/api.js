const API_ENDPOINT = "http://localhost:4001";

const REQUEST_ERROR = {
  500: { msg: "요청 실패" },
};

//request에서 에러처리까지 한번에 가능
const request = async (url) => {
  try {
    //result의 값이 생길 때까지 아래 코드는 대기
    const result = await fetch(url);
    if (result.status === 200) {
      return result.json();
    } else {
      throw REQUEST_ERROR[result.status];
    }
  } catch (error) {
    alert(error.msg);
    return { data: null };
  }
};

const api = {
  fetchCats: (keyword) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCatsPage: (keyword, page) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`);
  },
  fetchRandomCats: () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },
  fetchCatDetail: (id) => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};
