import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importing images from assets folder
import img1 from "../assets/sliding.jpg";
import img2 from "../assets/sliding2.jpg";
import img3 from "../assets/sliding3.jpg";

const Sliding = () => {
  const navigate = useNavigate();

  const images = [
    { id: 1, src: img1, link: "/page1" },
    { id: 2, src: img2, link: "/page2" },
    { id: 3, src: img3, link: "/page3" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id} onClick={() => navigate(image.link)} className="cursor-pointer">
            <img src={image.src} alt={`Slide ${image.id}`} className="w-full h-64 object-cover rounded-lg" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Sliding;
