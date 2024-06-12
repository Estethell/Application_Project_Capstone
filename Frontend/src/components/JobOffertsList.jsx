import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const JobOffertsList = () => {
  return (
    <div className="bg-body-tertiary d-flex flex-column align-items-center justify-content-center w-75 my-5">
      <Card className="m-2 mt-4">
        <Card.Header>Steps offerta di lavoro</Card.Header>
        <Card.Body>
          <Card.Title>Titolo offerta di lavoro</Card.Title>
          <Card.Text>Breve descrizione</Card.Text>
          <Button variant="primary">Candidati</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobOffertsList;
