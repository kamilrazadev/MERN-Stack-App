import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddBrandModal from '../Components/AddBrandModal';

export default function Brands() {

  const [brands, setBrands] = useState([]);

  useEffect( () => {
    axios.get('http://localhost:1234/api/get-all-brands')
      .then( json => {
        setBrands(json.data.brands)
      })
      .catch( err => console.log(err))
  },[])

  console.log(brands)

  const deleteBrand = async (brandId) => {
    try {
        const response = await axios.delete(`http://localhost:1234/api/delete-brand/${brandId}`);
        if (response.status === 200) {
            // Brand deleted successfully, update the brand list
            setBrands(brands.filter((p) => p._id !== brandId));
        }
    } catch (error) {
        console.error("Error deleting brand:", error);
    }
};

  return (
    <>
      <div>
          <div className='d-flex align-items-center justify-content-between mt-3'>
            <h2>Brands</h2>
            <AddBrandModal />
          </div>

          {
            brands.length === 0 ? (
          <div>Loading...</div>
            ) : (
              <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Brand Name</th>
                    <th scope="col">Logo</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    
                    brands.map( (val, key)=> 
                      <tr key={key}>
                        <th scope="row">{key + 1}</th>
                        <td>{val.BrandName}</td>
                        <td>
                          <img style={{width: '40px'}} className='img-fluid' src={val.BrandImg} />
                        </td>
                        <td>
                          <button 
                            className='btn btn-danger'
                            onClick={() => deleteBrand(val._id)}
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
