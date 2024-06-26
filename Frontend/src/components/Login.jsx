import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const updateInputValue = (ev) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const submitLogin = async (ev) => {
    ev.preventDefault();

    axios
      .get("/sanctum/csrf-cookie")
      .then(() => axios.post("/login", formData))
      .then(() => axios.get("/api/user"))
      .then((res) => {
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
        navigate("/joboffer");
      })
      .catch((error) => {
        console.error("An error occurred during the login process:", error);
        navigate("/NotFound");
      });
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <Form className="form" onSubmit={(ev) => submitLogin(ev)} noValidate>
        <p className="title">Login </p>
        <p className="message">Accedi per scoprire nuove opportunità lavorative </p>

        <label className="my-1">
          <span>Email</span>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={(ev) => updateInputValue(ev)}
            value={formData.email}
          />
        </label>

        <label className="my-1">
          <span>Password</span>

          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={(ev) => updateInputValue(ev)}
            value={formData.password}
          />
        </label>

        <button className="submit my-3">Accedi</button>
        <p className="signin">
          Non hai un account?{" "}
          <button className="submit" onClick={handleClick}>
            Registrati
          </button>{" "}
        </p>
      </Form>
    </Container>
  );
};

export default Login;
