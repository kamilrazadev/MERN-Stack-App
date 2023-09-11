import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddBrandModal() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [addBrandBtn, setAddBrandBtn] = useState("Add Brand");
    const [brandName, setBrandName] = useState("");
    const [brandImg, setBrandImg] = useState(null);

    const addBrand = (e) => {

        setAddBrandBtn("Please Wait...");
    
        e.preventDefault()
        
        const storageRef = ref(storage, `brand-images/${brandImg.name}`);
        uploadBytes(storageRef, brandImg).then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              const payload = {
                BrandName: brandName, 
                BrandImg : url
              };

            axios.post('http://localhost:1234/api/add-brand', payload)
              .then( json => {
                console.log(json.data)
                setShow(false);
              }
              )
              .catch( err => console.log(err))

            })  
            .catch((error) => {
              console.log(error.message)
            });

        });
      }

  return (
    <>
      <button className='btn btn-secondary mx-1' onClick={handleShow}>
        Add Brand
      </button>

      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton className='bg-dark'>
          <Modal.Title className='text-light'>Add Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark'>

        <form className="form" onSubmit={addBrand}>
            <div className="field">
                
                <input
                placeholder="Brand Name"
                className="input-field"
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                />
            </div>
            <div className="field">
                
                <input 
                style={{borderRadius: '20px'}}
                placeholder="Brand Image" 
                className="input-field" 
                type="file" 
                id='formFile'
                onChange={(e) => setBrandImg(e.target.files[0])}  
                />
            </div>
            <div className="btn">
                <button className="button1">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{addBrandBtn}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </button>

            </div>
            </form>
                    </Modal.Body>
                    
                </Modal>
    </>
  )
}
