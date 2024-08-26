import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

interface OrderDetail {
  count: number;
  price: number;
  productName: string;
  image: string;
}

interface OrderInfo {
  orderId?: number;
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

interface OrderFormModalProps {
  isOpen: boolean;
  toggle: () => void;
  orderInfo: OrderInfo | null;
  onSave: (order: OrderInfo) => Promise<void>;
}

function OrderFormModal({
  isOpen,
  toggle,
  orderInfo,
  onSave,
}: OrderFormModalProps) {
  const [order, setOrder] = useState<OrderInfo>({
    orderId: orderInfo?.orderId,
    total: orderInfo?.total || 0,
    fullName: orderInfo?.fullName || "",
    address: orderInfo?.address || "",
    phone: orderInfo?.phone || 0,
    orderDate: orderInfo?.orderDate || "",
    saleDate: orderInfo?.saleDate || null,
    status: orderInfo?.status || "",
    note: orderInfo?.note || "",
    orderDetailDTOS: orderInfo?.orderDetailDTOS || [],
  });

  useEffect(() => {
    if (orderInfo) {
      setOrder(orderInfo);
    }
  }, [orderInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: name === "total" ? parseFloat(value) : value,
    }));
  };

  const handleSave = async () => {
    await onSave(order);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {orderInfo ? "Edit Order" : "Add Order"}
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="total">Total</Label>
            <Input
              type="number"
              name="total"
              id="total"
              value={order.total}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="fullName">Full Name</Label>
            <Input
              type="text"
              name="fullName"
              id="fullName"
              value={order.fullName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              value={order.address}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input
              type="text"
              name="phone"
              id="phone"
              value={order.phone}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="orderDate">Order Date</Label>
            <Input
              type="date"
              name="orderDate"
              id="orderDate"
              value={order.orderDate}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="saleDate">Sale Date</Label>
            <Input
              type="date"
              name="saleDate"
              id="saleDate"
              value={order.saleDate || ""}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input
              type="text"
              name="status"
              id="status"
              value={order.status}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="note">Note</Label>
            <Input
              type="textarea"
              name="note"
              id="note"
              value={order.note}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default OrderFormModal;
