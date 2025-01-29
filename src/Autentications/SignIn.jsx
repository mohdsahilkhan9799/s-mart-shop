import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { RegisterUser } from '../Slice/CustomerSlice.js';
import '../App.css';

const SignUp1 = () => {
  const { configdata } = useSelector((state) => state.Customer);
  console.log("configdata", configdata);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormData = {
    name: "",
    address: "",
    email: "",
    password: "",
    phone: "",
    profile_image: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const updatedValue = type === "file" ? files[0] : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'profile_image' && formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
    console.log("The FormDataToSend Value is:", formDataToSend);
    dispatch(RegisterUser(formDataToSend));
  };

  return (
    <React.Fragment>
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless shadow-lg mt-5">
            <Row className="align-items-center">
              <Col>
                <Card.Body className="text-center">
                  <div className="mb-4">
                    <i className="feather icon-user-plus auth-icon" />
                  </div>
                  <h3 className="mb-4">Sign Up</h3>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Username"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Profile Image</Form.Label>
                      <Form.Control
                        type="file"
                        name="profile_image"
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Button className="btn btn-primary w-100 mb-4" type="submit">
                      Sign Up
                    </Button>
                  </Form>
                  <p className="mb-2 text-muted">
                    Already have an account?{' '}
                    <NavLink to="/login" className="text-primary">
                      Login
                    </NavLink>
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp1;
