import { useState } from 'react';
import {Tablecomp} from './table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Getmodal = (props) =>{
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <button className='comp-button'onClick={handleShow}>
            Get Details
        </button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ingredients</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <>
                <h3>{props.label}</h3>
                <Tablecomp data={props.ingrediants} weight={props.totalWeight}/>
            </>
        </Modal.Body>
        <Modal.Footer>
            <a href={props.link}>
          <Button variant="primary">
            More about Recipe
          </Button>
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export {Getmodal};