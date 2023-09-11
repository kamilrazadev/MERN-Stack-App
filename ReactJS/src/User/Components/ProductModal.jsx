import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ProductModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View Details
      </Button>

      <div className='d-flex align-items-center'>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{fontWeight: 'bolder'}}>{props.productData.ProductName}</Modal.Title>
          </Modal.Header>
          <Modal.Body> 
            <div>
              <span style={{fontWeight: 'bolder', fontSize: '20px'}}>Price: <span style={{color: 'blue'}}>{props.productData.ProductPrice}$</span></span> 
            </div>
              <h5 style={{fontWeight: 'bolder'}}>Description:</h5> 
            {props.productData.ProductDiscription}

            <h5 style={{fontWeight: 'bolder'}}>Stock Available: <span style={{fontWeight: 'lighter'}}>{props.productData.ProductStock}</span> </h5> 
            <h5 style={{fontWeight: 'bolder'}}>Brand: <span style={{fontWeight: 'lighter'}}>{props.productData.ProductBrand}</span> </h5> 
            <h5 style={{fontWeight: 'bolder'}}>Category: <span style={{fontWeight: 'lighter'}}>{props.productData.ProductCategory}</span> </h5> 
            <h5 style={{fontWeight: 'bolder'}}>Rating: <span style={{fontWeight: 'lighter'}}>{props.productData.ProductRating}</span> </h5> 

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
