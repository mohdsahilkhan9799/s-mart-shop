import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getsinglduct, getVenderProduct } from '../Slice/VenderSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Button, Form, Pagination } from 'react-bootstrap';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getRegisterUser } from "../Slice/CustomerSlice.js";
import { CreateOrderProduct, getAllOrder } from "../Slice/OrderSlice.js";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const SinglePage = () => {
    const dispatch = useDispatch();
    const { GetUserdata } = useSelector((state) => state.Customer);
    const { venderSingleData } = useSelector((state) => state.vendor);
    const { orderAllData } = useSelector((state) => state.Order);

    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(getsinglduct(id));
        dispatch(getVenderProduct(id));
        dispatch(getRegisterUser());
        dispatch(getAllOrder());
    }, [dispatch, id]);

    const orderedProduct = Array.isArray(orderAllData)
        ? orderAllData.find(order => order?.VendorProductId === venderSingleData?._id)
        : null;

    const orderedQuantity = orderedProduct ? orderedProduct.order_quantity : 0;
    const availableQuantity = venderSingleData?.product_quantity - orderedQuantity;

    const handleModalOpen = () => {
        const check_token = localStorage.getItem("token");
    
        if (!check_token) {
            toast.error("User not logged in! Redirecting to login page...");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            return;
        }
    
        setShowModal(true);
    };
    
    const handleModalClose = () => setShowModal(false);

    const increaseQuantity = () => {
        if (quantity < availableQuantity) {
            setQuantity(prevQuantity => prevQuantity + 1);
        } else {
            toast.error("Cannot increase quantity beyond available stock.");
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const navigate = useNavigate();

    const initialState = {
        name: "",
        email: "",
        address: "",
        phone: "",
        pin_number: ""
    };

    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRazorpayPayment = async () => {
        const check_token = localStorage.getItem("token");

        if (!check_token) {
            toast.error("User not logged in! Redirecting to login page...");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            return;
        }

        if (!window.Razorpay) {
            console.error('Razorpay SDK not loaded');
            return;
        }

        // Calculate total price
        const totalAmount = Math.round(
            (venderSingleData?.product_price - venderSingleData?.discount_price) * quantity
        ) * 100; // Razorpay takes the amount in paise


        if (!formData.name || !formData.email || !formData.address || !formData.phone || !formData.pin_number) {
            alert('Please fill in all the fields before proceeding.');
            return;
        }
        const options = {

            
            key: 'rzp_test_BwG2bmG3Gc3ep7', // Your Razorpay Key ID
            amount: totalAmount,
            currency: 'INR',
            name: venderSingleData?.product_name,
            description: 'Test Transaction',
            image: venderSingleData?.product_image,
            handler: function (response) {
                toast.success(`Payment successful! Payment ID: ${response.razorpay_payment_id}`, {
                    position: "top-center",
                    autoClose: 3000,
                });

                const updatedFormData = {
                    order_name: venderSingleData?.product_name,
                    order_price: venderSingleData?.product_price,
                    order_discount: venderSingleData?.discount_price,
                    order_image: venderSingleData?.product_image || 'http://localhost:1999/images/placeholder.jpg',
                    order_quantity: quantity,
                    total_price: (venderSingleData?.product_price - venderSingleData?.discount_price) * quantity,
                    userId: GetUserdata?._id,
                    VendorProductId: venderSingleData?._id,
                    dispatch: {
                        name: formData.name,
                        address: formData.address,
                        phone: formData.phone,
                        email: formData.email,
                        pin_number: formData.pin_number
                    }
                };

                dispatch(CreateOrderProduct(updatedFormData))
                    .then(() => {
                        toast.success("Order created successfully!", { position: "top-center" });
                        navigate("/orderStatus");

                    })
                    .catch((error) => {
                        console.error("Order creation failed: ", error);
                        toast.error("Order creation failed. Please try again.");
                    });

            },
            prefill: {
                name: formData.name,
                email: formData.email,
                contact: formData.phone,
            },
            theme: {
                color: '#3399cc',
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };


    const [currentStep, setCurrentStep] = useState(1);  // Pagination control
    const [showDispatch, setShowDispatch] = useState(false);  // Slider control for dispatch form

    const totalSteps = 2;

    // Pagination handlers
    const handleNext = () => setCurrentStep(currentStep + 1);
    const handlePrevious = () => setCurrentStep(currentStep - 1);

    const handleSliderToggle = () => setShowDispatch(!showDispatch);
    return (
        <>
            <div className="single-page-container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mt-3">
                                <img
                                    src={venderSingleData?.product_image}
                                    alt={venderSingleData?.product_name}
                                    width={300}
                                    className="img-fluid rounded"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="single-content mt-4">
                                <h3 className="product-title">
                                    {venderSingleData?.product_name}
                                </h3>
                                <div className="price-container">
                                    <span className="product-price discounted">
                                        {`₹${venderSingleData?.product_price}`}
                                    </span>
                                    <span className="product-price final-price1">
                                        {`₹${venderSingleData?.discount_price} off`}
                                    </span>
                                </div>
                                <span className="product-price final-price1">
                                    {`${availableQuantity} Left`}
                                </span>
                                <div className="total-price final-price">
                                    {`Total: ₹${Math.round((venderSingleData?.product_price - venderSingleData?.discount_price))}`}
                                </div>
                                <Button className="mt-3" onClick={handleModalOpen}>Buy Now</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>

            {/* Modal Design */}
            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center fs-6">
                        {venderSingleData?.product_name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <img
                                src={venderSingleData?.product_image}
                                alt={venderSingleData?.product_name}
                                width={200}
                                className="img-fluid rounded shadow-sm hoverchekimage"
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="single-content mt-3">
                                <h5 className="mb-3">Price Details</h5>
                                <div className="price-container d-flex flex-column">
                                    <span className="product-price discounted">
                                        <strong>Original Price:</strong> {`₹${venderSingleData?.product_price}`}
                                    </span>
                                    <span className="product-price final-price1 mt-2">
                                        <strong>Discounted:</strong> {`₹${venderSingleData?.discount_price} off`}
                                    </span>
                                    <span className="product-price final-price1">
                                        {`${availableQuantity} Left`}
                                    </span>
                                </div>

                                {/* Quantity Selector */}
                                <div className="quantity-container mt-3 d-flex align-items-center">
                                    <Button variant="outline-secondary" onClick={decreaseQuantity}>-</Button>
                                    <span className="mx-3">{quantity}</span>
                                    <Button variant="outline-secondary" onClick={increaseQuantity}>+</Button>
                                </div>

                                <div className="total-price final-price mt-3">
                                    <strong>Total:</strong> {`₹${Math.round((venderSingleData?.product_price - venderSingleData?.discount_price) * quantity)}`}
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="form-container">
                    <Form >
                {/* Step Indicator */}
                <div className="step-indicator">
                    <h5>Address {currentStep} of {totalSteps}</h5>
                </div>

                {currentStep === 2 && (
                    <>
                        <Form.Group className="mb-4" controlId="formBasicName">
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="custom-input"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="custom-input"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicAddress">
                            <Form.Control
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                className="custom-input"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPhone">
                            <Form.Control
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="custom-input"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPin">
                            <Form.Control
                                type="text"
                                name="pin_number"
                                placeholder="Pin Code"
                                value={formData.pin_number}
                                onChange={handleInputChange}
                                required
                                className="custom-input"
                            />
                        </Form.Group>
                    </>
                )}

                {/* Total Price Section for Last Step */}
               

                {/* Pagination */}
                <div className="pagination-section">
                    <Pagination>
                    {currentStep > 1 && (
            <Pagination.Prev onClick={handlePrevious}>
                <FaArrowLeft className="me-1" /> {/* Icon for Previous */}
                Previous
            </Pagination.Prev>
        )}                        {currentStep < totalSteps && (
        <Button variant="primary" onClick={handleNext} className="ms-2">
            Next <FaArrowRight className="me-1" />
            
        </Button>
    )}                    </Pagination>
                </div>

                {/* Modal Footer */}
               
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleModalClose}>Cancel</Button>
                    {currentStep === 2 && (
                        <Button variant="primary" onClick={handleRazorpayPayment}>Pay with Razorpay</Button>)}
                    
                </Modal.Footer>
                
            </Form>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
};

export default SinglePage;
