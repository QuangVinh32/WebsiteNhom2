import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/Register.scss";
import register from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    phone: "",
    image: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        formData
      );
      console.log(response.data);
      alert("Registration successful!");
      navigate("/login");
    } catch (error: any) {
      console.error(
        error.response?.data || error.message || "Unknown error occurred"
      ); // handle error response
      alert("Registration failed!");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="register__container d-flex justify-content-between">
              <div className="register__img">
                <img
                  style={{ marginTop: "60px" }}
                  src={register}
                  alt="Register"
                />
              </div>
              <div className="register__form">
                <div className="user">
                  <img src={userIcon} alt="User Icon" />
                </div>
                <h2>Register</h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Phone"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Image URL"
                      required
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    style={{ color: "black", backgroundColor: "white" }}
                    className="btn"
                    type="submit"
                  >
                    Create Account
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to="/login">Login here</Link>
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
