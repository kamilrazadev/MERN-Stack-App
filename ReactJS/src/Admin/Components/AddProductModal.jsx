import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import { storage } from '../utils/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
  export default function AddProductModal() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [addProductBtn, setAddProductBtn] = useState("Add Product");

    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productBrand, setProductBrand] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDiscription, setProductDiscription] = useState("");
    const [productStock, setProductStock] = useState("");
    const [productRating, setProductRating] = useState("");
    const [productImg, setProductImg] = useState(null);

    const addProduct = (e) => {

        setAddProductBtn("Please Wait...");
    
        e.preventDefault()
        
        const storageRef = ref(storage, `product-images/${productImg.name}`);
        uploadBytes(storageRef, productImg).then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              const payload = {
                ProductName : productName, 
                ProductImg : url, 
                ProductCategory : productCategory, 
                ProductBrand : productBrand, 
                ProductPrice : productPrice, 
                ProductDiscription : productDiscription,
                ProductStock : productStock, 
                ProductRating : productRating
              };

            axios.post('http://localhost:1234/api/addproducts', payload)
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

      const [brands, setBrands] = useState([]);

      useEffect( () => {
        axios.get('http://localhost:1234/api/get-all-brands')
          .then( json => {
            setBrands(json.data.brands)
          })
          .catch( err => console.log(err))
      })

      const [category, setCategory] = useState([]);

      useEffect( () => {
        axios.get('http://localhost:1234/api/get-all-category')
          .then( json => {
            setCategory(json.data.category)
          })
          .catch( err => console.log(err))
      })

  return (
    <>
      <button className='btn btn-secondary mx-1' onClick={handleShow}>
        Add Product
      </button>

      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton className='bg-dark'>
          <Modal.Title className='text-light'>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark'>

        <form className="form" onSubmit={addProduct}>
            <div className="field">
                
                <input
                placeholder="Product Name"
                className="input-field"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                />
            </div>

            <div className="field">
                
                <input
                placeholder="Product Discription"
                className="input-field"
                type="text"
                value={productDiscription}
                onChange={(e) => setProductDiscription(e.target.value)}
                />
            </div>

            <div className="field">
                
                <input
                placeholder="Product Stock"
                className="input-field"
                type="number"
                value={productStock}
                onChange={(e) => setProductStock(e.target.value)}
                />
            </div>

            <div className='field'>
              <input 
                type="number" 
                id="points" 
                name="points" 
                min="0" 
                max="5" 
                step="0.1"
                placeholder='Product Rating'
                className="input-field" 
                value={productRating}
                onChange={(e) => setProductRating(e.target.value)}
                />
            </div>

            <div className="field">
                
                <input
                placeholder="Product Price in Dollars"
                className="input-field"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                />
            </div>

            <select 
              className='field' 
              style={{borderRadius: '20px', border: 'none', padding: '10px 8px'}} 
              aria-label="Default select example"
              value={productBrand} 
              onChange={ (e) => setProductBrand(e.target.value)}
              >
              <option >Select Brand</option>
              {
                brands.map( (val ,key)=> 
                <option key={key}>{val.BrandName}</option>
                )
              }
            </select>

            <select 
              className='field' 
              style={{borderRadius: '20px', border: 'none', padding: '10px 8px'}} 
              aria-label="Default select example"
              value={productCategory} 
              onChange={ (e) => setProductCategory(e.target.value)}
            >
              <option >Select Category</option>
              {
                category.map( (val ,key)=> 
                <option key={key}>{val.CategoryName}</option>
                )
              }
            </select>

            <div className="field">
                
                <input 
                style={{borderRadius: '20px'}}
                placeholder="Product Image" 
                className="input-field" 
                type="file" 
                id='formFile'
                onChange={(e) => setProductImg(e.target.files[0])}  
                />
            </div>

            <div className="btn">
                <button className="button1">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{addProductBtn}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </button>

            </div>
            </form>
                    </Modal.Body>
                    
                </Modal>
    </>
  )
}
