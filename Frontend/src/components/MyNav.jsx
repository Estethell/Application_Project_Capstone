import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT } from "../redux/actions";

const TopNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const logout = () => {
    axios
      .post("/logout")
      .then(() => dispatch({ type: LOGOUT }))
      .then(() => navigate("/"));
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/joboffer">
          EnjoyJob
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link active fw-bold" to="/jobform">
                  Aggiungi nuovo annuncio
                </Link>
              </li>
            )}
            {user?.role === "user" && (
              <li className="nav-item">
                <Link className="nav-link active fw-bold" to="/clientJobs">
                  Lista delle tue candidature
                </Link>
              </li>
            )}
          </ul>

          {user ? (
            <>
              <span className="me-2">{user.name}</span>
              <img
                className="me-2 rounded-circle"
                src="/assests/profile_img.jpg"
                alt=""
                style={{ height: "50px", width: "50px" }}
              />
              <button className="btn btn-primary" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-primary me-2" to="/">
                Login
              </Link>
              <Link className="btn btn-primary" to="/register">
                Registrati
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
