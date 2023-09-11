import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Cart from './Cart';
import ProductModal from '../Components/productModal';
import Swal from 'sweetalert2';


export default function Products() {
  const [cartItems, setCartItems] = useState([]);
  const [product, setProduct] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(1);

  useEffect(() => {
    // Retrieve cartItems from localStorage when the component mounts
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:1234/api/get-all-products')
      .then((json) => {
        setProduct(json.data.product);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const addToCart = (productData) => {
    // Clone the cartItems array
    const updatedCartItems = [...cartItems];

    // Check if the product is already in the cart
    const existingProductIndex = updatedCartItems.findIndex((item) => item._id === productData._id);

    if (existingProductIndex !== -1) {
      // If it's already in the cart, increase its quantity by the itemQuantity
      updatedCartItems[existingProductIndex].productQuantity += itemQuantity;
      updatedCartItems[existingProductIndex].totalPrice =
        updatedCartItems[existingProductIndex].ProductPrice *
        updatedCartItems[existingProductIndex].productQuantity;
    } else {
      // If it's not in the cart, add it with a quantity of itemQuantity
      const updatedProductData = { ...productData, productQuantity: itemQuantity, totalPrice: +productData.ProductPrice * itemQuantity };
      updatedCartItems.push(updatedProductData);
    }

    // Update the cartItems state
    setCartItems(updatedCartItems);

    // Store the updated cartItems in localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    
    Swal.fire({
      icon: 'success',
      title: 'Item added to cart',
      showConfirmButton: false,
      timer: 1500, // Close the alert after 1.5 seconds
      width: '300px', // Set a custom width for the modal
    });
    

    // Reset itemQuantity to 0
    setItemQuantity(1);


  };

  const increaseQuantity = () => {
    setItemQuantity(itemQuantity + 1);
  }

  const decreaseQuantity = () => {
    if (itemQuantity >= 1) {
      setItemQuantity(itemQuantity - 1);
    }
  }

  return (
    <div className="container">
      <div className="text-center my-5">
        <h1>Products</h1>
        <p>Our All Products</p>
      </div>

      <div className="row">
        {product.map((val, key) => (
          <div className="col-md-4 my-2" key={key}>
            <div className="card product_card">
              <img style={{ height: '200px' }} src={val.ProductImg} alt={val.ProductName} />
              Price<h4>${val.ProductPrice}</h4>
              <div className="card__content">
                <div>
                  <p className="product_card_title mb-1" style={{ fontSize: '20px', color: '#082861' }}>
                    {val.ProductName}
                  </p>
                  Brand: <p className="product_card_title mb-0">{val.ProductBrand}</p>
                  Category: <p className="product_card_title ">{val.ProductCategory}</p>
                </div>
                <div className='d-flex align-items-center justify-content-between px-2'>
                  <NavLink className="buy-btn mb-1" onClick={() => addToCart(val)}>
                    Add to Cart
                  </NavLink>
                  <div className='d-flex align-items-center'> 
                    <span className='decrease-btn' onClick={decreaseQuantity}>-</span>  
                    <p className='px-2 m-0'>{itemQuantity}</p> 
                    <span className='increase-btn' onClick={increaseQuantity}>+</span> 
                  </div>
                </div>
                <ProductModal productData={val} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
