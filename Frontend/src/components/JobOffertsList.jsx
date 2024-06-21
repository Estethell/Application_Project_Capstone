import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const JobOffersList = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const params = useParams();

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/jobOffer")
      .then((response) => response.json())
      .then((data) => setJobOffers(data));
  }, []);

  const handleClick = (jobOffer) => {
    if (!user || user.role !== "user") {
      navigate("/register");
      return;
    }

    axios
      .post("http://localhost:8000/api/v1/candidate", {
        jobOfferId: jobOffer.id,
        stepId: jobOffer.step[0].id,
        userId: user.id,
      })
      .then((response) => {
        console.log("Candidatura inviata:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Errore nel processo di candidatura:", error);
      });
  };

  return (
    <>
      {jobOffers.map((jobOffer) => (
        <div className="card m-2 px-5 my-4" key={jobOffer.id} style={{ width: "540px", height: "250px" }}>
          <span className="card__title">{jobOffer.name}</span>
          <p className="card__text">{jobOffer.description}</p>
          <button className="card__button" onClick={() => handleClick(jobOffer.id)}>
            Candidati
          </button>
        </div>
      ))}
    </>
  );
};

export default JobOffersList;
