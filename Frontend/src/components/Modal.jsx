import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import axios from "axios";

const ModalCandidate = ({ selectedUser, fetchCall }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ comment: "" });

  const handleClose = () => {
    setShow(false); // Chiudi il modale
    setFormData({ comment: "" }); // Reimposta il valore della textarea a una stringa vuota
  };

  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitModal = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/api/v1/event/${selectedUser.id}`, {
        comment: formData.comment,
        time: new Date(),
        type: 1,
        id: selectedUser.id,
      })
      .then((response) => {
        console.log("Response:", response);
        console.log("Candidatura inviata:", response.data);
        fetchCall(selectedUser);
        handleClose(); // Chiudi il modale dopo aver inviato i dati
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chat-left-dots"
          viewBox="0 0 16 16"
        >
          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
        </svg>
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Lascia un commento</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <Form className="form" onSubmit={onSubmitModal} noValidate>
            <textarea
              style={{ width: "20em", height: "7em" }}
              name="comment"
              id="textarea"
              value={formData.comment}
              onChange={handleInputChange}
            ></textarea>
            <Button variant="primary" type="submit">
              Salva
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCandidate;
