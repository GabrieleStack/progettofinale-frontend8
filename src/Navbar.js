// NavBar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';

function NavBar({ onSearch, showSearch, cartTotal = 0, cartItems = [], removeFromCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);

    const secondSectionElement = document.getElementById('second-section');
    if (secondSectionElement) {
      secondSectionElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData)
      });
      const result = await response.json();
      if (result.success) {
        alert('Registrazione avvenuta con successo');
        setShowRegisterModal(false);
        setRegistrationData({
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        });
      } else {
        alert('Errore nella registrazione');
      }
    } catch (error) {
      console.error('Errore nella registrazione:', error);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="navbar navbar-fixed">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="nav me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link as={Link} to="/" className='mt-2'>Home</Nav.Link>
              <Nav.Link as={Link} to="/info" className='mt-2'>Chi Siamo</Nav.Link>
              <Nav.Link as={Link} to="/cart" className='carrello mt-2'>
                <span className='spancarrello'>Carrello: €{cartTotal.toFixed(2)}</span>
              </Nav.Link>
              <Button className='registrati' variant="outline-primary" onClick={() => setShowRegisterModal(true)}>Registrati</Button>
              <h1 className='h1'>Wine Emporium</h1>
            </Nav>
            {showSearch && (
              <Form className="d-flex" onSubmit={handleSearchSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Che vino cerchi?"
                  className="me-2"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Button variant="outline-success" type="submit">Cerca</Button>
              </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showRegisterModal} onHide={() => setShowRegisterModal(false)}>
        <Modal.Header className='modalregisterhead' closeButton>
          <Modal.Title className='modalregisterhead'>Registrati</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalregister'>
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="firstName" value={registrationData.firstName} onChange={handleRegisterChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" name="lastName" value={registrationData.lastName} onChange={handleRegisterChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={registrationData.email} onChange={handleRegisterChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={registrationData.password} onChange={handleRegisterChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Registrati</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBar;
