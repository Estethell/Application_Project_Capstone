import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

const ClientCandidateList = () => {
  const user = useSelector((state) => state.user);
  const [userCandidate, setUserCandidate] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/candidate/list")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const candidateJobs = data.data.filter((cand) => cand.users_id === user.id);
        console.log("candidato job:", candidateJobs);
        console.log("data candidate list:", data);
        setUserCandidate(candidateJobs);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const handleClick = (id) => {
    axios
      .delete(`http://localhost:8000/api/v1/candidate/${id}`)
      .then(() => {
        const updatedCandidates = userCandidate.filter((cand) => cand.id !== id);
        setUserCandidate(updatedCandidates);
        alert("Candidatura eliminata con successo");
      })
      .catch((error) => {
        console.error("There was a problem with the delete operation:", error);
      });
  };

  return (
    <div>
      <div className="m-4 candidateList p-4">
        <h2 className="text-center mb-5">Lista candidature inviate</h2>

        <div className="d-flex flex-column align-items-center">
          {userCandidate.length > 0 ? (
            userCandidate.map((cand) => (
              <Card
                className="card3 fs-5 d-flex flex-column my-3"
                key={cand.id}
                style={{ width: "540px", height: "200px" }}
              >
                <Card.Body>
                  <span className="m-2 d-block fw-bold fs-4">{cand.job_offer.name}</span>
                  <span className="mx-2 d-block">{cand.job_offer.description}</span>
                  <div className="d-flex justify-content-end m-3 pe-5 ">
                    <button className="btn btn-danger" onClick={() => handleClick(cand.id)}>
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
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-center">Nessuna candidatura trovata</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientCandidateList;
