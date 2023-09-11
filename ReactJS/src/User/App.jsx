import React from 'react'
import UserNav from './Components/UserNav'
import Home from '../CommonPages/Home'
import Page404 from '../CommonPages/Page404'
import Category from '../CommonPages/Category'
import Brands from '../CommonPages/Brands'
import { Route, Routes } from 'react-router-dom'
import Products from './Pages/Products'
import Footer from '../CommonPages/Footer'
import Cart from './Pages/Cart'
import './style.css'

export default function App() {
  return (
    <>
      <UserNav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/brands' element={<Brands />} />
        <Route path='/categories' element={<Category />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
      <Footer />
    </>
    )
}
