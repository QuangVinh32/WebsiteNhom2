// Trong OrderModal.tsx

import React from "react";
import { formatCurrency } from "../../helpers/common";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
} from "reactstrap";

interface OrderDetail {
  count: number;
  price: number;
  productName: string;
  image: string;
}

interface OrderInfo {
  orderId: number;
  total: number;
  fullName: string;
  address: string;
  phone: number;
  orderDate: string;
  saleDate: string | null;
  status: string;
  note: string;
  orderDetailDTOS?: OrderDetail[];
}

interface OrderModalProps extends ModalProps {
  closeModal: () => void;
  orderInfo: OrderInfo | null;
  isOpen: boolean; // Thêm thuộc tính isOpen
}

function OrderModal({
  closeModal,
  orderInfo,
  isOpen,
  ...props
}: OrderModalProps) {
  return (
    <Modal isOpen={isOpen} toggle={closeModal} {...props}>
      <ModalHeader toggle={closeModal}>Order Details</ModalHeader>
      <ModalBody>
        {orderInfo ? (
          <div>
            <p>
              <strong>ID:</strong> {orderInfo.orderId}
            </p>
            <p>
              <strong>Total:</strong> {orderInfo.total}
            </p>
            <p>
              <strong>Full Name:</strong> {orderInfo.fullName}
            </p>
            <p>
              <strong>Address:</strong> {orderInfo.address}
            </p>
            <p>
              <strong>Phone:</strong> {orderInfo.phone}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(orderInfo.orderDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Sale Date:</strong>{" "}
              {orderInfo.saleDate
                ? new Date(orderInfo.saleDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {orderInfo.status}
            </p>
            <p>
              <strong>Note:</strong> {orderInfo.note}
            </p>
            <h5>Order Details</h5>
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orderInfo.orderDetailDTOS?.map((detail, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={detail.image}
                        alt={detail.productName}
                        style={{ width: "50px" }}
                      />
                    </td>
                    <td>{detail.productName}</td>
                    <td>{detail.count}</td>
                    <td>{formatCurrency(detail.price)}</td>
                    <td>{formatCurrency(detail.count * detail.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              <strong>Total Price of All Products:</strong>{" "}
              {formatCurrency(
                orderInfo.orderDetailDTOS?.reduce(
                  (acc, detail) => acc + detail.count * detail.price,
                  0
                ) || 0
              )}
            </p>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default OrderModal;
