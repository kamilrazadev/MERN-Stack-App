import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddProductModal from '../Components/AddProductModal';

export default function Products() {

  const [product, setProduct] = useState([]);

  useEffect( () => {
    axios.get('http://localhost:1234/api/get-all-products')
      .then( json => {
        setProduct(json.data.product)
      })
      .catch( err => console.log(err))
  })

  const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`http://localhost:1234/api/delete-product/${productId}`);
        if (response.status === 200) {
            // Product deleted successfully, update the product list
            setProduct(product.filter((p) => p._id !== productId));
        }
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};

  return (
    <>
      <div>
          <div className='d-flex align-items-center justify-content-between mt-3'>
            <h2>Products</h2>
            <AddProductModal />
          </div>

          {  product.length === 0 ? (
          <div>Loading...</div>
            ) : (
              <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Category</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Image</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    
                    product.map( (val, key)=> 
                      <tr key={key}>
                        <th scope="row">{key + 1}</th>
                        <td>{val.ProductName}</td>
                        <td className='text-primary'>{val.ProductPrice}$</td>
                        <td>{val.ProductBrand}</td>
                        <td>{val.ProductCategory}</td>
                        <td className='text-primary'>{val.ProductRating}</td>
                        <td>{val.ProductStock}</td>
                        <td>
                          <img style={{width: '40px'}} className='img-fluid' src={val.ProductImg} />
                        </td>
                        <td>
                          <button 
                            className='btn btn-danger'
                            onClick={() => deleteProduct(val._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  
                  }
                </tbody>
              </table>

            </div>    
            )
          }

          
            
      </div>
    </>
  )
}
