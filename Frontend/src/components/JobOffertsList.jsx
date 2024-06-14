import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";

const JobOffertsList = () => {
  const [jobOffer, setJobOffer] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/jobOffer")
      .then((response) => response.json())
      .then((data) => setJobOffer(data));
  }, []);

  return (
    <>
      {jobOffer.map((jobOffer) => {
        return (
          <Card className="m-2 my-4" style={{ width: "540px", height: "250px" }} key={jobOffer.id}>
            <Card.Header className="fs-4 bg-white">EnjoyJob propone:</Card.Header>
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <Card.Title className="fw-bold">{jobOffer.name}</Card.Title>
                <Card.Text>{jobOffer.description}</Card.Text>
              </div>

              <div>
                <Button variant="primary">Candidati</Button>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default JobOffertsList;
