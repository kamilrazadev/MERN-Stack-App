import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './style.css'

export default function Brands() {
    
    const [brands, setBrands] = useState([]);

    useEffect( () => {
        axios.get('http://localhost:1234/api/get-all-brands')
            .then( json => {
                setBrands(json.data.brands)
            })
            .catch( (err) => console.log(err.message))
    })

  return (
    <div className='container'>
        <div className='text-center my-5'>
            <h1>Brands</h1>
            <p>Our All Registered Brands</p>
        </div>

        <div className='row'>
            {
                brands.map( (val, key) => 
                    <div className='col-md-4 my-2' key={key}>  
                        <div className="card">
                            <img style={{height: '90%'}} src={val.BrandImg} />
                            <div className="card__content">
                                <h2 className="card__title">{val.BrandName}</h2>
                            </div>
                        </div>

                    </div>
                )
            }
        </div>

    </div>
  )
}
