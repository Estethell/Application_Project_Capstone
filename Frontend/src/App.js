import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MyNav from "./components/MyNav";
import JobOffer from "./components/JobOffer";
import Footer from "./components/Footer";

import Candidate from "./components/Candidate";
import ProtectedRoutes from "./components/ProtectedRoutes";
import GuestRoutes from "./components/GuestRoutes";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import { LOGIN } from "./redux/actions";
import axios from "axios";
import { useDispatch } from "react-redux";
import JobForm from "./components/JobForm";
import ClientCandidateList from "./components/ClientCandidateList";
import NotFound from "./components/NotFound";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;
  axios.defaults.baseURL = "http://localhost:8000";

  return (
    <BrowserRouter>
      <MyNav />

      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/joboffer" element={<JobOffer />} />
          <Route path="/candidate" element={<Candidate />}></Route>
          <Route path="/jobform" element={<JobForm />}></Route>
          <Route path="/clientJobs" element={<ClientCandidateList />} />
        </Route>
        <Route element={<GuestRoutes />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
