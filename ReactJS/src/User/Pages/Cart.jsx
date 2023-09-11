import React, { useState, useEffect } from 'react';
import { PiWarningCircleBold } from 'react-icons/pi';

export default function Cart() {
  const [cartItemsArray, setCartItemsArray] = useState([]);

  useEffect(() => {
    // Retrieve cartItems from localStorage when the component mounts
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItemsArray(JSON.parse(storedCartItems));
    }
  }, []);

  const removeFromCart = (itemId) => {
    // Filter out the item to be removed from the cart
    const updatedCartItems = cartItemsArray.filter((item) => item._id !== itemId);

    // Update the cartItems state
    setCartItemsArray(updatedCartItems);

    // Store the updated cartItems in localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const increaseQuantity = (itemId) => {
    // Clone the cartItems array
    const updatedCartItems = [...cartItemsArray];

    // Find the item to be updated
    const itemIndex = updatedCartItems.findIndex((item) => item._id === itemId);

    if (itemIndex !== -1) {
      // Increase the quantity
      updatedCartItems[itemIndex].productQuantity += 1;
      updatedCartItems[itemIndex].totalPrice = updatedCartItems[itemIndex].ProductPrice * updatedCartItems[itemIndex].productQuantity;

      // Update the cartItems state
      setCartItemsArray(updatedCartItems);

      // Store the updated cartItems in localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };

  const decreaseQuantity = (itemId) => {
    // Clone the cartItems array
    const updatedCartItems = [...cartItemsArray];

    // Find the item to be updated
    const itemIndex = updatedCartItems.findIndex((item) => item._id === itemId);

    if (itemIndex !== -1) {
      // Decrease the quantity, but ensure it's not less than 1
      updatedCartItems[itemIndex].productQuantity = Math.max(1, updatedCartItems[itemIndex].productQuantity - 1);
      updatedCartItems[itemIndex].totalPrice = updatedCartItems[itemIndex].ProductPrice * updatedCartItems[itemIndex].productQuantity;

      // Update the cartItems state
      setCartItemsArray(updatedCartItems);

      // Store the updated cartItems in localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
  };

  return (
    <div className="cart-section">
      <h3>
        MY CART
      </h3>

      {cartItemsArray.length === 0 ? (
        <p className='emptyTxt'>Cart is Empty <PiWarningCircleBold/></p>
      ) : (
        cartItemsArray.map((value, key) => (
          <div className="items-div" key={key}>
            <img
              src={value.ProductImg}
              alt="Product Image"
              style={{ width: '50px', height: '50px', margin: '10px 0', marginRight: '20px' }}
            />
            <div>
              <p>
                <span>Name</span>: {value.ProductName}
              </p>
              <p>
                <span>Price</span>: <span className="color-blue">{value.ProductPrice}$</span>
              </p>
            </div>
            <div>
              <p>
                <span>Quantity</span>: {value.productQuantity}
              </p>
              <p>
                <span>Brand</span>: {value.ProductBrand}
              </p>
            </div>
            <div>
              Total Price: <span className='color-blue'>{value.totalPrice}$</span>
            </div>
            <div className='d-flex flex-column ' style={{width: 'fit-content'}}>
              <button className='btn btn-primary mb-2' onClick={() => removeFromCart(value._id)}>Delete</button>
              <div className='d-flex align-items-center'>
                <span className='decrease-btn' onClick={() => decreaseQuantity(value._id)}>-</span>
                <p className='px-2 m-0'>{value.productQuantity}</p>
                <span className='increase-btn' onClick={() => increaseQuantity(value._id)}>+</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
