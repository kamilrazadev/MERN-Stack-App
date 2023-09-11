import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../Context/context';

export default function UserNav() {

  const { state, dispatch } = useContext(GlobalContext)

  const logoutUser = () => {
    dispatch({
      type: "LOGOUT"
    })
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary sticky-top">
    <Container>
      <Navbar.Brand href="#home"><h4>E-Store</h4></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">

        <Nav className='ms-auto '>
          <NavLink to='/' className='d-flex align-items-center text-decoration-none mx-2'>Home</NavLink>
          <NavLink to='/brands' className='d-flex align-items-center text-decoration-none mx-2'>Brands</NavLink>
          <NavLink to='/categories' className='d-flex align-items-center text-decoration-none mx-2'>Categories</NavLink>
          <NavLink to='/products' className='d-flex align-items-center text-decoration-none mx-2'>Products</NavLink>
          <NavLink to='/cart' className='d-flex align-items-center text-decoration-none mx-2 btn btn-dark'>Cart</NavLink>
          <Button className='btn-dark ms-5' onClick={logoutUser}>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  )
}
