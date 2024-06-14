import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MyNav from "./components/MyNav";
import JobOffer from "./components/JobOffer";
import Footer from "./components/Footer";
import ClientForm from "./components/ClientForm";
import Candidate from "./components/Candidate";

function App() {
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>
        <Route path="/" element={<JobOffer />}></Route>
        {/* <ClientForm /> */}
        {/* <Candidate /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
