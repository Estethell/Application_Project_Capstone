import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const JobForm = () => {
  const [steps, setSteps] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    steps: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/step")
      .then((response) => {
        setSteps(response.data);
        console.log("data", response.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prevFormData) => {
      let updatedSteps = checked ? [...prevFormData.steps, id] : prevFormData.steps.filter((stepId) => stepId !== id);
      updatedSteps = updatedSteps.map((i) => parseInt(i));
      return { ...prevFormData, steps: updatedSteps };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/jobOffer");

    axios
      .post("http://localhost:8000/api/v1/joboffer/form", {
        name: formData.name,
        description: formData.description,
        steps: formData.steps,
      })
      .then((response) => {
        alert("Candidatura inviata con successo!");
        console.log("Candidatura inviata:", response.data);
      });
  };

  const steps1 = steps.slice(0, 5);
  const steps2 = steps.slice(5);

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
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>

        <Row>
          <Col>
            {steps1.map((step) => (
              <div className="form-check form-switch" key={step.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={step.id}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor={step.id}>
                  {step.name}
                </label>
              </div>
            ))}
          </Col>
          <Col>
            {steps2.map((step) => (
              <div className="form-check form-switch" key={step.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={step.id}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor={step.id}>
                  {step.name}
                </label>
              </div>
            ))}
          </Col>
        </Row>

        <button type="submit" className="btn btn-primary my-3">
          Invia
        </button>
      </form>
    </div>
  );
};

export default JobForm;
