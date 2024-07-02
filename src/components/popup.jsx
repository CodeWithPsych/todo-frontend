import React from "react";
import Form from "react-bootstrap/Form";
import "./popup.css";
import Button from "react-bootstrap/Button";

const Popup = ({ handleSubmit, closePopup, display, handleText, text }) => {
  return (
    <>
      {display && (
        <div className="popUpItems">
          <div className="popUp">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Textarea</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                onChange={handleText}
                value={text} // using value for controlled component
              />
            </Form.Group>
            <div style={{ display: "flex", gap: "12px" }}>
              <Button
                variant="primary"
                style={{ width: "4.5rem" }}
                onClick={handleSubmit}
              >
                Update
              </Button>
              <Button
                variant="primary"
                onClick={closePopup}
                style={{ width: "4rem" }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
