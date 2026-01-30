import React from "react";

const CardAdmin = ({
  id,
  name,
  img,
  desc,
  price,
  detail,
  onEliminar,
  onEditar,
}) => {
  return (
    <div className="col-12 col-md-6 mb-4">
      <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
        <div className="row g-0 h-100">
          {/* IMG*/}
          <div className="col-12 col-md-4">
            <img
              src={img}
              alt={name}
              className="img-fluid w-100 h-100 object-fit-cover"
              style={{ minHeight: "220px" }}
            />
          </div>

          {/* CONTENIDO */}
          <div className="col-12 col-md-8">
            <div className="card-body d-flex flex-column h-100">
              <h5 className="fw-bold text-uppercase mb-3">{name}</h5>
              <span className="badge bg-success fs-6">
                ${price?.toLocaleString()}
              </span>

              <div className="bg-light p-3 rounded mb-3 flex-grow-1">
                <h6 className="fw-bold text-muted mb-2">Descripción</h6>
                <p className="mb-0 small text-muted">{desc}</p>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-auto">
                <button
                  className="btn btn-outline-info fw-semibold"
                  onClick={() =>
                    onEditar({ id, name, desc, price, img, detail })
                  }
                >
                  MODIFICAR PRODUCTO
                </button>

                <button
                  className="btn btn-danger fw-semibold"
                  onClick={() =>
                    onEliminar({ id, name, desc, price, img, detail })
                  }
                >
                  ELIMINAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAdmin;
