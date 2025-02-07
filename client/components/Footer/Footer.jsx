import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // Importuojame stilių failą

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="foooter">
        <Row>
          <Col className="text-center ">© {new Date().getFullYear()} MyServices, Inc.</Col>
        </Row>
        <Row>
          <Col className="text-center ">All rights reserved.</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
