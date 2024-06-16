import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    cv: null,
  });

  const [form, setForm] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // fetch("http://localhost:8000/api/v1/professionist", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",

    //   },
    //   body: JSON.stringify({
    //     nome: "name",
    //     cognome: "surname",
    //     email: "email",
    //     cv: "cv",
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => setForm(data));

    fetch("http://localhost:8000/api/v1/professionist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Set-Cookie":
        //   "XSRF-TOKEN=eyJpdiI6ImRRNVlPM3lORzh2WGxlYXVRbGVXTlE9PSIsInZhbHVlIjoiVVU3Z1ppVm92dWxqRGJMZXRnalNiWDg5UEhoNkZ0aWFXaExnK2VEVE15NHdQQTdtU3Z6VWNQYjFGdnNBSDc5dW9McmdpQnNXZnZTTWpwMmRrVTI5MGMzZk1tUXFlTHlHaWkxTmtmR1pkWmZuWUtPTnVPVk9NSnpOUlhaQlVBOXkiLCJtYWMiOiJjMGFmZTNlYmQ2MGNhNDU2YjQ2Y2IzYTE2MjRjMWM2YTQ0ZGIzMTkwZGFhMzJiY2MxMDIzMGRjMDQ3ZTJjOTcyIiwidGFnIjoiIn0%3D; expires=Sun, 16 Jun 2024 16:11:57 GMT; Max-Age=7200; path=/; samesite=lax",
      },
      body: JSON.stringify({
        nome: "name",
        cognome: "surname",
        email: "email",
        cv: "cv",
      }),
    })
      .then((response) => response.json())
      .then((data) => setForm(data));
  };

  return (
    <div className="container w-50 mt-5">
      <h1 className="d-flex justify-content-center my-4">Candidati</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-4">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="surname">Cognome:</label>
          <input
            type="text"
            className="form-control"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="cv">Carica il CV:</label>
          <input type="file" className="form-control-file mx-3" id="cv" name="cv" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary mb-5">
          Invia
        </button>
      </form>
    </div>
  );
};

export default Form;
