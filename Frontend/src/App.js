import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MyNav from "./components/MyNav";
import JobOffer from "./components/JobOffer";
import Footer from "./components/Footer";
import ClientForm from "./components/ClientForm";
import Candidate from "./components/Candidate";
import ProtectedRoutes from "./components/ProtectedRoutes";
import GuestRoutes from "./components/GuestRoutes";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import { LOGIN } from "./redux/actions";
import axios from "axios";
import { useDispatch } from "react-redux";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;
  axios.defaults.baseURL = "http://localhost:8000";

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
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <MyNav />

      <Routes>
        <Route path="/" element={<JobOffer />}></Route>

        <Route element={<ProtectedRoutes />}>
          {/* <Candidate /> */}
          {/* <Route path="/clientForm" element={<ClientForm />}></Route> */}
        </Route>
        <Route element={<GuestRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
