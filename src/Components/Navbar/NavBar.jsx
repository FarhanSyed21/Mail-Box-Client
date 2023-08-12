import React, { Fragment } from 'react'
import {Navbar, Container} from 'react-bootstrap'

const NavBar = () => {
  return (
    <Fragment>  
      <Navbar expand="lg" variant="dark" bg="dark">
      <Container fluid>
        <Navbar.Brand>Mail Box Client</Navbar.Brand>
      </Container>
    </Navbar>
    </Fragment>
  )
}

export default NavBar