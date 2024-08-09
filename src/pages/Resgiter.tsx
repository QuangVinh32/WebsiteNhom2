import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../pages/Register.scss";
import register from "../assests/images/register.png";
import userIcon from "../assests/images/user.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // const baseUrlAuth = "http://13.212.151.155:8888/api";
  const baseUrlAuth = "http://localhost:8888/api";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //   const handleRegister = async (event) => {
  //     event.preventDefault();
  //     setLoading(true);

  //     const newUser = {
  //       username: username,
  //       password: password,
  //       email: email,
  //       fullName: fullName,
  //       phone: phone,
  //     };

  // try {
  //   const response = await fetch(baseUrlAuth + "/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newUser),
  //   });

  //   if (response.ok) {
  //     alert("đăng kí thành công");
  //     navigate("/login");
  //   } else {
  //     throw new Error("Đăng ký không thành công.");
  //   }
  // } catch (error) {
  //   console.log(error);
  //   setError(error.message);
  // } finally {
  //   setLoading(false);
  // }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="register__container d-flex justify-content-between">
              <div className="register__img">
                <img style={{ marginTop: "60px" }} src={register} alt="" />
              </div>
              <div className="register__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>
                <Form>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="username"
                      required
                      id="username"
                      autoFocus
                      //   onChange={(event) => setUsername(event.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="password"
                      required
                      id="password"
                      //   onChange={(event) => setPassword(event.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="email"
                      required
                      id="email"
                      //   onChange={(event) => setEmail(event.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="fullName"
                      required
                      id="fullName"
                      //   onChange={(event) => setFullName(event.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="phone"
                      required
                      id="phone"
                      //   onChange={(event) => setPhone(event.target.value)}
                    />
                  </FormGroup>
                  <Button
                    style={{
                      color: "black",
                      backgroundColor: "white",
                      //   border: "1px solid white",
                    }}
                    className="btn"
                    type="submit"
                  >
                    Create Account
                  </Button>
                </Form>
                <p>
                  Bạn đã có tài khoản hãy đăng nhập
                  <Link to="/login">Đăng Nhập</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
