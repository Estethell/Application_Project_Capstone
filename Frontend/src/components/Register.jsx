import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_img: "",
    role: "user",
  });

  const [errors, setErrors] = useState(null);

  const updateInputValue = (ev) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  // const updateImageField = (ev) => {
  //   updateInputValue(ev);
  //   setProfileImage(ev.target.files[0]);
  // };

  const handleClick = (e) => {
    e.preventDefault();

    navigate("/");
  };

  const submitLogin = (ev) => {
    ev.preventDefault();
    axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        const body = new FormData();
        body.append("name", formData.name);
        body.append("surname", formData.surname);
        body.append("email", formData.email);
        body.append("password", formData.password);
        body.append("password_confirmation", formData.password_confirmation);
        // body.append("profile_img", profileImage);

        body.append("role", "user");
        body.append("cv", formData.cv);
        return axios.post("/register", body);
      })
      .then(() => axios.get("/api/user"))
      .then((res) => {
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
      });
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <Form className="form" onSubmit={(ev) => submitLogin(ev)} noValidate>
        <p className="title">Registrati </p>
        <p className="message">Entra nella nostra comunità per cercare l'offerta di lavoro migliore per te! </p>
        <div className="flex">
          <label className="my-1">
            <span>Nome</span>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={(ev) => updateInputValue(ev)}
              value={formData.name}
            />
          </label>

          <label className="my-1">
            <span>Cognome</span>
            <input
              type="text"
              className="form-control"
              id="surname"
              name="surname"
              onChange={(ev) => updateInputValue(ev)}
              value={formData.surname}
            />
          </label>
        </div>

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
        <label className="my-1">
          <span>Conferma Password</span>
          <input
            type="password"
            className="form-control"
            id="password_confirmation"
            name="password_confirmation"
            onChange={(ev) => updateInputValue(ev)}
            value={formData.password_confirmation}
          />
        </label>
        <label className="my-1">
          <span>Carica il Curriculum</span>
          <input
            type="file"
            className="form-control"
            id="cv"
            name="cv"
            onChange={(ev) => updateInputValue(ev)}
            value={formData.cv}
          />
        </label>
        <button className="submit my-3">Registrati</button>
        <p className="signin">
          Hai già un account?{" "}
          <button className="submit" onClick={handleClick}>
            Effettua il login
          </button>{" "}
        </p>
      </Form>
    </Container>
  );
};

export default Register;
