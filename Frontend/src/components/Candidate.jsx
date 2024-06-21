import { Col, Container, Row, Card } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

const Candidate = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/jobOffer")
      .then((response) => {})
      .then((data) => setCandidates(data));
  }, []);

  return (
    <Container
      fluid
      className="bg-body-tertiary
    "
    >
      <Row>
        <div>
          {/* {candidates.map((cand) => (
            retuirn
          )
          } */}
          <button className="m-3 btn bg-white border">Step1</button>
        </div>
        <Col lg={4}>
          <div className="m-4 candidateList p-4">
            <h2 className="text-center mb-3">Lista candidati</h2>
            <Card className="card1">
              <Card.Body>Nome e cognome del professionista</Card.Body>
            </Card>
          </div>
        </Col>
        <Col lg={8}>
          <div className="text-center d-flex flex-column align-items-center m-4 detailCandidate p-4">
            <h2 className="text-center mb-3">Dettaglio candidato</h2>
            <Card style={{ width: "60em", height: "20em" }}>
              <Card.Body className="py-5">
                <Card.Title>Nome e cognome professionista</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Steps</Card.Subtitle>
                <Card.Text>Breve descrizione</Card.Text>
                {/* <Card.Link href="#">Card Link</Card.Link> */}
                <Card.Link href="#">Link al CV</Card.Link>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Candidate;
