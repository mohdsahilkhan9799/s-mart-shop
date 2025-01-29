import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser  } from 'react-icons/fa';
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

 // Import the user icon from React Icons
import '../App.css';
import { getRegisterUser } from "../Slice/CustomerSlice.js"; // Adjust the import based on your structure
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navigation = () => {
  const { GetUserdata, isLoading } = useSelector((state) => state.Customer);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate hook

  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('token');

  const handleSearch = (event) => {
    event.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:1999/api/customer/CustomerUserLogout");
      localStorage.removeItem("token");

      navigate("/"); // Use navigate to redirect
      window.location.reload(); // Reload after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(getRegisterUser());
    }
  }, [token, dispatch]);
  return (
    <Navbar className="smokewhite-bg" expand="lg">
      <Navbar.Brand href="/" className="mx-5 fs-1">
        <img
          src="https://www.logomaker.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6kh...6BpBdJnBnJwXs1M3EMoAJtlyIqhfZv8...4y"
          alt=""
          width={120}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto d-flex align-items-center justify-content-center">
          {/* Search Form */}
          {/* <Form inline onSubmit={handleSearch} className="d-flex mx-3 gap-3">
            <FormControl
              type="text"
              placeholder="Search for Product, Brand, and More"
              className="mr-sm-2 rounded-5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="outline-success" className="custom-button">
              Search
            </Button>
          </Form> */}

<Nav className="mt-3 mx-5">
          {/* Become Seller Button */}
          <Button
            href="http://127.0.0.1:3001/login"
            target="_blank"
            className="fs-5 "
          >
            Become Seller
          </Button>
        </Nav>
        
        </Nav>
        
        <Nav className="">
          {token && ( // Conditionally render profile section
            <li style={{ listStyle: 'none' }}>
            <Dropdown>
              <Dropdown.Toggle
                as={Button}
                variant="link"
                className="fs-5 d-flex align-items-center text-decoration-none"
                style={{ color: '#000' }} // Adjust the text color as needed
              >
                {GetUserdata?.name}
                <Dropdown.Menu>
                {/* Profile Option */}
                <Dropdown.Item href="/profile">
                  Profile
                </Dropdown.Item>
          
                {/* Orders Option */}
                <Dropdown.Item href="/orderStatus">
                  My Orders
                </Dropdown.Item>
          
                {/* You can add more items here if needed */}
              </Dropdown.Menu>
                <img
                  src={GetUserdata?.profile_image || 'placeholder.jpg'}
                  alt={GetUserdata?.name}
                  width={40}
                  className="mx-1 rounded-pill"
                />
              </Dropdown.Toggle>
          
            
            </Dropdown>
          </li>

          
          )}
        </Nav>
        <Nav className="">
          {token && ( // Conditionally render profile section
            <li style={{ listStyle: 'none' }}>
              <Button
                variant="link"
                href="/"
                className="fs-5 d-flex align-items-center text-decoration-none"
                style={{ color: '#000' }} // Change the text color as needed
              >
                <CiLogout  className="" style={{ fontSize: '1.25rem' }} onClick={logout} /> 
              </Button>
              
            </li>

          
          )}
        </Nav>
        <Nav className="">
          {!token && ( // Conditionally render profile section
            <li style={{ listStyle: 'none' }}>
              <Button
                variant="link"
                href="/login"
                className="fs-5 d-flex align-items-center text-decoration-none"
                style={{ color: '#000' }} // Change the text color as needed
              >
                <CiLogin  className="" style={{ fontSize: '1.25rem' }} /> 
              </Button>
              
            </li>

          
          )}
        </Nav>
      </Navbar.Collapse>
      <ToastContainer/>

    </Navbar>
  );
};

export default Navigation;
