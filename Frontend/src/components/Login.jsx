import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

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
      });

    // const response = await axios.get("/api/user");
    // return response.data;
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

      {/* <form onSubmit={(ev) => submitLogin(ev)} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={(ev) => updateInputValue(ev)}
            value={formData.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={(ev) => updateInputValue(ev)}
            value={formData.password}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Effettua il Login
        </button>
      </form> */}
    </Container>
  );
};

export default Login;
