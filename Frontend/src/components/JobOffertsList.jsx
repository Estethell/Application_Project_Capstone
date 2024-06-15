import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const JobOffertsList = () => {
  const [jobOffer, setJobOffer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/jobOffer")
      .then((response) => response.json())
      .then((data) => setJobOffer(data));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/ClientForm");
  };

  return (
    <>
      {jobOffer.map((jobOffer) => {
        return (
          <Card className="m-2 my-4" style={{ width: "540px", height: "250px" }} key={jobOffer.id}>
            <Card.Header className="fs-4 bg-white">{jobOffer.name}</Card.Header>
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <Card.Text>{jobOffer.description}</Card.Text>
              </div>
              <Card.Footer className="bg-white d-flex justify-content-end">
                <Button onClick={handleClick} variant="primary" className="mt-2">
                  Candidati
                </Button>
              </Card.Footer>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default JobOffertsList;
