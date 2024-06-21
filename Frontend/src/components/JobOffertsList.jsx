import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import { Spinner } from "react-bootstrap";

const JobOffersList = () => {
  const [candidates, setCandidates] = useState([]);
  const [jobOffers, setJobOffers] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

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
    const fetchData = async () => {
      try {
        const candidatesResponse = await axios.get("http://localhost:8000/api/v1/candidate");
        const candidatesData = candidatesResponse.data;
        setCandidates(candidatesData);

        const jobOffersResponse = await axios.get("http://localhost:8000/api/v1/jobOffer");
        const jobOffersData = jobOffersResponse.data;

        if (candidatesData.length > 0 && jobOffersData.length > 0 && user) {
          console.log(user);

          const candidateFilter = candidatesData.filter((i) => i.users_id === user?.id);
          console.log("candidateFilter:", candidateFilter);
          const jobOffersToExclude = candidateFilter.map((i) => i.job_offers_id);
          console.log("jobOffersToExclude:", jobOffersToExclude);
          const filtered = jobOffersData.filter((jobOffer) => !jobOffersToExclude.includes(jobOffer.id));
          console.log("Filtered", filtered);

          setJobOffers(filtered);
          setLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

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
        alert("Candidatura inviata con successo!");
        console.log("Candidatura inviata:", response.data);

        const updatedJobOffers = jobOffers.filter((offer) => offer.id !== jobOffer.id);
        setJobOffers(updatedJobOffers);

        navigate("/");
      })
      .catch((error) => {
        console.error("Errore nel processo di candidatura:", error);
      });
  };

  const handleClickAdmin = () => {
    navigate("/candidate");
  };

  return (
    <>
      {!loaded && (
        <div>
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
              <button hidden={user.role === "user"} className="card__button" onClick={() => handleClickAdmin()}>
                Visualizza Candidati
              </button>
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default JobOffersList;
