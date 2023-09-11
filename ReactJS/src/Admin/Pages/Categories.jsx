import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddCategoryModal from '../Components/AddCategoryModal';

export default function Categories() {

  const [category, setCategory] = useState([]);

  useEffect( () => {
    axios.get('http://localhost:1234/api/get-all-category')
      .then( json => {
        setCategory(json.data.category)
      })
      .catch( err => console.log(err))
  })

  const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`http://localhost:1234/api/delete-category/${categoryId}`);
        if (response.status === 200) {
            // Category deleted successfully, update the category list
            setCategory(category.filter((p) => p._id !== categoryId));
        }
    } catch (error) {
        console.error("Error deleting category:", error);
    }
};

  return (
    <>
      <div>
          <div className='d-flex align-items-center justify-content-between mt-3'>
            <h2>Categories</h2>
            <AddCategoryModal />
          </div>

            {
              category.length === 0 ? (
                <div>Loading...</div>
                  ) : (
                    <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Categories Name</th>
                    <th scope="col">Logo</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    
                    category.map( (val, key)=> 
                      <tr key={key}>
                        <th scope="row">{key + 1}</th>
                        <td>{val.CategoryName}</td>
                        <td>
                          <img style={{width: '40px'}} className='img-fluid' src={val.CategoryImg} />
                        </td>
                        <td>
                          <button 
                            className='btn btn-danger'
                            onClick={() => deleteCategory(val._id)}
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
