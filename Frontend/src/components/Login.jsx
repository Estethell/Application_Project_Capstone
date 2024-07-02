import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import { Container, Form, Row, Col } from "react-bootstrap";
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
        console.error("Error:", error);
        navigate("/NotFound");
      });
  };

  return (
    <Container fluid>
      <Row className="containerLogin">
        <Col lg={6} className="loginInfo d-flex flex-column align-items-end p-5">
          <div className="miniDivHero w-50 m-5">
            <h2 className=" p-3 m-2 pb-0 text-center">
              Trova il lavoro giusto per te
              <span className="d-block">
                su <span className="fs-1 fw-bolder">EnjoyJob!</span>
              </span>
            </h2>
            <p className=" p-3 m-2pt-0 text-center fs-4 lh-sm">
              Il sito n°1 per la ricerca{" "}
              <span className="d-block">
                di lavoro o di lavoratori <span className="d-block">in Italia</span>
              </span>
            </p>
          </div>
        </Col>
        <Col lg={6} className="d-flex align-items-center justify-content-center">
          <Form className="form ms-5 ps-3" onSubmit={(ev) => submitLogin(ev)} noValidate>
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
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
