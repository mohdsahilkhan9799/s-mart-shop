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
  const { orderAllData } = useSelector((state) => state.Order);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    dispatch(getRegisterUser());
    dispatch(getAllOrder());
  }, [dispatch]);

  useEffect(() => {
    if (GetUserdata) {
      const orders = orderAllData?.filter(order => order.userId === GetUserdata?._id);
      setUserOrders(orders);
    }
  }, [GetUserdata, orderAllData]);

  return (
    <div className="profile-container">
      <Row className="justify-content-center mt-5">


        {/* Orders Section */}
        <Col md={6} className="animate__animated animate__fadeInRight">
          <Card className="shadow-sm mb-4">
            <Card.Header>My Orders</Card.Header>
            <Card.Body>
              {isLoading ? (
                <Spinner animation="border" />
              ) : userOrders?.length > 0 ? (
                userOrders.map((order) => (
                  <Card key={order._id} className="mb-3 shadow-sm order-card">
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <div className="order-image">
                            <img
                              src={order.order_image}
                              alt={order.order_name}
                              className="order-img"
                            />
                          </div>
                          <p className="text-muted mb-1 mt-5">
                            <strong>Quantity:</strong> {order.order_quantity}
                          </p>
                          <p className="text-muted mb-1">
                            <strong>Total Amount:</strong> ₹{order.total_price}
                          </p>
                          <p className="text-muted mb-1">
                            <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </Col>
                        <Col md={6}>
                          
                          <p className="text-muted mb-1 mt-5">
                            <strong>Address:</strong> {order.dispatch.address}
                          </p>
                          <p className="text-muted mb-1">
                            <strong>Email:</strong> ₹{order.dispatch.email}
                          </p>
                          <p className="text-muted mb-1">
                            <strong>Phone:</strong> ₹{order.dispatch.phone}
                          </p>
                          <p className="text-muted mb-1">
                            <strong>Pin:</strong> ₹{order.dispatch.pin_number}
                          </p>
                         
                        </Col>

                       
                      </Row>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No orders found.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;




