import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pagesAdmin/AdminSidebar.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AdminSidebar: React.FC = () => {
  // Dòng này lấy đối tượng vị trí hiện tại, bao gồm thông tin về đường dẫn hiện tại.
  const location = useLocation();

  return (
    <div className="admin-sidebar-1">
      <h3 style={{ textAlign: "center", padding: "15px", color: "orangered" }}>
        Admin Menu
      </h3>
      <ul className="list-unstyled-1">
        <li className={location.pathname === "/admin/products" ? "active" : ""}>
          <Link to="/admin/products">
            <i className="fas fa-box"></i> Quản lý sản phẩm
          </Link>
        </li>
        <li
          className={location.pathname === "/admin/categories" ? "active" : ""}
        >
          <Link to="/admin/categories">
            <i className="fas fa-list"></i> Quản lý danh mục
          </Link>
        </li>
        <li className={location.pathname === "/admin/users" ? "active" : ""}>
          <Link to="/admin/users">
            <i className="fas fa-users"></i> Quản lý người dùng
          </Link>
        </li>
        <li className={location.pathname === "/admin/orders" ? "active" : ""}>
          <Link to="/admin/orders">
            <i className="fas fa-shopping-cart"></i> Quản lý đơn hàng
          </Link>
        </li>
        <li className={location.pathname === "/admin/revenue" ? "active" : ""}>
          <Link to="/admin/revenue">
            <i className="fas fa-chart-line"></i> Quản lý doanh thu
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
