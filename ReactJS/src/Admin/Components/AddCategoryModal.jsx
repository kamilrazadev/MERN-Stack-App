import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddCategoryModal() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [addCategoryBtn, setAddCategoryBtn] = useState("Add Category");
    const [categoryName, setCategoryName] = useState("");
    const [categoryImg, setCategoryImg] = useState(null);

    const addCategory = (e) => {

        setAddCategoryBtn("Please Wait...");
    
        e.preventDefault()
        
        const storageRef = ref(storage, `category-images/${categoryImg.name}`);
        uploadBytes(storageRef, categoryImg).then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              const payload = {
                CategoryName: categoryName, 
                CategoryImg : url
              };

            axios.post('http://localhost:1234/api/add-category', payload)
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
        Add Category
      </button>

      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton className='bg-dark'>
          <Modal.Title className='text-light'>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark'>

        <form className="form" onSubmit={addCategory}>
            <div className="field">
                
                <input
                placeholder="Category Name"
                className="input-field"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                />
            </div>
            <div className="field">
                
                <input 
                style={{borderRadius: '20px'}}
                placeholder="Category Image" 
                className="input-field" 
                type="file" 
                id='formFile'
                onChange={(e) => setCategoryImg(e.target.files[0])}  
                />
            </div>
            <div className="btn">
                <button className="button1">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{addCategoryBtn}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </button>

            </div>
            </form>
                    </Modal.Body>
                    
                </Modal>
    </>
  )
}
