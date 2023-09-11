import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import { NavLink } from 'react-router-dom';

export default function GuestNav() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary sticky-top">
    <Container>
      <Navbar.Brand href="#home"><h4>E-Store</h4></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">

        <Nav className='ms-auto '>
          <NavLink to='/' className='d-flex align-items-center text-decoration-none mx-2'>Home</NavLink>
            <Login />
            <SignUp />
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  )
}
