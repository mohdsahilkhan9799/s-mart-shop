import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVenderProduct } from '../Slice/VenderSlice';
import { getadminCategory, getadminBrand } from '../Slice/AdminSlice';
import '../App.css'; // Import your custom styles
import { useNavigate, useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Form, FormControl } from 'react-bootstrap';

const HomePage = () => {
  const dispatch = useDispatch();
  const { venderData } = useSelector((state) => state.vendor);
  const { adminData, BrandData } = useSelector((state) => state.Admin);

  useEffect(() => {
    dispatch(getVenderProduct());
    dispatch(getadminCategory());
    dispatch(getadminBrand());
  }, [dispatch]);


  const id = useParams()
  const navigate = useNavigate()
  const subpage = (id) => {
    navigate(`/category/${id}`);
  };


  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default number of visible slides
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768, // Mobile devices (max-width: 768px)
        settings: {
          slidesToShow: 2, // Show 2 slides on mobile
          slidesToScroll: 1,
          infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 1024, // Tablets (max-width: 1024px)
        settings: {
          slidesToShow: 2, // Show 3 slides on tablets
          slidesToScroll: 1,
          infinite: true,
          // dots: true,
        },
      },
    ],
  };
  
  return (
    <div className="container-fluid">
      {/* Categories Section */}
      <div className="row my-5">
        <div className="col-12">
          <h2 className="text-center mb-4">Categories</h2>
       
          <div className="card-container d-flex flex-wrap justify-content-center">
            {adminData?.map((item, index) => (
              <div className="flip-card mx-3 my-2" key={index} onClick={() => subpage(item._id)}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src={item?.product_image}
                      alt={item?.name}
                      className="img-fluid category-image"
                    />
                    <h5 className="mt-2">{item?.name}</h5>
                  </div>
                  <div className="flip-card-back">
                    <img
                      src={item?.product_image}
                      alt={item?.name}
                      className="img-fluid category-image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brands Section */}
      {/* <div className="container">
  <div className="row my-5">
    <div className="col-lg-4 col-md-6 col-sm-12">
      <h2 className="text-center mb-4">Brands</h2>
      <div className="slider">
        <div className="slide-track d-flex align-items-center justify-content-center flex-wrap">
          {BrandData?.map((item, index) => (
            <div className="slide" key={index}>
              <img
                src={item?.Brand_image}
                alt={`Brand ${index}`}
                className="img-fluid"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div> */}

<h2 className="text-center mb-4">Brands</h2>

<div className="carousel-container mx-5"style={{overflow:"hidden"}} >

      <Slider {...settings}>
        {BrandData?.map((item, index) => (
          <div key={index}>
            <img
              className="d-block w-75 px-3 rounded-pill text-center mx-2 px-4"
              src={item?.Brand_image}
              alt={`Brand ${index}`}
              style={{ 
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>



    </div>
  );
};

export default HomePage;
