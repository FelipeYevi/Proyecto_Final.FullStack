import React from "react";
import imageError404 from "../assets/img/error404.png";

import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container text-center mt-5">
     
      <img
        src={imageError404}
        alt="error404"
        style={{ width: "600px", height: "auto" }}
      />
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" className="btn btn-primary">
        Volver a la página principal
      </Link>
    </div>
  );
};

export default NotFoundPage;
