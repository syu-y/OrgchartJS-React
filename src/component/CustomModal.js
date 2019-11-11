import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const style = {
  position: "fixed",
  zIndex:9999,
  top :0,
  left:0,
  right:0,
  bottom:0,
  background: "#464bee",
  color: "white",
  outline: "none",
};

function CustomeModal ( showData ) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(showData);
  }, []);

  return(
    <div>
      <Modal show={show} onHide={handleClose}  style={style}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body zindex>Sample Modal</Modal.Body>
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
