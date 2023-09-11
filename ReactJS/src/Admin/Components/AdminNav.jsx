import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { GlobalContext } from '../../Context/context';
import Cookies from 'js-cookie';

export default function AdminNav() {

  const { state, dispatch } = useContext(GlobalContext)

  const logoutUser = () => {
    dispatch({
      type: "LOGOUT"
    })
  }

  return (
    <Navbar className="bg-primary sticky-top">
      <Container>
        <Navbar.Brand className='text-light' href="#home">
            <h6>Admin Panel</h6>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className='text-light mx-3'>
            <h6 className='m-0'>{state.user.username}</h6>
          </Navbar.Text>
              <Button className='btn btn-dark' onClick={logoutUser}>
                  Logout
              </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
