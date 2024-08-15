import request from "./axiosClient";

const END_POINT = "v1/order/";

const orderService = {
  getAll(params: any) {
    return request.get(END_POINT + "find-all-order", {
      params,
    });
  },
  get(id: number) {
    return request.get(END_POINT + "find-order-by-id/" + id);
  },
  create(payload: any) {
    return request.post(END_POINT + "create-order/", payload);
  },
  update(id: number, payload: any) {
    return request.put(END_POINT + "update-order/" + id, payload);
  },
  delete(id: number) {
    return request.delete(END_POINT + "delete-order/" + id);
  },
};

export default orderService;
