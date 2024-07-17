import React from "react";
import { Link, NavLink } from "react-router-dom";
import CartItem from "./CartItem";
import { useShoppingContext } from "../contexts/ShoppingContext";
import { formatCurrency } from "../helpers/common";
import "../components/Header.scss"; // Đảm bảo bạn đã nhập tệp CSS của mình

const Header = () => {
  const { cartItems, cartQty, totalPrice } = useShoppingContext();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <strong style={{ color: "orangered" }}>VINH DEV DEMO</strong>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "blue" : "black",
                })}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/products"
                style={({ isActive }) => ({
                  color: isActive ? "orangered" : "black",
                })}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/admin/manager"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "black",
                })}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="navbar-input">
            <input
              style={{ fontStyle: "italic", fontSize: "17px", padding: "5px" }}
              type="text-input-1"
              placeholder="Tìm kiếm sản phẩm..."
            />
            <i
              style={{
                width: "50px",
                padding: "11.75px",
                backgroundColor: "orangered",
                textAlign: "center",
              }}
              className="fa-sharp fa-solid fa-magnifying-glass"
            ></i>
          </div>
        </div>

        <div className="ml-auto">
          <div style={{ marginTop: "7px" }} className="">
            <span>Lê Quang Vinh</span>
            <i
              style={{ fontSize: "25px", marginLeft: "5px" }}
              className="fa-brands fa-github"
            ></i>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownCart"
                data-bs-auto-close="outside"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  style={{ marginLeft: "100px" }}
                  className="fas fa-shopping-cart"
                ></i>
                <span className="position-absolute top-0 start-1 badge badge-pill bg-danger">
                  {cartQty}
                </span>
              </a>

              <ul
                className="dropdown-menu dropdown-menu-end cart-dropdown"
                aria-labelledby="navbarDropdownCart"
              >
                <li>
                  <h3 className="dropdown-item">Cart</h3>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        {cartItems.map((item) => {
                          return <CartItem key={item.productId} {...item} />;
                        })}
                      </tbody>
                    </table>
                  </div>
                </li>

                <li>
                  <span className="float-start ms-2">
                    <strong>Total: {formatCurrency(totalPrice)}</strong>
                  </span>
                  <Link
                    to="/checkout"
                    className="btn btn-sm btn-success float-end me-2"
                  >
                    Checkout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
