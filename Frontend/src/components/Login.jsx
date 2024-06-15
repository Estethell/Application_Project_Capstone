import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import { Container } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const updateInputValue = (ev) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const submitLogin = async (ev) => {
    ev.preventDefault();
    debugger;

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
    <Container>
      <form onSubmit={(ev) => submitLogin(ev)} noValidate>
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
      </form>
    </Container>
  );
};

export default Login;
