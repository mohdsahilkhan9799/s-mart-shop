import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../App.css'; 

const Footer = () => {
  return (
    <footer className="smokewhite-bg text-center text-lg-start mt-5">
      <Container className="p-4">
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <h5 className="text-uppercase">About Us</h5>
            <p>
              We are committed to providing the best services for our customers.
              Our mission is to ensure customer satisfaction through excellence.
            </p>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-dark">Home</a>
              </li>
              <li>
                <a href="#" className="text-dark">About</a>
              </li>
              <li>
                <a href="#" className="text-dark">Services</a>
              </li>
              <li>
                <a href="#" className="text-dark">Contact</a>
              </li>
            </ul>
          </Col>
          <Col lg={4} md={12} className="mb-4">
            <h5 className="text-uppercase">Follow Us</h5>
            <a href="#" className="text-dark mx-2">
              <FaFacebook />
            </a>
            <a href="#" className="text-dark mx-2">
              <FaTwitter />
            </a>
            <a href="#" className="text-dark mx-2">
              <FaInstagram />
            </a>
            <a href="#" className="text-dark mx-2">
              <FaLinkedin />
            </a>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-3 bg-light">
        <span>© 2024 Your Company. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
