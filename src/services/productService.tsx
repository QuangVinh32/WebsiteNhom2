import { CreateProduct } from "../pagesAdmin/ProductForm";
import request from "./axiosClient";

const END_POINT = "v1/product/";

const productService = {
  getAll(params: any) {
    return request.get(END_POINT + "find-all-product", {
      params,
    });
  },
  get(id: number) {
    return request.get(END_POINT + "find-by-id/" + id);
  },
  create(payload: CreateProduct) {
    return request.post(END_POINT + "create-product/", payload);
  },
  update(id: number, payload: any) {
    return request.put(END_POINT + "update-product/" + id, payload);
  },
  delete(id: number) {
    return request.delete(END_POINT + "delete-product/" + id);
  },
};

export default productService;
