import { Col, Container, Row, Card } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Candidate = (jobSelected) => {
  console.log(jobSelected);
  const [candidates, setCandidates] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const jobOffers = useSelector((state) => state.jobOffers);
  console.log("joboffers:", jobOffers);
  const handleClick = (cand) => {
    setSelectedUser(cand);
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
        setCandidates(data.data);
        console.log("data", data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <Container
      fluid
      className="bg-body-tertiary
    "
    >
      <Row>
        <div>
          {jobOffers.steps.map((step) => {
            return <button className="m-3 btn bg-white border">{step.name}</button>;
          })}
        </div>
        <Col lg={4}>
          <div className="m-4 candidateList p-4">
            <h2 className="text-center mb-3">Lista candidati</h2>

            {candidates &&
              candidates.map((cand) => {
                return (
                  <Card className="card2 fs-5" onClick={() => handleClick(cand)}>
                    <Card.Body key={cand.id}>
                      <span className="mx-2">{cand.user.name}</span>

                      <span className="mx-2">{cand.user.surname}</span>
                    </Card.Body>
                  </Card>
                );
              })}
          </div>
        </Col>
        <Col lg={8}>
          <div className="text-center d-flex flex-column align-items-center m-4 detailCandidate p-4">
            <h2 className="text-center mb-3">Dettaglio candidato</h2>
            {selectedUser ? (
              <Card style={{ width: "60em", height: "15em" }}>
                <Card.Body className="py-5">
                  <Card.Title>
                    <span className="mx-2 fs-2">{selectedUser.user.name}</span>{" "}
                    <span className="mx-2 fs-2">{selectedUser.user.surname}</span>{" "}
                  </Card.Title>

                  <Card.Text>{selectedUser.user.email}</Card.Text>
                  {/* <Card.Link href="#">Card Link</Card.Link> */}
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
