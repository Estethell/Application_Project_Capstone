import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    cv: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="container w-50 mt-5 bg-body-tertiary">
      <form onSubmit={handleSubmit}>
        <div className="form-group my-4">
          <label htmlFor="name">Titolo lavoro:</label>
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
          <label htmlFor="description">Descrizione:</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mb-5">
          Invia
        </button>
      </form>
    </div>
  );
};

export default Form;
