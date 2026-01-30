import React from "react";
import "../Css/HomeHeader.css";

const HomeHeader = () => {
  return (
    <header className="home-header-container">
      <div
        id="carouselHomeHeader"
        className="carousel slide h-60"
        data-bs-ride="carousel"
        data-bs-interval="3500"
      >
        <div className="carousel-inner h-100">

          {/* SLIDE 1 */}
          <div className="carousel-item active h-100">
            <img
              src="https://mascomalakeassociation.org/wp-content/uploads/2022/02/Fishing-Banner1.png"
              className="d-block w-100 home-header-img"
              alt="slide1"
            />
            <div className="carousel-caption">
              <h1 className="fw-bold display-5">VIVE LA PESCA</h1>
            </div>
          </div>

          {/* SLIDE 2 */}
          <div className="carousel-item h-100">
            <img
              src="https://repnaval.es/Pesca/upload/stowlcarousel/okuma-slider-bueno.jpg"
              className="d-block w-100 home-header-img"
              alt="slide2"
            />
            <div className="carousel-caption">
              <h1 className="fw-bold display-5">PESCA TRADICIONAL</h1>
              <p className="lead">Equipamiento profesional</p>
            </div>
          </div>

          {/* SLIDE 3 */}
          <div className="carousel-item h-100">
            <img
              src="https://www.aos.cc/media/slider/Vision-Fly-Fishing-AOS-XL.jpg"
              className="d-block w-100 home-header-img"
              alt="slide3"
            />
            <div className="carousel-caption">
              <h1 className="fw-bold display-5">PESCA CON MOSCA</h1>
              <p className="lead">Precisión y técnica</p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
