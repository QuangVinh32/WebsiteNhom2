import React, { useState, useContext, ChangeEvent } from "react";
import "../pages/Login.scss";

import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assests/images/login.png";
import userIcon from "../assests/images/user.png";
import axios from "axios";
import { toast } from "react-toastify";
import { parseJwt } from "../helpers/common";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/login",
        credentials
      );
      localStorage.setItem("user", JSON.stringify(data));
      axios.defaults.headers.Authorization = "Bearer " + data.token;
      navigate("/admin/products");
      toast.success("Dang nhap thanh cong!");
    } catch (error) {
      toast.error("Dang nhap that bai!");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Đăng Nhập</h2>
                <Form>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="username"
                      required
                      id="username"
                      name="username"
                      onChange={handleInputChange}
                      value={credentials.username}
                      autoFocus
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="password"
                      required
                      id="password"
                      name="password"
                      onChange={handleInputChange}
                      value={credentials.password}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth_btn"
                    type="button"
                    onClick={handleLogin}
                  >
                    Đăng Nhập
                  </Button>
                </Form>
                <p>
                  Bạn Chưa Có Tài Khoản? <Link to="/register">Tạo Mới</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Login;
