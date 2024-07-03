import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN, SET_JOB_OFFERS } from "../redux/actions";
import { Spinner, Button } from "react-bootstrap";

const JobOffersList = () => {
  const [candidates, setCandidates] = useState([]);
  const [jobOffers, setJobOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    axios("/api/user")
      .then((res) =>
        dispatch({
          type: LOGIN,
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async (page = 1) => {
      try {
        const candidatesResponse = await axios.get("http://localhost:8000/api/v1/candidate");
        const candidatesData = candidatesResponse.data;
        setCandidates(candidatesData);

        const jobOffersResponse = await axios.get(`http://localhost:8000/api/v1/jobOffer?page=${page}`);
        const jobOffersData = jobOffersResponse.data;

        setJobOffers(jobOffersData.data); // I dati della pagina corrente
        setTotalPages(jobOffersData.last_page); // Numero totale di pagine

        if (jobOffersData.data.length > 0 && user) {
          const candidateFilter = candidatesData.filter((i) => i.users_id === user?.id);
          const jobOffersToExclude = candidateFilter.map((i) => i.job_offers_id);
          const filtered = jobOffersData.data.filter((jobOffer) => !jobOffersToExclude.includes(jobOffer.id));
          setJobOffers(filtered);
          setLoaded(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData(currentPage);
  }, [user, currentPage]);

  const handleClick = (jobOffer) => {
    if (!user || user.role !== "user") {
      navigate("/register");
      return;
    }

    axios
      .post("http://localhost:8000/api/v1/candidate", {
        jobOfferId: jobOffer.id,
        stepId: jobOffer.steps[0].id,
        userId: user.id,
      })
      .then((response) => {
        console.log("Candidatura inviata:", response.data);
        const updatedJobOffers = jobOffers.filter((offer) => offer.id !== jobOffer.id);
        setJobOffers(updatedJobOffers);
        navigate("/");
      })
      .catch((error) => {
        console.error("Errore nel processo di candidatura:", error);
      });
  };

  const handleClickClientList = (jobOffer) => {
    dispatch({
      type: SET_JOB_OFFERS,
      payload: jobOffer,
    });
    navigate("/candidate");
  };

  const handleClickDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/v1/jobOffer/job/${id}`)
      .then((response) => {
        console.log("Cancellazione avvenuta con successo:", response.data);
        const updatedJobOffers = jobOffers.filter((offer) => offer.id !== id);
        setJobOffers(updatedJobOffers);
        alert("Offerta di lavoro rimossa con successo");
      })
      .catch((error) => {
        console.error("Errore nella cancellazione del job offer:", error);
      });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {!loaded && (
        <div className="d-flex justify-content-center m-5">
          <Spinner animation="border"></Spinner>
        </div>
      )}
      {jobOffers.map((jobOffer) => (
        <div className="card1 m-2 px-5 my-4" key={jobOffer.id} style={{ width: "540px", height: "250px" }}>
          <span className="card__title">{jobOffer.name}</span>
          <p className="card__text">{jobOffer.description}</p>
          {user ? (
            <div>
              <button hidden={user.role === "admin"} className="card__button" onClick={() => handleClick(jobOffer)}>
                Candidati
              </button>
              {user.role === "user" ? null : (
                <div className="d-flex justidy-content-end">
                  <button className="card__button m-2" onClick={() => handleClickClientList(jobOffer)}>
                    Visualizza Candidati
                  </button>
                  <button className="card__button m-2" onClick={() => handleClickDelete(jobOffer.id)}>
                    Cancella
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      ))}
      <div className="pagination ms-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            className="m-1"
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </>
  );
};

export default JobOffersList;
