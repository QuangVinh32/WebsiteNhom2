import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Spinner } from "reactstrap";
import OrderFormModal from "../components/admin/OrderFormModal";
import { formatCurrency } from "../helpers/common";
import OrderModal from "../components/admin/OderModal";
import orderService from "../services/orderService";
// import OrderModal from "../components/admin/OrderModal";

type OrderDetail = {
  count: number;
  price: number;
  productName: string;
  image: string;
};

type Order = {
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
};

type OrderInfo = Omit<Order, "orderId"> & { orderId?: number };

const AdminOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        search: searchTerm,
        size: 4, // Hoặc số lượng trang bạn muốn
      };
      const response = await orderService.getAll(params);
      setOrders(response.data.content);
      setTotalPages(response.data.totalPages);
      setError("");
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchOrderById = async (orderId: number) => {
    try {
      const response = await orderService.get(orderId);
      setSelectedOrder(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError("Failed to load order details.");
    }
  };

  const handleDelete = async () => {
    if (selectedOrder?.orderId === undefined) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/v1/order/delete-order/${selectedOrder.orderId}`
      );
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      setError("Failed to delete order.");
    } finally {
      setModalOpen(false);
    }
  };

  const handleView = async (order: Order) => {
    setModalOpen(true);
    await fetchOrderById(order.orderId);
  };

  const handleEdit = async (order: Order) => {
    setFormModalOpen(true);
    await fetchOrderById(order.orderId);
  };

  const handleSaveOrder = async (orderInfo: OrderInfo) => {
    try {
      if (orderInfo.orderId) {
        await axios.put(
          `http://localhost:8080/api/v1/order/update-order/${orderInfo.orderId}`,
          orderInfo
        );
      } else {
        await axios.post(
          "http://localhost:8080/api/v1/order/create-order",
          orderInfo
        );
      }
      fetchOrders();
    } catch (error) {
      console.error("Error saving order:", error);
      setError(
        orderInfo.orderId
          ? "Failed to update order."
          : "Failed to create order."
      );
    } finally {
      setFormModalOpen(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container mt-4">
      <h1>Admin Orders</h1>
      <Button color="primary" onClick={() => setFormModalOpen(true)}>
        Add Order
      </Button>
      <div
        style={{ marginTop: "15px" }}
        className="d-flex justify-content-between mb-3"
      >
        <div>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control"
            autoFocus
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="form-control"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Total</th>
                <th>Full Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Order Date</th>
                <th>Sale Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{formatCurrency(order.total)}</td>
                  <td>{order.fullName}</td>
                  <td>{order.address}</td>
                  <td>{order.phone}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.saleDate || "N/A"}</td>
                  <td>{order.status}</td>
                  <td>
                    <Button
                      color="info"
                      size="sm"
                      onClick={() => handleView(order)}
                      className="me-2"
                    >
                      View
                    </Button>
                    <Button
                      color="warning"
                      size="sm"
                      onClick={() => handleEdit(order)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => {
                        setSelectedOrder(order);
                        setModalOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between">
            <div>
              <Button
                color="secondary"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="me-2"
              >
                Previous
              </Button>
              <Button
                color="secondary"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
            <div>
              Page {currentPage} of {totalPages}
            </div>
          </div>

          <OrderModal
            isOpen={modalOpen}
            toggle={() => setModalOpen(false)}
            orderInfo={selectedOrder}
            closeModal={() => setModalOpen(false)}
            onDelete={handleDelete}
          />

          <OrderFormModal
            isOpen={formModalOpen}
            toggle={() => setFormModalOpen(false)}
            onSave={handleSaveOrder}
            orderInfo={selectedOrder}
          />
        </>
      )}
    </div>
  );
};

export default AdminOrder;
