// import { CreateProduct } from "../pagesAdmin/ProductForm";
import request from "./axiosClient";

const END_POINT = "v1/categories/";

const categoryService = {
  getAll(params: any) {
    return request.get(END_POINT + "find-all-category", {
      params,
    });
  },
  get(id: number) {
    return request.get(END_POINT + "find-by-id/" + id);
  },
  create(payload: any) {
    return request.post(END_POINT + "create-category/", payload);
  },
  update(id: number, payload: any) {
    return request.put(END_POINT + "update-category/" + id, payload);
  },
  delete(id: number) {
    return request.delete(END_POINT + "delete-category/" + id);
  },
};

export default categoryService;
