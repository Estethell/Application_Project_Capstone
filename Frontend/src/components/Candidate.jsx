import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import JobOffer from "./JobOffer";
import axios from "axios";

const Candidate = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const jobOffers = useSelector((state) => state.jobOffers);
  const [selectedStep, setSelectedStep] = useState(jobOffers.steps[0].id);
  const [isStepSelected, setIsStepSelected] = useState(0);
  console.log("selectedUser:", selectedUser);
  console.log("joboffers:", jobOffers);

  const handleClick = (cand) => {
    setSelectedUser(cand);
  };

  const handleClickDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/v1/candidate/${id}`)
      .then(() => {
        fetch("http://localhost:8000/api/v1/candidate/list")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            let filteredCandidate = data.data.filter((candidate) => candidate.steps_id === selectedStep);

            setCandidates(filteredCandidate);

            console.log("data", data);
          })
          .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
          });
        setSelectedUser(null);
        alert("Candidatura eliminata con successo");
      })
      .catch((error) => {
        console.error("There was a problem with the delete operation:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/candidate/list")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        let filteredCandidate = data.data.filter((candidate) => candidate.steps_id === selectedStep);

        setCandidates(filteredCandidate);

        console.log("data", data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [selectedStep]);

  const handleArrowClick = () => {
    const stepId = selectedUser.steps_id;
    console.log(jobOffers);
    const stepIndex = jobOffers.steps.findIndex((x) => x.id === stepId);
    let nextStepId;
    if (stepIndex < jobOffers.steps.length - 1) {
      nextStepId = jobOffers.steps[stepIndex + 1].id;
    } else {
      return alert("Non ci sono altri step in questa offerta di lavoro");
    }

    axios
      .put(`http://localhost:8000/api/v1/candidate/nextStep/${selectedUser.id}`, {
        candidate: selectedUser,
        nextStepId: nextStepId,
      })
      .then((response) => {
        console.log("data 2", response.data);
        setSelectedUser(response.data[0]);
        console.log(selectedUser);
        alert("Step modificato con successo");
      })
      .catch((error) => {
        console.error("There was a problem with the axios request:", error);
      });
  };

  const handleChangeSteps = (step) => {
    setSelectedStep(step.id);
    setSelectedUser(null);
    setIsStepSelected(step.id);
  };

  return (
    <Container
      fluid
      className="bg-body-tertiary
    "
    >
      <Row>
        <div>
          {jobOffers.steps.map((step) => {
            return (
              <button
                key={step.id}
                className={isStepSelected === step.id ? "buttonSteps m-3 btn border" : "m-3 btn bg-white border"}
                onClick={() => {
                  handleChangeSteps(step);
                }}
              >
                {step.name}
              </button>
            );
          })}
        </div>
        <Col lg={4}>
          <div className="m-4 candidateList p-4">
            <h2 className="text-center mb-3">Lista candidati</h2>

            {candidates.length > 0 ? (
              candidates.map((cand) => {
                return (
                  <Card className="card2 fs-5" onClick={() => handleClick(cand)} key={cand.id}>
                    <Card.Body>
                      <span className="mx-2">{cand.user.name}</span>

                      <span className="mx-2">{cand.user.surname}</span>
                    </Card.Body>
                  </Card>
                );
              })
            ) : (
              <p className="fs-5 text-center m-5">Nessun candidato presente</p>
            )}
          </div>
        </Col>
        <Col lg={8}>
          <div className="text-center d-flex flex-column align-items-center m-4 detailCandidate p-4">
            <h2 className="text-center mb-3">Dettaglio candidato</h2>
            {selectedUser ? (
              <Card style={{ width: "60em", height: "20em" }}>
                <Card.Header className="bg-white ">
                  <svg
                    onClick={handleArrowClick}
                    style={{ width: "2em", height: "2em" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="mx-2 stepSvg"
                  >
                    <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1c-4.2-4.5-10.1-7.1-16.3-7.1C266 128 256 138 256 150.3V208H160c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h96v57.7c0 12.3 10 22.3 22.3 22.3c6.2 0 12.1-2.6 16.3-7.1l99.9-107.1c3.5-3.8 5.5-8.7 5.5-13.8s-2-10.1-5.5-13.8L294.6 135.1z" />
                  </svg>
                  <button className="btn btn-danger mx-2" onClick={() => handleClickDelete(selectedUser.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </button>
                </Card.Header>
                <Card.Body className="py-5">
                  <Card.Title>
                    <span className="mx-2 fs-2">{selectedUser.user.name}</span>{" "}
                    <span className="mx-2 fs-2">{selectedUser.user.surname}</span>{" "}
                  </Card.Title>

                  <Card.Text>{selectedUser.user.email}</Card.Text>

                  <Card.Link href="#">Link al CV</Card.Link>
                </Card.Body>
              </Card>
            ) : (
              <Card style={{ width: "60em" }}>
                <Card.Body className="py-5">
                  <h2 className="">Nessun candidato selezionato</h2>
                </Card.Body>
              </Card>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Candidate;
