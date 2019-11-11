import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FormContent from './FormContent';

function FormModal () {
  const render = () => {
    const formContent = <FormContent></FormContent>;
    const modal = this.props.showModal ? <div>{formContent}</div> : null;
    return (
      <div>
        {modal}
      </div>
    );
  }
}

export default FormModal;
