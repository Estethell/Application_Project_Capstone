import { Container, Row, Col } from "react-bootstrap";
import JobOffertsList from "./JobOffertsList";

const JobOffer = () => {
  return (
    <Container fluid className="bg-body-tertiary">
      <Row className="d-flex justify-content-center divRow">
        <Col lg={11} className="pe-5 hero d-flex flex-column align-items-end justify-content-center">
          <div className="miniDivHero">
            <h2 className=" p-3 m-2 pb-0 text-center">
              Trova il lavoro giusto per te
              <span className="d-block">
                su <span className="fs-1 fw-bolder">EnjoyJob!</span>
              </span>
            </h2>
            <p className=" p-3 m-2pt-0 text-center fs-4 lh-sm">
              Il sito n°1 per la ricerca{" "}
              <span className="d-block">
                di lavoro o di lavoratori <span className="d-block">in Italia</span>
              </span>
            </p>
          </div>
        </Col>

        <JobOffertsList />
      </Row>
    </Container>
  );
};

export default JobOffer;
