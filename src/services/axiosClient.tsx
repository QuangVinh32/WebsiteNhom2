import axios from "axios";
import { getUserInfo } from "../helpers/common";

const request = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 10000, // 10s
  headers: {
    "Content-Type": "application/json",
  },
});

// Can thiệp vào quá trình request lên server
request.interceptors.request.use(
  function (config) {
    // Gắn token vào header mỗi lần request
    const user = getUserInfo();
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user?.token}`;
    }
    return config;
  },
  function (error) {
    // Xử lý lỗi khi request lỗi
    return Promise.reject(error);
  }
);

// Can thiệp vào quá trình response từ server gửi về
request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
