import "../styles/RegisterForm.css";
import "../global.css";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { registerUser } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log("Login attempted with:", { email, password });
      await registerUser(email, password)
      .catch((err) => console.log("Caught error in register: " + err));
    }
  };

  return (
    <div className="main">
      <div className="login-wrapper">
        <div className="login-form-container">
          <h2 className="login-title">Register</h2>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="login-button">
              Register
            </Button>
            <h6 className="sign-up-text">
              Already have an account?{" "}
              <Link className="sign-up-link" to="/">
                Login
              </Link>{" "}
              today!
            </h6>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
