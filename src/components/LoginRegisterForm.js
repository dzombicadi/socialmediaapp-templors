import "../styles/LoginRegisterForm.css";
import "../global.css";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useCallback } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

<<<<<<< HEAD
import { Outlet, Link } from "react-router-dom";
import { loginUser } from "../authutils.ts";
=======
import { Link } from "react-router-dom";
>>>>>>> e3a628a4a78fd86e923f8e8ba2b56bd4eb1b152c

function LoginRegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = useCallback(

    async event => {
      event.preventDefault();

      const validateForm = () => {
        const newErrors = {};
        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6)
          newErrors.password = "Password must be at least 6 characters";
        return newErrors;
      };
      const formErrors = validateForm();
      
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
      } else {
        setErrors({});
        console.log("Login attempted with:", { email, password });
        await loginUser(email, password)
        .then((userCred) => console.log(userCred.user.email))
        .catch((err) => {
          console.log("Error on login: " + err);
        })
      }
  }, [email, password]);

  return (
    <div className="main">
      <div className="login-wrapper">
        <div className="login-form-container">
          <h2 className="login-title">Login</h2>
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

            <Button type="submit" className="login-button">
              Login
            </Button>
            <h6 className="sign-up-text">
              No account?{" "}
              <Link className="sign-up-link" to="/register">
                Sign up
              </Link>{" "}
              today!
            </h6>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginRegisterForm;
