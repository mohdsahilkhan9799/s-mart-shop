import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getRegisterUser } from "../Slice/CustomerSlice.js"; 
import { getAllOrder } from "../Slice/OrderSlice.js"; 
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../App.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { GetUserdata, isLoading } = useSelector((state) => state.Customer);
  
  useEffect(() => {
    dispatch(getRegisterUser());
  }, [dispatch]);

  

  return (
    <div className="profile-container">
      <Row className="justify-content-center mt-5">
        <Col md={6} className="animate__animated animate__fadeInLeft">
          <Card className="shadow-sm mb-4 profile-card">
            <Card.Header>Profile</Card.Header>
            <Card.Body>
              {isLoading ? (
                <Spinner animation="border" />
              ) : (
                <Row>
                  <Col md={8}>
                    <h5>Name: {GetUserdata?.name}</h5>
                    <p><FaEnvelope /> <strong>Email:</strong> {GetUserdata?.email}</p>
                    <p><FaPhone /> <strong>Phone:</strong> {GetUserdata?.phone}</p>
                    <p><FaMapMarkerAlt /> <strong>Address:</strong> {GetUserdata?.address || 'N/A'}</p>
                  </Col>
                  <Col md={4} className="d-flex justify-content-center align-items-center">
                    <img
                      src={GetUserdata?.profile_image || 'placeholder.jpg'}
                      alt={GetUserdata?.name}
                      className="profile-image"
                    />
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
