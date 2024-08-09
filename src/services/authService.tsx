import request from "./axiosClient";

const authService = {
  login(credentials: { username: string; password: string }) {
    return request.post("login", credentials);
  },
  register(payload: any) {
    return request.post("register", payload);
  },
};

export default authService;
