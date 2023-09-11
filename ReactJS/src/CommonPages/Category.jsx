import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './style.css'

export default function Category() {
    
    const [category, setCategory] = useState([]);

    useEffect( () => {
        axios.get('http://localhost:1234/api/get-all-category')
            .then( json => {
                setCategory(json.data.category)
            })
            .catch( (err) => console.log(err.message))
    })

  return (
    <div className='container'>
        <div className='text-center my-5'>
            <h1>Category</h1>
            <p>Our All Registered Category</p>
        </div>

        <div className='row'>
            {
                category? (category.map( (val, key) => 
                    <div className='col-md-4 my-2' key={key}>  
                        <div className="card">
                            <img style={{height: '90%'}} src={val.CategoryImg} />
                            <div className="card__content">
                                <h2 className="card__title">{val.CategoryName}</h2>
                            </div>
                        </div>

                    </div>
                )) : (<div>Please Wait</div>)
            }
        </div>

    </div>
  )
}
