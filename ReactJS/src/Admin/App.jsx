import React from 'react'
import Nav from 'react-bootstrap/Nav'
import AdminNav from './Components/AdminNav'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Brands from './Pages/Brands'
import Categories from './Pages/Categories'
import Products from './Pages/Products'
import Page404 from '../CommonPages/Page404'
import Footer from '../CommonPages/Footer'

export default function App() {
  return (
    <>
      <AdminNav />

      <div className='container-fluid'>
        <div className='row'>

          <div className='col-md-3 bg-dark' style={{minHeight : '100vh'}}>
              <Nav defaultActiveKey='/' className='flex-column'>
                {
                  <>
                    <Link className='text-light text-decoration-none my-2' to='/'>Home</Link>
                    <Link className='text-light text-decoration-none my-2' to='/brands'>Brand</Link>
                    <Link className='text-light text-decoration-none my-2' to='/categories'>Categories</Link>
                    <Link className='text-light text-decoration-none my-2' to='/products'>Products</Link>
                  </>
                }
              </Nav>
          </div>

          <div className='col-md-9'>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/brands' element={<Brands />}/>
              <Route path='/categories' element={<Categories />}/>
              <Route path='/products' element={<Products />}/>
              <Route path='*' element={<Page404 />}/>
            </Routes>
          </div>
        
        </div>
      </div>

      <Footer />
    </>
  )
}
