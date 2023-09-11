import React, { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Page404 from './CommonPages/Page404'
import Brands from './CommonPages/Brands'
import Category from './CommonPages/Category'
import GuestNav from './Guest/Components/GuestNav';
import Admin from './Admin/App'
import User from './User/App'
import jwtDecode from 'jwt-decode';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalContext } from './Context/context';
import Home from './CommonPages/Home';
import Footer from './CommonPages/Footer';


export default function App() {

  const { state, disatch } = useContext(GlobalContext)
  const [loginUser, setLoginUser] = useState(undefined);
  
  useEffect( () => {

    if(state.user == 'undefined'){
      return undefined
    } else {
      const userData = jwtDecode(state.user)
      setLoginUser(userData)
    }
  },[state.user])

  return (

    <BrowserRouter>
        {
          loginUser?.role == 'admin' ? (<Admin />)
          :
          (
            loginUser?.role == 'user' ? (<User />)
            : 
            (
              <>
              <GuestNav />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<Page404 />} />
              </Routes>
              <Footer />
              </>
            )
          )
        }
    </BrowserRouter>

    )
}
