import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const JobOffertsList = () => {
  const [jobOffer, setJobOffer] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/jobOffer")
      .then((response) => response.json())
      .then((data) => setJobOffer(data));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    if (!user || user.role !== "user") {
      navigate("/register");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      {jobOffer.map((jobOffer) => {
        return (
          <div className="card m-2 px-5 my-4" key={jobOffer.id} style={{ width: "540px", height: "250px" }}>
            <span className="card__title">{jobOffer.name}</span>
            <p className="card__text">{jobOffer.description}</p>
            <button className="card__button" onClick={handleClick}>
              Candidati
            </button>
          </div>
        );
      })}
    </>
  );
};

export default JobOffertsList;
