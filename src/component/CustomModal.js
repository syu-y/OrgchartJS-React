import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

// const style = {
//   background: "#464bee",
//   color: "white",
//   outline: "none",
// };

function CustomeModal ( showData ) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(showData);
  }, []);

  return(
    <div>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sample Modal</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
  );
}

export default CustomeModal;
