import React, { useState } from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginPost,getRegisterUser } from '../Slice/CustomerSlice.js'; // Assuming you have an action for login
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";


const Signin1 = () => {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: ""
  };

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginPost(formData)).then((result) => {
      console.log("result",result)
      if (result.payload.success) {
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } 
      // toast.success("User Login Succesfully");

    }).catch((error) => {
      toast.error(error.message);
    });
    dispatch(getRegisterUser());

  };

  return (
    <React.Fragment>
      <div className="auth-wrapper ">
        <div className="auth-content ">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless shadow-lg mt-4">
            <Row className="align-items-center">
              <Col>
                <Card.Body className="text-center">
                  <div className="mb-4">
                    <i className="feather icon-user-plus auth-icon"></i>
                  </div>
                  <h3 className="mb-4">Log In</h3>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Button className="btn btn-primary mb-4 w-100" type="submit">
                      Sign In
                    </Button>
                  </Form>
                  <p className="mb-0 text-muted">
                    Don’t have an account?{' '}
                    <NavLink to="/signIn" className="text-primary">
                      Signup
                    </NavLink>
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
      <ToastContainer/>
    </React.Fragment>
  );
};

export default Signin1;
