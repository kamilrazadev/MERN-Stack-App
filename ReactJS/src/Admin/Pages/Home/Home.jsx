import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'

export default function Brands() {
    
    const [brands, setBrands] = useState([]);

    useEffect( () => {
        axios.get('http://localhost:1234/api/get-all-brands')
            .then( json => {
                setBrands(json.data.brands)
            })
            .catch( (err) => console.log(err.message))
    })

    const [category, setCategory] = useState([]);

    useEffect( () => {
        axios.get('http://localhost:1234/api/get-all-category')
            .then( json => {
                setCategory(json.data.category)
            })
            .catch( (err) => console.log(err.message))
    })

    const [product, setProduct] = useState([]);

    useEffect( () => {
        axios.get('http://localhost:1234/api/get-all-products')
            .then( json => {
                setProduct(json.data.product)
            })
            .catch( (err) => console.log(err.message))
    })

  return (
    <>
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

    <div className='container'>

        <div className='text-center my-5'>
        <h1>Category</h1>
        <p>All Categories</p>
        </div>

        <div className='row'>
        {
            category.map( (val, key) => 
                <div className='col-md-4 my-2' key={key}>  
                    <div className="card">
                        <img style={{height: '90%'}} src={val.CategoryImg} />
                        <div className="card__content">
                            <h2 className="card__title">{val.CategoryName}</h2>
                        </div>
                    </div>

                </div>
            )
        }
        </div>

    </div> 

    <div className='container'>

        <div className='text-center my-5'>
            <h1>Products</h1>
            <p>Our All Products</p>
        </div>

        <div className='row'>
            {
                product.map( (val, key) => 
                    <div className='col-md-4 my-2' key={key}>  
                        <div className="card product_card">
                            <img style={{height: '200px'}} src={val.ProductImg} />
                            Price<h4>${val.ProductPrice}</h4>
                            <div className="card__content">
                                <p className="product_card_title">{val.ProductName}</p>
                                <p className='text-dark'>{val.ProductDiscription}</p>
                                Brand: <p className="product_card_title">{val.ProductBrand}</p>
                                Category<p className="product_card_title">{val.ProductCategory}</p>
                            </div>
                        </div>

                    </div>
                )
            }
        </div>

    </div>

    </>
  )
}
